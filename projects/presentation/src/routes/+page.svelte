<script lang="ts">
  import AfterEffectsScripting from '$assets/after-effect-scripting.gif'
  import GraphicDesign from '$assets/graphic-design.gif'
  import GreaterLondonAndMalta from '$assets/greater-london+malta.png'
  import GreaterLondonAndMaltas from '$assets/greater-london+maltas.png'
  import GreaterLondon from '$assets/greater-london.png'
  import Keyframes from '$assets/keyframes.jpg'
  import Neopets from '$assets/neopets.png'
  import Rotoscope from '$assets/rotoscope.gif'
  import Slide from '$lib/components/layout/Slide.svelte'

  // Import code fragments as raw text.
  import PrngInUse from './code-fragments/prng-in-use?raw'
  import SplitMix32 from './code-fragments/splitmix32?raw'
</script>

<Slide
  title="Svelte in Motion"
  subtitle="Procedurally-generated video using everyone's favourite framework and ungodly hackery."
/>

<Slide title="hello." subtitle="I am James." />
<Slide image={GreaterLondon} />
<Slide image={GreaterLondonAndMalta} />
<Slide image={GreaterLondonAndMaltas} />
<Slide image={Neopets} imageFrame={false} />
<Slide image={GraphicDesign} imageFrame={false} dark />

<Slide title="animation, more or less" subtitle="an overly-simplified and reductive overview" />
<Slide image={Rotoscope} attribution={['Carliihde (DeviantArt)', 'https://www.deviantart.com/carliihde']} />
<Slide image={Keyframes} />
<Slide
  image={AfterEffectsScripting}
  attribution={[
    'Arthur Wilton (Medium)',
    'https://artwilton.medium.com/after-effects-expression-basics-wiggle-b3dab195a1f0',
  ]}
/>

<Slide iframe="https://www.remotion.dev/" />

<Slide title="PRNG" subtitle="pseudo-random number generators" />
<Slide code={SplitMix32} />
<Slide code={PrngInUse} />
