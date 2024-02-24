<script lang="ts">
  const NO_OF_CIRCLES = 20
  const INNER_RADIUS = 50
  const CIRCLES = Array(NO_OF_CIRCLES)
    .fill(INNER_RADIUS)
    .map((radius, i) => radius * (i + 1) ** ((i + 1) / 10))

  const NO_OF_RAYS = 23
  const RAY_WIDTH = 1.5

  const svgSize = NO_OF_CIRCLES * INNER_RADIUS
</script>

<div class="background">
  <svg viewBox="0 0 {svgSize} {svgSize}">
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
</div>

<style lang="css">
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: radial-gradient(circle, rgb(249 8 80) 0%, var(--svelte-orange) 88%);
  }

  svg {
    width: 100%;
    height: 100%;
  }
</style>
