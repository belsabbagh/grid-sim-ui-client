<script>

  // Function to flatten the data object
  const flattenData = (data) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (typeof value !== 'object') {
        acc.push({ key, value });
      }
      return acc;
    }, []);
  };
  export let data;
</script>

<table style="width: auto; border-collapse: collapse; margin: 10px auto;">
  <thead>
    <tr>
      {#each flattenData(data) as { key }}
        <th style="padding: 10px; border-bottom: 1px solid #ddd; text-align: left;">
          {key}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    <tr>
      {#each flattenData(data) as { value }}
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">
          {#if typeof value === 'object'}
            {JSON.stringify(value)}
          {:else}
            {value}
          {/if}
        </td>
      {/each}
    </tr>
  </tbody>
</table>
