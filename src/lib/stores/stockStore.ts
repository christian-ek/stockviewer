import { writable } from 'svelte/store';
import type { Stock } from '$lib/types/Stock';
import * as stockApi from '$lib/api/stockApi';
import { showErrorToast } from '$lib/utils/toastUtils';
import type { ToastStore } from '@skeletonlabs/skeleton';

const { subscribe, set, update } = writable<Stock[]>([]);
const cache: Record<string, Stock> = {};

async function searchStocks(query: string, toastStore: ToastStore) {
    try {
        const stocks = await stockApi.searchStocks(query);
        if (stocks.length === 0) {
            showErrorToast(toastStore, 'No stocks found. Please try a different search.');
        } else {
            // Directly set the fetched stocks into the store, marking each as fetched
            set(stocks.map(stock => ({ ...stock, fetched: false })));
        }   
    }
    catch (error) {
        const message = (error instanceof Error) ? error.message : 'An unknown error occurred';
        showErrorToast(toastStore, message);
    }
}

async function getStockData(symbol: string, toastStore: ToastStore): Promise<Stock | undefined> {
    if (cache[symbol]) {
        return cache[symbol];
    }

    try {
        const stock = await stockApi.fetchStockData(symbol);
        if (stock) {
            cache[symbol] = { ...stock, fetched: true };
            update(stocks => stocks.map(s => s.symbol === symbol ? { ...s, ...cache[symbol] } : s));
            return cache[symbol];
        }
    } catch (error) {
        const message = (error instanceof Error) ? error.message : 'An unknown error occurred';
        showErrorToast(toastStore, message);
        cache[symbol] = { symbol, name: 'Unknown', fetched: true };
        update(stocks => stocks.map(s => s.symbol === symbol ? { ...s, ...cache[symbol] } : s));
        return cache[symbol];
    }
    return undefined;
}

export { subscribe, searchStocks, getStockData };
