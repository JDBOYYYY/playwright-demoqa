import { test as base } from '@playwright/test'
import { TextBoxPage } from './textBox.page'

export const test = base.extend<{ textBoxPage: TextBoxPage }>({
  textBoxPage: async ({ page }, use) => {
    const textBoxPage = new TextBoxPage(page)
    await use(textBoxPage)
  },
})
