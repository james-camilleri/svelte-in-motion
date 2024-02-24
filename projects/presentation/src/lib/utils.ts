export async function initialiseReveal() {
  const { default: Reveal } = await import('reveal.js')
  const { default: RevealHighlight } = await import('reveal.js/plugin/highlight/highlight.js')

  const deck = new Reveal({
    plugins: [RevealHighlight],
  })

  deck.initialize({
    autoPlayMedia: true,
    center: false,
    controls: false,
    controlsTutorial: true,
    hash: true,
    hashOneBasedIndex: true,
    height: 1080,
    preloadIframes: true,
    respondToHashChanges: true,
    width: 1920,
  })
}
