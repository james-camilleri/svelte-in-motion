<script lang="ts">
  import AfterEffectsScripting from '$assets/after-effect-scripting.gif'
  import CanaryWharfClocks from '$assets/canary-wharf-clocks.jpg'
  import FFmpeg from '$assets/ffmpeg.png'
  import GraphicDesign from '$assets/graphic-design.gif'
  import GreaterLondonAndMalta from '$assets/greater-london+malta.png'
  import GreaterLondonAndMaltas from '$assets/greater-london+maltas.png'
  import GreaterLondon from '$assets/greater-london.png'
  import Keyframes from '$assets/keyframes.jpg'
  import Neopets from '$assets/neopets.png'
  import PlaywrightLogo from '$assets/playwright-logo.svg'
  import Rotoscope from '$assets/rotoscope.gif'
  import Arrow from '$lib/components/Arrow.svelte'
  import Slide from '$lib/components/Slide.svelte'

  // Import code fragments as raw text.
  import FakeTimers from './code-fragments/fake-timers?raw'
  import FFmpegConfig from './code-fragments/ffmpeg-config?raw'
  import ManualTick from './code-fragments/manual-tick?raw'
  import Playwright from './code-fragments/playwright?raw'
  import PrngInUse from './code-fragments/prng-in-use?raw'
  import SplitMix32 from './code-fragments/splitmix32?raw'
</script>

<Slide
  title="Svelte in Motion"
  subtitle="Procedurally-generated video using everyone's favourite framework and ungodly hackery."
/>

<!-- INTRODUCTION -->
<Slide title="hello." subtitle="I am James." />
<Slide image={GreaterLondon} />
<Slide image={GreaterLondonAndMalta} />
<Slide image={GreaterLondonAndMaltas} />
<Slide image={Neopets} imageFrame={false} />
<Slide image={GraphicDesign} imageFrame={false} dark />

<!-- ANIMATION OVERVIEW -->
<Slide title="animation, more or less" subtitle="An overly-simplified and reductive overview." />
<Slide image={Rotoscope} attribution={['Carliihde (DeviantArt)', 'https://www.deviantart.com/carliihde']} />
<Slide image={Keyframes} />
<Slide
  image={AfterEffectsScripting}
  attribution={[
    'Arthur Wilton (Medium)',
    'https://artwilton.medium.com/after-effects-expression-basics-wiggle-b3dab195a1f0',
  ]}
/>
<Slide title="what if? (???)" subtitle="What if we cut out the middle man (/men/people)?" />
<Slide title="video through code" subtitle="Creating actual usable video files with front-end development tools." />
<Slide iframe="https://www.remotion.dev/" />
<Slide title="react?" subtitle=":(" dark />
<Slide title="svelte!" subtitle=":)" />

<!-- PROJECT DESCRIPTION -->
<Slide title="disclaimer.">
  <p>
    This is not a product, library, or "project", in any way, shape, or form. It is a haphazard collection of
    <strong>hackery and botches</strong> that did what I needed it to do at the time. You are free to use and abuse it as
    you see fit, but I would hardly call it a production-ready solution.
  </p>
</Slide>
<Slide title="but why?" subtitle="Why would you do this?">
  <p>Why yes, it is a hassle. Would not recommend it for a single video.</p>
  <p>
    If you require multiple subtly different videos, however, or personalised/data-driven videos (title slides, spotify
    wrapped, etc.) this could come in handy.
  </p>
</Slide>

<!-- PROBLEM 1: CAPTURE -->
<Slide title="problems" subtitle="Never a dull moment.">
  <p>
    <strong>1.</strong> How do we get the animation out of the browser?<br />
    <strong>2.</strong> How do we make it deterministic?<br />
    <strong>3.</strong> How do make it into a usable video file?
  </p>
</Slide>
<Slide image={PlaywrightLogo} imageFrame={false} />
<Slide code={Playwright} />
<Slide title="erm." subtitle="Doesn't Playwright have screen recording functionality?">
  <p>
    Yes, but:<br />
    <Arrow /> quality isn't great<br />
    <Arrow /> can't pause and resume renders<br />
    <Arrow /> if something goes wrong you have to start over<br />
    <Arrow /> you can parallelise rendering of individual frames :)<br />
  </p>
</Slide>

<!-- PROBLEM 2: DETERMINISM -->
<Slide title="problems" subtitle="Never a dull moment.">
  <p>
    <strike><strong>1.</strong> How do we get the animation out of the browser?<br /></strike>
    <strong>2.</strong> How do we make it deterministic?<br />
    <strong>3.</strong> How do make it into a usable video file?
  </p>
</Slide>
<Slide
  image={CanaryWharfClocks}
  attribution={[
    'Alexandru Vicol (Unsplash)',
    'https://unsplash.com/photos/grayscale-photo-of-people-walking-on-street-D9FQYwAclwQ',
  ]}
/>
<Slide code={FakeTimers} />
<Slide code={ManualTick} />
<Slide title="I see." subtitle="Yes, you do.">
  <p>
    Good stuff:<br />
    <Arrow /> it'll be the same, every time<br />
    <Arrow /> no (or fewer) problems with laginess or browser flakiness<br />
    <Arrow /> you can render subsets of the animation<br />
    <Arrow /> you can very easily adjust the framerate<br />
    <Arrow /> again, you can parallelise rendering :)<br />
  </p>
</Slide>

<!-- PROBLEM 3: COMPOSITING -->
<Slide title="problems" subtitle="Never a dull moment.">
  <p>
    <strike><strong>1.</strong> How do we get the animation out of the browser?<br /></strike>
    <strike><strong>2.</strong> How do we make it deterministic?<br /></strike>
    <strong>3.</strong> How do make it into a usable video file?
  </p>
</Slide>
<Slide code={FFmpeg} />
<Slide code={FFmpegConfig} />

<Slide title="problems" subtitle="Never a dull moment.">
  <p>
    <strike><strong>1.</strong> How do we get the animation out of the browser?<br /></strike>
    <strike><strong>2.</strong> How do we make it deterministic?<br /></strike>
    <strike><strong>3.</strong> How do make it into a usable video file?</strike>
  </p>
</Slide>

<!-- PARAMETRISED/PROCEDURAL VIDEO -->
<Slide title="PRNG" subtitle="pseudo-random number generators" />

<Slide title="PRNGs" subtitle="(Pseudo-random number generators.)" />
<Slide code={SplitMix32} />
<Slide code={PrngInUse} />
