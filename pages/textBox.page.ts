import { Locator, Page, expect } from '@playwright/test'

interface FormData {
  name?: string;
  email?: string;
  currentAddress?: string;
  permanentAddress?: string;
}

export class TextBoxPage {
  readonly page: Page
  readonly url: string = '/text-box'
  readonly locators: {
    inputs:{
      name: Locator
      email: Locator
      currentAddress: Locator
      permanentAddress: Locator
    }
    buttons:{
      submit:Locator
    }
    elements:{
      outputBox:Locator
    }
  }

  public constructor (page: Page) {
    this.page = page
    this.locators = {
      inputs:{
        name: page.getByPlaceholder('Full Name'),
        email: page.getByPlaceholder('name@example.com'),
        currentAddress: page.getByPlaceholder('Current Address'),
        permanentAddress: page.locator('#permanentAddress'),
      },
      buttons:{
        submit: page.getByRole('button', { name: 'Submit' })
      },
      elements:{
        outputBox: page.locator('//div[@id="output"]')
      }
    }
  }

  async visit () {
    await this.page.goto(this.url)
  }
  async fillForm (formData: FormData) {
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
  async submitForm () {
    await this.locators.buttons.submit.click()
  }
  async checkOutput (formData: FormData) {
    if (formData.name) {
      await expect.soft(
        this.locators.elements.outputBox.locator('//p[@id="name"]')
      ).toContainText(formData.name)
    }
    if (formData.email) {
      await expect.soft(
        this.locators.elements.outputBox.locator('//p[@id="email"]')
      ).toContainText(formData.email)
    }
    if (formData.currentAddress) {
      await expect.soft(
        this.locators.elements.outputBox.locator('//p[@id="currentAddress"]')
      ).toContainText(formData.currentAddress)
    }
    if (formData.permanentAddress) {
      await expect.soft(
        this.locators.elements.outputBox.locator('//p[@id="permanentAddress"]')
      ).toContainText(formData.permanentAddress)
    }
  }
}
