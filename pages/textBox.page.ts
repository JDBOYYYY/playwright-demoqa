import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './base.page';

interface FormData {
  name?: string;
  email?: string;
  currentAddress?: string;
  permanentAddress?: string;
}

export class TextBoxPage extends BasePage {
  readonly url: string = '/text-box'
  readonly locators: {
    inputs: {
      name: Locator
      email: Locator
      currentAddress: Locator
      permanentAddress: Locator
    }
    buttons: {
      submit: Locator
    }
    elements: {
      outputBox: Locator
    }
  }

  public constructor(page: Page) {
    super(page);
    this.locators = {
      inputs: {
        name: page.getByPlaceholder('Full Name'),
        email: page.getByPlaceholder('name@example.com'),
        currentAddress: page.getByPlaceholder('Current Address'),
        permanentAddress: page.locator('#permanentAddress'),
      },
      buttons: {
        submit: page.getByRole('button', { name: 'Submit' })
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
    if (formData.name) {
      await this.locators.inputs.name.fill(formData.name)
    }
    if (formData.email) {
      await this.locators.inputs.email.fill(formData.email)
    }
    if (formData.currentAddress) {
      await this.locators.inputs.currentAddress.fill(formData.currentAddress)
    }
    if (formData.permanentAddress) {
      await this.locators.inputs.permanentAddress.fill(formData.permanentAddress)
    }
  }
  async submitForm() {
    await this.locators.buttons.submit.click()
  }
  async checkOutput(formData: FormData) {
    const fields: (keyof FormData)[] = ['name', 'email', 'currentAddress', 'permanentAddress']
    for (const field of fields) {
      const fieldValue = formData[field]
      const locator = this.locators.elements.outputBox.locator(`//p[@id="${field}"]`)

      if (fieldValue !== undefined) {
        await expect.soft(locator).toContainText(fieldValue)
      } else {
        await expect.soft(locator).not.toBeVisible()
      }
    }
  }
}
