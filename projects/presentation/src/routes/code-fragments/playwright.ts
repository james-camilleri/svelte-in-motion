for (let i = 0; i < frames; i++) {
  test(`${filename}: rendering frame ${i}`, async ({ page }) => {
    await page.setViewportSize(resolution)
    await page.goto(`/render/${scene}/${i}?${query}`)
    await page.screenshot({ path: `output/${filename}/${i}.png`, omitBackground: true })
  })
}
