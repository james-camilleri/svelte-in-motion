import type { SeededRandom } from './random'

import { writable } from 'svelte/store'

export async function initialiseReveal() {
  const { default: Reveal } = await import('reveal.js')
  const { default: RevealHighlight } = await import('reveal.js/plugin/highlight/highlight.js')

  await Reveal.initialize({
    autoPlayMedia: true,
    center: false,
    controls: true,
    controlsTutorial: false,
    hash: true,
    hashOneBasedIndex: false,
    height: 1080,
    plugins: [RevealHighlight],
    preloadIframes: true,
    respondToHashChanges: true,
    width: 1920,
  })

  return Reveal
}

export const slideState = writable<{
  currentSlide?: HTMLElement
  slideIndex?: number
  random?: SeededRandom
}>({})
