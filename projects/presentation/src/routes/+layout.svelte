<script lang="ts">
  import '../styles/global.css'
  import '../styles/syntax-highlight.css'
  import 'reveal.js/dist/reveal.css'

  import { browser } from '$app/environment'
  import Background from '$lib/components/background/Background.svelte'
  import { SeededRandom } from '$lib/random'
  import { initialiseReveal, slideState } from '$lib/reveal'

  if (browser) {
    initialiseReveal().then((Reveal) => {
      Reveal.on('slidechanged', (event) => {
        slideState.set({
          currentSlide: event.currentSlide,
          slideIndex: event.indexh,
          random: new SeededRandom(event.currentSlide.innerHTML),
        })
      })
    })
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
