<script lang="ts">
  import './global.css'
  import 'reveal.js/dist/reveal.css'
  // import 'reveal.js/dist/theme/night.css'

  import { browser } from '$app/environment'
  import Background from '$lib/components/layout/Background.svelte'
  import { initialiseReveal } from '$lib/utils'

  if (browser) {
    initialiseReveal()
  }
</script>

<div class="reveal">
  <div class="slides">
    <slot />
  </div>
</div>
<Background />

<style lang="css">
  .reveal {
    width: 100vw;
    height: 100vh;
  }
</style>
