<script lang="ts">
  import { Canvas } from '@threlte/core'

  import { slideState } from '$lib/reveal'

  import Shapes from './Shapes.svelte'

  const NO_OF_CIRCLES = 20
  const INNER_RADIUS = 50
  const CIRCLES = Array(NO_OF_CIRCLES)
    .fill(INNER_RADIUS)
    .map((radius, i) => radius * (i + 1) ** ((i + 1) / 10))

  const NO_OF_RAYS = 23
  const RAY_WIDTH = 1.5

  const svgSize = NO_OF_CIRCLES * INNER_RADIUS

  let dark: boolean
  $: {
    const slide = $slideState?.currentSlide
    dark = !!(slide?.classList.contains('dark') || slide?.querySelector('code'))
  }
</script>

<div class="background" class:dark>
  <svg viewBox="0 0 {svgSize} {svgSize}" class="fullscreen">
    {#each CIRCLES as r, i}
      <circle
        cx={svgSize / 2}
        cy={svgSize / 2}
        {r}
        fill="none"
        stroke="white"
        stroke-width={0.7 - 0.04 * i}
        stroke-opacity={0.15 * i}
      />
    {/each}

    {#each { length: NO_OF_RAYS } as _, i}
      <polygon
        points="0,{-RAY_WIDTH / 30} {svgSize * 1.5},{-RAY_WIDTH} {svgSize * 1.5},{RAY_WIDTH} 0,{RAY_WIDTH / 30}"
        transform="translate({svgSize / 2} {svgSize / 2}) rotate({(360 / NO_OF_RAYS) * i})"
        fill="white"
        stroke="none"
        opacity={0.3}
      />
    {/each}
  </svg>

  <Canvas>
    <Shapes />
  </Canvas>
</div>

<style lang="css">
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: radial-gradient(circle, var(--pink) 0%, var(--svelte-orange) 88%);
  }

  .background::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background: radial-gradient(circle, var(--black) 0%, var(--dark) 60%);
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .background.dark::before {
    opacity: 1;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.5s ease-in-out;
  }

  .background.dark svg {
    opacity: 0.3;
  }
</style>
