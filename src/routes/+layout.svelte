<script lang="ts">
    import '../app.postcss';
    import { AppShell } from '@skeletonlabs/skeleton';
    import { Toast, initializeStores } from '@skeletonlabs/skeleton';
	import Loader from '$lib/components/Loader.svelte';

    initializeStores();

	import { beforeNavigate, afterNavigate } from '$app/navigation';

	let isLoading = false;

    beforeNavigate(({ to }) => {
        if (to && to.route.id) {
            isLoading = true;
        }
    });
	afterNavigate(() => (isLoading = false));
</script>

<Toast />

<AppShell>
	<div class="container h-full mx-auto flex justify-center items-center">
		{#if isLoading}
			<Loader />
		{:else}
			<slot />
		{/if}
	</div>
</AppShell>
