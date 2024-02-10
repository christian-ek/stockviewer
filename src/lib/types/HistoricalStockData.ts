export type HistoricalStockData = {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    adjClose: number;
    volume: number;
    unadjustedVolume: number;
    change: number;
    changePercent: number;
    vwap: number;
    label: string;
    changeOverTime: number;
};

export type HistoricalDataResponse = {
    symbol: string;
    historical: HistoricalStockData[];
};