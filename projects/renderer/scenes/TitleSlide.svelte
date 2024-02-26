<script lang="ts">
  import { spring } from 'svelte/motion'

  import { seededRandom, randomBetween, randomIntBetween, shuffle } from '$lib/random'
  import { toMs } from '$lib/units'

  // [svelte-meetup]
  // Subcomponents for all the various fiddly animated bits.
  // They're in a bit of a state, apologies.TitleSlide

  import Bubble from './subcomponents/Bubble.svelte'
  import Wipe from './subcomponents/Wipe.svelte'
  import WipeWithEdge from './subcomponents/WipeWithEdge.svelte'
  import WipeWithParticles from './subcomponents/WipeWithParticles.svelte'

  // [svelte-meetup]
  // These props should be passed in via query parameters, but setting defaults
  // is useful so that the whole thing doesn't blow up while experimenting.
  export let name: string
  export let title: string
  export let length = '13'

  const START = 1000

  // [svelte-meetup]
  // Get a random number generator with stable outputs, based on the inputs to this scene.
  // Changing these props will change the random numbers generated.
  const random = seededRandom(`${name}-${title}`)

  // [svelte-meetup]
  // Svelte's excellent spring and tween stores can be used to get some nice and
  // natural motion without faffing around with lots of manual keyframing and pain.
  // Important to note that CSS animations aren't really usable in this process,
  // as they don't use the JS clock.
  const nameCoords = spring(
    { x: -50, y: 49 },
    {
      stiffness: 0.03,
      damping: 0.5,
    },
  )
  const titleCoords = spring(
    { x: -50, y: 50 },
    {
      stiffness: 0.03,
      damping: 0.5,
    },
  )

  // [svelte-meetup]
  // We can get a random variation of colour palette using the shuffle function too.
  const colours = shuffle(random, ['--svelte-orange', '--yellow-orange', '--dark-orange', '--yellow', '--pink'])

  // [svelte-meetup]
  // setTimeouts allow for scheduling things at particular points of the animation. As the
  // main clock is overridden by a fake timer in render mode, these will work as expected.
  setTimeout(() => {
    nameCoords.set({ x: 50, y: 49 })
  }, START + 300)

  setTimeout(() => {
    titleCoords.set({ x: 50, y: 50 })
  }, START + 500)
</script>

<main>
  <h1 style:left="{$nameCoords.x}vw" style:top="{$nameCoords.y}vh">{name}</h1>
  <h2 style:left="{$titleCoords.x}vw" style:top="{$titleCoords.y}vh">{title}</h2>

  <!-- Bottom-most colour. -->
  <Wipe colour={colours[0]} from="left" start={START} rotation={randomIntBetween(random, 3, 15)} />

  <!-- Second edge colour. -->
  <WipeWithEdge
    colour={colours[1]}
    offset={randomBetween(random, 3, 7)}
    rotation={randomBetween(random, 3, 15)}
    start={START + 20}
    from="left"
  />

  <!-- Main background with particle/rain effect. -->
  <WipeWithParticles
    colour="--light"
    from="left"
    offset={randomBetween(random, 10, 15)}
    particleColours={[colours[0], colours[1]]}
    rotation={randomBetween(random, 3, 15)}
    start={START + 40}
  />

  <!-- Bouncing circles. -->
  <Bubble
    x={randomBetween(random, 80, 90)}
    y={randomBetween(random, 40, 60)}
    start={START + 600}
    rotationDirection={random() > 0.5 ? 1 : -1}
    foreground={{
      colour: colours[2],
      size: randomBetween(random, 20, 30),
    }}
    background={{
      colour: colours[3],
      distance: 3,
      size: randomBetween(random, 30, 40),
      rotation: randomBetween(random, 0, 360),
    }}
    satellite={{
      colour: colours[4],
      size: randomBetween(random, 5, 15),
      rotation: randomBetween(random, 0, 360),
      distance: randomBetween(random, 25, 30),
    }}
  />

  <!-- Wipe to black. -->
  <Wipe colour="--black" from="left" start={toMs(Number(length) - 2)} rotation={randomIntBetween(random, 3, 15)} />
</main>

<style lang="scss">
  // [svelte-meetup]
  // We can style all the shapes and text with CSS – no buttons or annoying interfaces :).

  @font-face {
    font-family: josefin-sans;
    src: url('$assets/fonts/josefin-sans.woff2') format('woff2');
    font-display: block;
  }

  :root {
    --svelte-orange: hsl(12deg 95% 62%);
    --yellow-orange: hsl(32deg 95% 62%);
    --dark-orange: hsl(12deg 95% 10%);
    --yellow: hsl(50deg 100% 50%);
    --pink: rgb(249 8 80);
    --light: rgb(255 255 255);
    --grey: rgb(200 200 200);
    --dark: rgb(20 20 20);
    --black: rgb(0 0 0);

    font-family: josefin-sans, sans-serif;
  }

  main {
    --img-size: 33vw;

    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: var(--black);
  }

  h1,
  h2 {
    position: fixed;
    z-index: 1;
    display: block;
    width: 40vw;

    text-align: right;
  }

  h1 {
    font-size: 9vh;
    font-variation-settings: 'wght' 150;
    white-space: pre;
    transform: translate(-100%, -100%);
  }

  h2 {
    font-size: 5vh;
    font-variation-settings: 'wght' 800;
    text-transform: lowercase;
    white-space: pre;
    transform: translate(-100%);
  }
</style>
