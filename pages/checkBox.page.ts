import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './base.page';

type CheckboxName = 'Home' | 'Desktop' | 'Notes' | 'Commands' | 'Documents' | 'WorkSpace' | 'React' | 'Angular' | 'Veu' | 'Office' | 'Public' | 'Private' | 'Classified' | 'General' | 'Downloads' | 'Word File.doc' | 'Excel File.doc';
type toggleName = 'Home' | 'Desktop' | 'Documents' | 'WorkSpace' | 'Office' | 'Downloads'
export class CheckBoxPage extends BasePage {
    readonly url: string = '/checkbox'
    readonly locators: {
        elements: {
            outputBox: Locator
        }
    }
    private checkboxLocators: Record<CheckboxName, Locator>;
    private toggleLocators: Record<toggleName, Locator>;

    public constructor(page: Page) {
        super(page);
        this.locators = {
            elements: {
                outputBox: page.locator('//div[@id="result"]')
            }
        }
        this.checkboxLocators = {
            'Home': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Home"]'),
            'Desktop': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Desktop"]'),
            'Notes': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Notes"]'),
            'Commands': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Commands"]'),
            'Documents': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Documents"]'),
            'WorkSpace': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="WorkSpace"]'),
            'React': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="React"]'),
            'Angular': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Angular"]'),
            'Veu': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Veu"]'),
            'Office': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Office"]'),
            'Public': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Public"]'),
            'Private': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Private"]'),
            'Classified': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Classified"]'),
            'General': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="General"]'),
            'Downloads': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Downloads"]'),
            'Word File.doc': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Word File.doc"]'),
            'Excel File.doc': page.locator('//span[@class = "rct-checkbox"]/following-sibling::span[2][text()="Excel File.doc"]'),
        }
        this.toggleLocators = {
            'Home': page.locator('//span[text()="Home"]/ancestor::span//button'),
            'Desktop': page.locator('//span[text()="Desktop"]/ancestor::span//button'),
            'Documents': page.locator('//span[text()="Documents"]/ancestor::span//button'),
            'WorkSpace': page.locator('//span[text()="WorkSpace"]/ancestor::span//button'),
            'Office': page.locator('//span[text()="Office"]/ancestor::span//button'),
            'Downloads': page.locator('//span[text()="Downloads"]/ancestor::span//button'),
        };
    }

    async visit() {
        await this.page.goto(this.url, { timeout: 60000 })
    }
    async checkCheckboxDisplay(...names: CheckboxName[]) {
        for (const name of names) {
            await expect(this.checkboxLocators[name]).toBeVisible();
        }
    }
    async clickCheckbox(name: CheckboxName) {
        await this.checkboxLocators[name].click();
    }
    async clickToggle(name: toggleName) {
        await this.toggleLocators[name].click();
    }
    async checkOutput(...names: CheckboxName[]) {
        if (names.length === 0) {
            await expect(this.locators.elements.outputBox).not.toBeVisible();
        } else {
            for (const name of names) {
                if (name === 'Word File.doc') {
                    await expect(this.locators.elements.outputBox).toContainText('WordFile', { ignoreCase: true });
                } else if (name === 'Excel File.doc') {
                    await expect(this.locators.elements.outputBox).toContainText('ExcelFile', { ignoreCase: true });
                } else {
                    await expect(this.locators.elements.outputBox).toContainText(name, { ignoreCase: true });
                }
            }
        }
    }
}
