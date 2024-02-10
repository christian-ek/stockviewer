export function formatMarketCap(value: number | undefined): string {
    if (value === undefined) return 'N/A';

    let suffix;
    let formattedValue;

    if (value >= 1e12) {
        suffix = 'T';
        formattedValue = (value / 1e12).toFixed(2); // Trillions
    } else if (value >= 1e9) {
        suffix = 'B';
        formattedValue = (value / 1e9).toFixed(2); // Billions
    } else if (value >= 1e6) {
        suffix = 'M';
        formattedValue = (value / 1e6).toFixed(2); // Millions
    } else if (value >= 1e3) {
        suffix = 'K';
        formattedValue = (value / 1e3).toFixed(2); // Thousands
    } else {
        return `${value.toFixed(2)}`; // Less than 1 thousand
    }

    return `${formattedValue}${suffix}`;
}

export function formatChangesBadge(changes: number | undefined, changesPercentage: number | undefined): string {
    if (changes === undefined || changesPercentage === undefined) return 'N/A';

    const badgeContent = `${changes.toFixed(2)} (${changesPercentage.toFixed(2)}%)`;
    const badgeClass = changes >= 0 ? 'variant-soft-success' : 'variant-soft-error';

    return `<span class="badge ${badgeClass}">${badgeContent}</span>`;
}

export function getLoadingSpinner(): string {
    return `<div
    class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        />
    </div>`;
}

export function getNotAvailableBadge(): string {
    return `<span class="badge variant-soft-error">N/A</span>`;
}

export function formatLastTrade(timestamp: number): string {
    if (timestamp === undefined) return 'N/A';

    const tradeDate = new Date(timestamp * 1000); // Convert timestamp from seconds to milliseconds
    const now = new Date();
    const diffInSeconds = (now.getTime() - tradeDate.getTime()) / 1000;
    const diffInDays = diffInSeconds / 86400;
    const diffInMonths = diffInDays / 30; // Approximate, as months have varying number of days

    let timeAgo = '';
    if (diffInSeconds < 60) {
        timeAgo = `${Math.round(diffInSeconds)} seconds ago`;
    } else if (diffInSeconds < 3600) { // Less than 1 hour
        const minutes = Math.floor(diffInSeconds / 60);
        timeAgo = `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) { // Less than 1 day
        const hours = Math.floor(diffInSeconds / 3600);
        timeAgo = `${hours} hours ago`;
    } else if (diffInDays < 7) { // Less than 1 week
        timeAgo = `${Math.floor(diffInDays)} days ago`;
    } else if (diffInMonths < 12) { // Less than 1 year
        timeAgo = `${Math.floor(diffInMonths)} months ago`;
    } else {
        // For more than 1 year, display "over a year ago"
        timeAgo = "over a year ago";
    }

    return timeAgo;
}
