import { Page, Locator } from '@playwright/test'

export class BasePage {
    readonly page: Page

    public constructor(page: Page) {
        this.page = page
    }
    async consentCookies() {
        await this.page.getByLabel('Consent', { exact: true }).click()
    }
}
