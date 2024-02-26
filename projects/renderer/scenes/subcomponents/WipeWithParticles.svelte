<script lang="ts">
  import { onMount } from 'svelte'
  import { spring } from 'svelte/motion'

  import { randomBetween, seededRandom } from '$lib/random'

  export let colour: string
  export let from: 'top' | 'right' | 'bottom' | 'left' = 'right'
  export let start: number
  export let rotation = 0
  export let offset = 0
  export let particleColours: string[]

  // Add a bit of extra padding to the sliding div to avoid
  // showing what's underneath on the rebound effects.
  const PADDING_FRONT = offset
  const PADDING_BACK = 50
  const SIZE = 100 + PADDING_BACK

  const random = seededRandom(`${rotation}${particleColours[0]}${offset}`)

  const startX = from === 'left' ? -(SIZE + PADDING_FRONT) : from === 'right' ? SIZE + PADDING_FRONT : -PADDING_BACK / 2
  const startY = from === 'top' ? -(SIZE + PADDING_FRONT) : from === 'bottom' ? SIZE + PADDING_FRONT : -PADDING_BACK / 2
  const endX = from === 'left' ? PADDING_FRONT : from === 'right' ? -PADDING_FRONT : -PADDING_BACK / 2
  const endY = from === 'top' ? PADDING_FRONT : from === 'bottom' ? -PADDING_FRONT : -PADDING_BACK / 2
  const startRotation = rotation && rotation / -2
  const endRotation = rotation && rotation / 2

  let particles = Array(80)
    .fill(0)
    .map(() => {
      const height = randomBetween(random, 20, 35)
      return {
        x: randomBetween(random, 5, SIZE),
        y: -5,
        width: height / 100,
        height,
        opacity: randomBetween(random, 0.05, 0.2),
        speed: randomBetween(random, 0.2, 0.7),
      }
    })

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

  onMount(() => {
    let animationFrameId: number
    const rain = () => {
      particles = particles.map((particle, i) => {
        if (particle.y > SIZE + 5) {
          return { ...particle, y: -5 }
        }

        return { ...particle, y: particle.y + particle.speed }
      })
      animationFrameId = requestAnimationFrame(rain)
    }

    setTimeout(() => {
      position.set({
        x: endX,
        y: endY,
        rotation: endRotation,
      })
    }, start)

    setTimeout(rain, start + 1000)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  })
</script>

<div
  class="wipe"
  style:--size={SIZE}
  style:background="var({colour})"
  style:left="{$position.x}vw"
  style:top="{$position.y}vh"
  style:transform="rotate({$position.rotation}deg)"
>
  {#each particles as { x, y, width, height, opacity }, i}
    <div
      class="particle"
      style:--width="{width}vw"
      style:left="{x}vw"
      style:top="{y}vh"
      style:width="{width}vw"
      style:height="{height}vh"
      style:background="var({i % 3 === 0 ? particleColours[0] : particleColours[1]})"
      style:opacity
    />
  {/each}
</div>

<style>
  .wipe {
    position: fixed;
    width: calc(var(--size) * 1vw);
    height: calc(var(--size) * 1vh);
    transform-origin: center;
  }

  .particle {
    position: absolute;
    border-radius: calc(var(--width));
  }
</style>
