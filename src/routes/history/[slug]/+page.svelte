<script lang="ts">
    import { onMount } from 'svelte';
    import StockChart from '$lib/components/StockChart.svelte';
    import BackButton from '$lib/components/BackButton.svelte';
    import Loader from '$lib/components/Loader.svelte';
    import { getStockData } from '$lib/stores/stockStore';
    import type { HistoricalDataResponse } from '$lib/types/HistoricalStockData';
    import type { Stock } from '$lib/types/Stock';
    import { getToastStore } from '@skeletonlabs/skeleton';

    const toastStore = getToastStore();

    export let data: HistoricalDataResponse;
    let stockInfo: Stock | null = null;
    let loading = true;

    onMount(async () => {
        if (data && data.symbol) {
            try {
                const fetchedData = await getStockData(data.symbol, toastStore);
                if (fetchedData !== undefined) {
                    stockInfo = fetchedData;
                }
            } catch (error) {
                console.error('Error fetching stock data:', error);
            } finally {
                loading = false;
            }
        }
    });
</script>

<div>
    {#if loading}
        <Loader />
    {:else}
        <div class="space-y-10 flex flex-col items-center text-center">
            <div class="relative w-full flex justify-center gap-6 items-center">
                <BackButton />
                {#if stockInfo}
                    <div>
                        <h1 class="text-4xl font-bold">{stockInfo.name}</h1>
                        <h2 class="text-xl font-semibold">Symbol: {stockInfo.symbol}</h2>
                    </div>
                {/if}
            </div>
            <StockChart {data} />
        </div>
    {/if}
</div>