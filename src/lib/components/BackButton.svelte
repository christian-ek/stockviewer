<script lang="ts">
    import Fa from 'svelte-fa';
    import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

    function goBack() {
        window.history.back(); // Navigate back to the previous page
    }
</script>

<button type="button" on:click={goBack} class="btn btn-lg variant-soft">
    <Fa icon={faArrowLeft} />
</button>
