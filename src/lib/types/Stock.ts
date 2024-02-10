export interface Stock {
    symbol: string;
    name: string;
    price?: number;
    changesPercentage?: number;
    change?: number;
    marketCap?: number;
    timestamp?: number;
    fetched: boolean;
}
