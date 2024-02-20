export async function initialiseReveal() {
  const { default: Reveal } = await import('reveal.js')
  const { default: RevealHighlight } = await import('reveal.js/plugin/highlight/highlight.js')

  const deck = new Reveal({
    plugins: [RevealHighlight],
  })

  deck.initialize({
    center: false,
    preloadIframes: true,
    controlsTutorial: true,
    hash: true,
    hashOneBasedIndex: true,
    respondToHashChanges: true,
    autoPlayMedia: true,
  })
}
