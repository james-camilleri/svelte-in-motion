<script lang="ts">
  import { onMount } from 'svelte'
  import { spring, type Spring } from 'svelte/motion'

  export let x: number
  export let y: number
  export let rotationDirection = 1

  export let foreground: {
    size: number
    colour: string
  }

  export let background: {
    size: number
    distance: number
    rotation: number
    colour: string
  }

  export let satellite:
    | {
        size: number
        distance: number
        rotation: number
        colour: string
      }
    | undefined = undefined

  export let start: number

  const foregroundMotion = spring({ size: 0 }, { stiffness: 0.07, damping: 0.2 })
  const backgroundMotion = spring({ size: 0, distance: 0 }, { stiffness: 0.05, damping: 0.1 })
  let satelliteMotion: Spring<{ size: number; distance: number }>
  if (satellite) {
    satelliteMotion = spring(
      { size: 0, distance: background.size / 2 - satellite.size },
      { stiffness: 0.03, damping: 0.05 },
    )
  }

  onMount(() =>
    setTimeout(() => {
      foregroundMotion.set({
        size: foreground.size,
      })

      backgroundMotion.set({
        size: background.size,
        distance: background.distance,
      })

      if (satellite) {
        satelliteMotion.set({
          size: satellite.size,
          distance: satellite.distance,
        })
      }

      let animationFrameId: number
      const rotate = () => {
        background.rotation -= 0.5 * rotationDirection

        if (satellite) {
          satellite.rotation += 1 * rotationDirection
          satelliteMotion.update(({ distance }) => ({
            size: satellite.size,
            distance: distance + 0.001,
          }))
        }
        animationFrameId = requestAnimationFrame(rotate)
      }
      rotate()

      return () => {
        cancelAnimationFrame(animationFrameId)
      }
    }, start),
  )
</script>

<div
  class="bubble"
  style:--left="{x}vw"
  style:--top="{y}vh"
  style:--foreground-size="{$foregroundMotion.size}vw"
  style:--foreground-colour="var({foreground.colour})"
  style:--background-size="{$backgroundMotion.size}vw"
  style:--background-distance="{$backgroundMotion.distance}vw"
  style:--background-rotation="{background.rotation}deg"
  style:--background-colour="var({background.colour})"
  style:--satellite-size="{$satelliteMotion && $satelliteMotion.size}vw"
  style:--satellite-distance="{$satelliteMotion && $satelliteMotion.distance}vw"
  style:--satellite-rotation="{satellite?.rotation}deg"
  style:--satellite-colour="var({satellite?.colour})"
>
  <div class="background" />
  <div class="foreground" />
  {#if satellite}
    <div class="satellite" />
  {/if}
</div>

<style>
  .bubble {
    position: fixed;
    top: var(--top);
    left: var(--left);
    width: var(--size);
    height: var(--size);
    transform: translate(-50%, -50%) rotate(var(--rotation)) translate(var(--distance));
  }

  .foreground,
  .background,
  .satellite {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;

    width: var(--size);
    height: var(--size);

    background: var(--colour);
    border-radius: 50%;
    transform: translate(-50%, -50%) rotate(var(--rotation)) translate(var(--distance));
  }

  .foreground {
    --colour: var(--foreground-colour);
    --size: var(--foreground-size);
    --rotation: 0;
    --distance: 0;
  }

  .background {
    --colour: var(--background-colour);
    --size: var(--background-size);
    --rotation: var(--background-rotation);
    --distance: var(--background-distance);
  }

  .satellite {
    --colour: var(--satellite-colour);
    --size: var(--satellite-size);
    --distance: var(--satellite-distance);
    --rotation: var(--satellite-rotation);
  }
</style>
