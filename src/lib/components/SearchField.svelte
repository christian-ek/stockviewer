<script lang="ts">
    import { searchStocks } from '$lib/stores/stockStore';
	import { getToastStore } from '@skeletonlabs/skeleton';

    const toastStore = getToastStore();
    let inputValue: string = '';

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        searchStocks(inputValue.trim(), toastStore);
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="search-field-container space-y-5 mt-5 relative w-96">
        <input
            class="input w-full"
            type="search"
            bind:value={inputValue}
            placeholder="Search for a Stock..."
        />
    </div>
</form>
