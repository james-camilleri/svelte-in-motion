<script lang="ts">
  import { browser } from '$app/environment'
  import { initialiseReveal } from '$lib/utils'

  if (browser) {
    initialiseReveal()
  }
</script>
