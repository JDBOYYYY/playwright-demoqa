import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './base.page';


export class RadioPage extends BasePage {
    readonly url: string = '/radio-button'
    readonly locators: {
        radio: {
            yes: Locator
            impressive: Locator
            no: Locator
        },
        elements: {
            outputBox: Locator
        }
    }

    public constructor(page: Page) {
        super(page);
        this.locators = {
            radio: {
                yes: page.locator('//input[@id="yesRadio"]'),
                impressive: page.locator('//input[@id="impressiveRadio"]'),
                no: page.locator('//input[@id="noRadio"]'),
            },
            elements: {
                outputBox: page.locator('//div[@id="output"]')
            }
        }
    }

    async visit() {
        await this.page.goto(this.url, { timeout: 60000 })
    }
    async fillForm(formData: FormData) {
    }
    async checkYesRadio() {
        await this.locators.radio.yes.check({ force: true })
    }
    async checkImpressiveRadio() {
        await this.locators.radio.impressive.check({ force: true })
    }
    async checkNoRadio() {
        await this.locators.radio.no.check({ force: true })
    }

    async checkIfCheckedYes() {
        await expect(this.locators.radio.yes).toBeChecked()
    }
    async checkIfCheckedImpressive() {
        await expect(this.locators.radio.impressive).toBeChecked()
    }
    async checkIfCheckedNo() {
        await expect(this.locators.radio.no).not.toBeChecked()
    }

}
