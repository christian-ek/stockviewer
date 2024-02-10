<script lang="ts">
  import type { ApexOptions } from 'apexcharts'
  import { onDestroy, onMount } from 'svelte';
  import type { HistoricalDataResponse } from '$lib/types/HistoricalStockData';

  export let data: HistoricalDataResponse;
  let chart: any;

  // Reactive statement to check if data is available
  $: isDataAvailable = data && data.historical && data.historical.length > 0;

  const processChartData = (historicalData: HistoricalDataResponse['historical']): ApexAxisChartSeries => {
    return [{
      name: data.symbol,
      data: historicalData.map(item => ({
        x: new Date(item.date).getTime(), // Convert date to timestamp for x value
        y: item.close // Use closing price for y value
      }))
    }];
  };

  onMount(async () => {
    if (isDataAvailable && typeof window !== 'undefined') {
      const ApexCharts = (await import('apexcharts')).default;
      
      const seriesData = processChartData(data.historical);
      const options: ApexOptions = {
        series: seriesData,
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          opposite: true
        },
        legend: {
          horizontalAlign: 'left'
        }
      };

      const node = document.getElementById('apex-chart');
      if (node instanceof HTMLElement) {
        chart = new ApexCharts(node, options);
        await chart.render();
      }
    }
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>

{#if isDataAvailable}
  <div id="chart-wrapper">
    <div id="apex-chart"></div>
  </div>
{:else}
  <div class="text-2xl font-bold">
    <h1>No data available to display the chart.</h1>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  #chart-wrapper {
    min-width: 700px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
  }

  #apex-chart {
    width: 100%;
    padding: 2rem;
    padding-right: 2.8rem;
    margin: .5rem;
    background: white;
    border-radius: 6px;
    color: black;
  }

  #apex-chart :global(.apexcharts-svg) {
    overflow: visible;
  }
</style>
