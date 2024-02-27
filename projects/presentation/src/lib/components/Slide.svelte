<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'

  export let title = ''
  export let subtitle = ''

  export let image = ''
  export let imageFrame = true
  export let noResize = false
  export let attribution: undefined | string | [string, string] = undefined

  export let code = ''
  export let dark = false

  export let iframe = ''

  const dataAttributes = {
    'data-transition': 'zoom',
    ...(iframe
      ? {
          'data-preload': true,
          'data-background-iframe': iframe,
          'data-background-interactive': true,
        }
      : undefined),
  }
</script>

<section {...dataAttributes} class:dark>
  {#if title}
    <h1>{title}</h1>
  {/if}
  {#if subtitle}
    <p class="subtitle" class:subtitle-only={!title}>
      <SvelteMarkdown source={subtitle} isInline />
    </p>
  {/if}
  {#if image}
    <div class="img-wrapper">
      <div class="img-inner-wrapper" class:frame={imageFrame} class:no-resize={noResize}>
        <img src={image} class:frame={imageFrame} />
        <div class="img-drop-shadow" class:frame={imageFrame} />

        {#if attribution}
          <div class="attribution">
            {#if typeof attribution === 'string'}
              {attribution}
            {:else}
              <span>{attribution[0]}</span>
              <span>/</span>
              <a href={attribution[1]}>{attribution[1]}</a>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {/if}
  {#if code}
    <pre><code class="language-ts" data-trim>{code}</code></pre>
  {/if}

  <div class="content-wrapper">
    <slot />
  </div>
</section>

<style lang="scss">
  section {
    position: relative;
    height: 100%;
    font-size: 2.5rem;
    font-variation-settings:
      'wght' 400,
      'wdth' 82;
    text-align: start;
  }

  h1 {
    margin: 5rem 0 2.5rem;
    font-size: 12rem;
    font-variation-settings:
      'wght' 700,
      'wdth' 75;
    filter: drop-shadow(0.4rem 0.3rem 0 var(--light));
  }

  .subtitle {
    position: relative;
    display: inline;
    margin-inline-start: 1.2rem;
    font-size: 2rem;
    font-variation-settings:
      'wght' 300,
      'wdth' 100;

    :global(del) {
      text-decoration-thickness: 10%;
    }

    &::before {
      position: absolute;
      top: -0.5em;
      left: -0.5em;
      z-index: -1;
      display: block;
      width: calc(100% + 1em);
      height: calc(100% + 1em);
      content: '';
      background: var(--light);
    }
  }

  .img-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .img-inner-wrapper {
    position: relative;

    &:not(.no-resize) {
      height: 90%;
    }
  }

  .img-drop-shadow {
    &.frame,
    &.frame::before {
      position: absolute;
      z-index: -1;
      display: block;
      width: 100%;
      height: 100%;
    }

    &.frame {
      top: 1rem;
      left: 1rem;
      background: var(--light);
    }

    &.frame::before {
      top: -0.6rem;
      left: -0.6rem;
      content: '';
      background: var(--svelte-orange);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;

    &.frame {
      outline: solid var(--dark) 3px;
      outline-offset: -3px;
    }
  }

  .attribution {
    position: absolute;
    bottom: 1em;
    left: 1em;
    font-size: 1rem;
    font-weight: 200;
    color: var(--dark);
    text-shadow: 1px 1px rgb(127 127 127 / 70%);

    span:nth-child(2) {
      font-weight: 500;
    }

    a {
      color: var(--dark);
      text-decoration-color: var(--grey);
    }
  }

  pre {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
  }

  code {
    min-height: auto !important; /* Override reveal.js style. */
    margin: auto 0;
  }

  .content-wrapper {
    margin-block-start: 5rem;

    :global(p) {
      max-width: 70vw;
      margin-inline-start: 1rem;
      line-height: 1.4;
    }

    :global(strong) {
      font-variation-settings:
        'wght' 550,
        'wdth' 82;
    }
  }
</style>
