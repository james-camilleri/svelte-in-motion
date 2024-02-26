import { test } from '@playwright/test'

import { config, renders } from './config.js'

const { framerate = 60, resolution = { width: 1280, height: 720 }, compositeOnly = false } = config || {}

renders().forEach(({ scene, filename, query, length, skip }, i) => {
  const frames = framerate * (length as number)

  if (skip) {
    return
  }

  // [svelte-meetup]
  // Create a test for each frame, load and screenshot.

  /* Render the individual frames:
   * - navigate to the correct scene and frame using the URL.
   * - set the correct size and wait for the page to scale
   * - take a screenshot of the in-browser page
   */
  if (!compositeOnly) {
    for (let j = 0; j < frames; j++) {
      test(`${i}-${filename}: rendering frame ${j}`, async ({ page }) => {
        await page.setViewportSize(resolution)
        await page.goto(`/render/${scene}/${j}?${query}`)
        await page.waitForTimeout(300)
        await page.screenshot({ path: `output/frames.nosync.me/${filename}-${i}/${j}.png`, omitBackground: true })
      })
    }
  }
})

// Create dummy test to stop Playwright from failing.
if (compositeOnly) {
  test('Compositing existing frames', () => undefined)
}
