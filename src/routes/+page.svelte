<script>
    import ResultTable from "$lib/components/ResultTable.svelte";
    import SearchField from "$lib/components/SearchField.svelte";
</script>

<div class="space-y-10 text-center flex flex-col items-center">
    <h1 class="text-4xl font-bold">Stockviewer</h1>
    <div class="flex justify-center">
        <SearchField />
    </div>
    <div class="flex justify-center">
        <ResultTable />
    </div>
</div>