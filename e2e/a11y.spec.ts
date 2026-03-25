import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { PAGES } from './pages'

test.describe('accessibility', () => {
  for (const { path, name } of PAGES) {
    test(`${name} page has no accessibility violations`, async ({ page }) => {
      await page.goto(path)
      const results = await new AxeBuilder({ page }).analyze()
      expect(results.violations).toEqual([])
    })
  }
})
