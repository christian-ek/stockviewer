import { error } from '@sveltejs/kit';
import { fetchHistoricalStockData } from '$lib/api/stockApi';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const symbol = params.slug;

    try {
        const historicalData = await fetchHistoricalStockData(symbol);
        return historicalData;
    } catch (err) {
        throw error(404, 'Historical data not found');
    }
}