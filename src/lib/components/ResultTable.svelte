<script lang="ts">
    import { onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    import { Paginator, Table, getToastStore } from '@skeletonlabs/skeleton';
    import type { PaginationSettings, TableSource } from '@skeletonlabs/skeleton';
    import { getStockData, subscribe } from '$lib/stores/stockStore';
    import type { Stock } from '$lib/types/Stock';
    import { formatMarketCap, formatChangesBadge, formatLastTrade, getLoadingSpinner, getNotAvailableBadge } from '$lib/utils/tableUtils';

    const toastStore = getToastStore();

    let paginationSettings: PaginationSettings = {
        page: 0,
        limit: 5,
        size: 0,
        amounts: [5, 10, 15],
    };

    let stocks: Stock[] = [];
    let loading: boolean = false;

    async function fetchCurrentPageStockData() {
        if (loading) return; // Prevent concurrent fetches
        loading = true;

        const start = paginationSettings.page * paginationSettings.limit;
        const end = start + paginationSettings.limit;
        const currentStocks = stocks.slice(start, end);

        for (const stock of currentStocks) {
            if (stock.fetched === false) {
                await getStockData(stock.symbol, toastStore);
            }
        }
        loading = false;
    }

    const unsubscribe = subscribe(($stocks: Stock[]) => {
        stocks = $stocks;
        paginationSettings.size = stocks.length;
    });

    // React to changes in paginationSettings.page
    $: paginationSettings.page, fetchCurrentPageStockData();

    onDestroy(() => unsubscribe());

    function renderCellContent(value: any, isFetched: boolean): any {
        if (!isFetched) return getLoadingSpinner();
        if (value === undefined) return getNotAvailableBadge();
        return value;
    }

    function setTableSource(data: Stock[]): TableSource {
        return {
            head: ['Symbol', 'Name', 'Price', 'Changes', 'Market Cap', 'Last trade'],
            body: data.map(stock => [
                stock.symbol,
                stock.name,
                renderCellContent(stock.price !== undefined ? stock.price.toFixed(2) : undefined, stock.fetched),
                renderCellContent(stock.change !== undefined && stock.changesPercentage !== undefined ? formatChangesBadge(stock.change, stock.changesPercentage) : undefined, stock.fetched),
                renderCellContent(stock.marketCap !== undefined ? formatMarketCap(stock.marketCap) : undefined, stock.fetched),
                renderCellContent(stock.timestamp !== undefined ? formatLastTrade(stock.timestamp) : undefined, stock.fetched)
            ]),
            meta: data.map(stock => [
                stock.symbol,
                stock.price == undefined ? 'true' : 'false',
            ])
        };
    }

    function onSelectStock(event: CustomEvent) {
        if (event.detail.length === 0 || event.detail[1] === 'true') return;
        const symbol = event.detail[0];
        goto(`/history/${symbol}`);
    }

</script>

{#if stocks.length > 0}
<div class="table-container">
    <Table
        class="table-hover"
        source={setTableSource(stocks.slice(paginationSettings.page * paginationSettings.limit, (paginationSettings.page + 1) * paginationSettings.limit))}
        interactive={true}
        on:selected={onSelectStock}
    />
    <Paginator
        class="mt-5"
        bind:settings={paginationSettings}
        showFirstLastButtons={false}
        showPreviousNextButtons={true}
    />
</div>
{/if}