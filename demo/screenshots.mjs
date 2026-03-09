import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '../docs/images')
const URL = process.env.DEMO_URL ?? 'http://localhost:5173/'

function waitFrames(page, n) {
  return page.evaluate(
    (count) =>
      new Promise((resolve) => {
        let i = 0;
        (function tick() {
          if (++i >= count) return resolve()
          requestAnimationFrame(tick)
        })()
      }),
    n,
  )
}

function fitToContent(page) {
  return page.evaluate(() => {
    window.__wb.getState().fitToContent()
  })
}

function focusPanels(page, rect, maxScale = 1.2) {
  return page.evaluate(
    ({ r, ms }) => window.__wb.getState().focusPanel(r, { maxScale: ms }),
    { r: rect, ms: maxScale },
  )
}

function setDark(page) {
  return page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  })
}

const shots = [
  {
    name: 'overview',
    description: 'All panels, light mode',
    setup: async (page) => {
      await waitFrames(page, 30)
      await fitToContent(page)
      await waitFrames(page, 20)
    },
  },
  {
    name: 'detail',
    description: 'First three panels zoomed in',
    setup: async (page) => {
      await waitFrames(page, 30)
      // Focus the first three panels: gettingStarted(420) + buttons(360) + forms(380) + 2 gaps(40)
      await focusPanels(page, { x: 40, y: 40, width: 1200, height: 600 }, 1.1)
      await waitFrames(page, 20)
    },
  },
  {
    name: 'dark',
    description: 'All panels, dark mode',
    setup: async (page) => {
      await setDark(page)
      await waitFrames(page, 10)
      await fitToContent(page)
      await waitFrames(page, 20)
    },
  },
]

async function main() {
  const browser = await chromium.launch({ headless: false })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })

  for (const shot of shots) {
    console.log(`Taking: ${shot.name} — ${shot.description}`)
    const page = await context.newPage()
    await page.goto(URL, { waitUntil: 'networkidle' })
    await waitFrames(page, 60)

    await shot.setup(page)

    await page.screenshot({ path: `${OUT}/${shot.name}.png` })
    await page.close()
  }

  await browser.close()
  console.log('Done!')
}

main().catch(console.error)
