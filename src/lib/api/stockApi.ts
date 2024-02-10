import type { Stock } from '$lib/types/Stock';
import type { HistoricalDataResponse } from '$lib/types/HistoricalStockData';

const apiKey = import.meta.env.VITE_API_KEY;

async function fetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint);
    const data = await response.json();

    // Check if the parsed data contains an "Error Message" and throw an error if it does
    if (data["Error Message"]) {
        throw new Error(data["Error Message"]);
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch data, status code: ${response.status}`);
    }

    return data;
}

export async function searchStocks(query: string): Promise<Stock[]> {
    if (query.length === 0) {
        return [];
    }

    const endpoint = `https://financialmodelingprep.com/api/v3/search?query=${encodeURIComponent(query)}&apikey=${apiKey}`;
    return await fetchData<Stock[]>(endpoint);
}

export async function fetchStockData(symbol: string): Promise<Stock | null> {
    const endpoint = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;
    const data = await fetchData<Stock[]>(endpoint);

    if (data && data.length > 0) {
        return { ...data[0], fetched: true };
    }

    return null;
}

export async function fetchHistoricalStockData(symbol: string): Promise<HistoricalDataResponse | null> {
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - 30);

    const toDate = today.toISOString().split('T')[0];
    const fromDate = from.toISOString().split('T')[0];

    const endpoint = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${fromDate}&to=${toDate}&apikey=${apiKey}`;
    return await fetchData<HistoricalDataResponse>(endpoint);
}

