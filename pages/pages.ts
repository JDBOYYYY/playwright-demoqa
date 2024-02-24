import { test as base } from '@playwright/test'
import { TextBoxPage } from './textBox.page'
import { CheckBoxPage } from './checkBox.page'
import { RadioPage } from './radio.page';

export const test = base.extend<{ textBoxPage: TextBoxPage, checkBoxPage: CheckBoxPage, radioPage: RadioPage }>({
  textBoxPage: async ({ page }, use) => {
    const textBoxPage = new TextBoxPage(page);
    await use(textBoxPage);
  },
  checkBoxPage: async ({ page }, use) => {
    const checkBoxPage = new CheckBoxPage(page);
    await use(checkBoxPage);
  },
  radioPage: async ({ page }, use) => {
    const radioPage = new RadioPage(page);
    await use(radioPage);
  },
});

