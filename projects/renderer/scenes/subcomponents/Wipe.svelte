<script lang="ts">
  import { onMount } from 'svelte'
  import { spring } from 'svelte/motion'

  export let colour: string
  export let from: 'top' | 'right' | 'bottom' | 'left' = 'right'
  export let start: number
  export let rotation = 0

  // Add a bit of extra padding to the sliding div to avoid
  // showing what's underneath on the rebound effects.
  const PADDING_FRONT = 40
  const PADDING_BACK = 50
  const SIZE = 100 + PADDING_BACK

  const startX = from === 'left' ? -(SIZE + PADDING_FRONT) : from === 'right' ? SIZE + PADDING_FRONT : -PADDING_BACK / 2
  const startY = from === 'top' ? -(SIZE + PADDING_FRONT) : from === 'bottom' ? SIZE + PADDING_FRONT : -PADDING_BACK / 2
  const endX = from === 'left' ? -PADDING_FRONT : from === 'right' ? PADDING_FRONT : -PADDING_BACK / 2
  const endY = from === 'top' ? -PADDING_FRONT : from === 'bottom' ? PADDING_FRONT : -PADDING_BACK / 2
  const startRotation = rotation && rotation / -2
  const endRotation = rotation && rotation / 2

  const position = spring(
    {
      x: startX,
      y: startY,
      rotation: startRotation,
    },
    {
      stiffness: 0.04,
      damping: 0.15,
    },
  )

  onMount(() =>
    setTimeout(() => {
      position.set({
        x: endX,
        y: endY,
        rotation: endRotation,
      })
    }, start),
  )
</script>

<div
  class="wipe"
  style:--size={SIZE}
  style:background="var({colour})"
  style:left="{$position.x}vw"
  style:top="{$position.y}vh"
  style:transform="rotate({$position.rotation}deg)"
/>

<style>
  .wipe {
    position: fixed;
    width: calc(var(--size) * 1vw);
    height: calc(var(--size) * 1vh);
    transform-origin: center;
  }
</style>
