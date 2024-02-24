import { test } from '../pages/pages';
import { allure } from 'allure-playwright';
test.describe('Checkbox Page Tests', () => {

    test.beforeEach(async ({ checkBoxPage }) => {
        await checkBoxPage.visit();
        await checkBoxPage.consentCookies()
    })

    test('Check toggle checkboxes', async ({ checkBoxPage }) => {
        allure.suite('Check Box Page');
        allure.subSuite('Check toggle checkboxes');
        allure.description('Verifies if checkboxes are correctly displayed after toggle');
        allure.severity('Normal');

        await checkBoxPage.clickToggle('Home')
        await checkBoxPage.checkCheckboxDisplay('Home', 'Desktop', 'Documents', 'Downloads')

        await checkBoxPage.clickToggle('Desktop')
        await checkBoxPage.checkCheckboxDisplay('Home', 'Desktop', 'Documents', 'Downloads', 'Notes', 'Commands')
        await checkBoxPage.clickToggle('Desktop')
        await checkBoxPage.checkCheckboxDisplay('Home', 'Desktop', 'Documents', 'Downloads')

        await checkBoxPage.clickToggle('Documents')
        await checkBoxPage.checkCheckboxDisplay('Home', 'Desktop', 'Documents', 'Downloads', 'WorkSpace', 'Office')

        await checkBoxPage.clickToggle('WorkSpace')
        await checkBoxPage.checkCheckboxDisplay('Home', 'Desktop', 'Documents', 'Downloads', 'WorkSpace', 'Office', 'React', 'Angular', 'Veu')

        await checkBoxPage.clickToggle('Office')
        await checkBoxPage.checkCheckboxDisplay('Home', 'Desktop', 'Documents', 'Downloads', 'WorkSpace', 'Office', 'React', 'Angular', 'Veu', 'Public', 'Private', 'Classified', 'General')

        await checkBoxPage.clickToggle('Downloads')
        await checkBoxPage.checkCheckboxDisplay('Home', 'Desktop', 'Documents', 'Downloads', 'WorkSpace', 'Office', 'React', 'Angular', 'Veu', 'Public', 'Private', 'Classified', 'General', 'Word File.doc', 'Excel File.doc')

    })

    test('Check checkboxes', async ({ checkBoxPage }) => {
        allure.suite('Check Box Page');
        allure.subSuite('Individual Selection');
        allure.description('Verifies if individual checkboxes can be selected.')
        allure.severity('Normal')

        await checkBoxPage.clickCheckbox('Home');
        await checkBoxPage.checkOutput('Home', 'Desktop', 'Documents', 'Downloads', 'WorkSpace', 'Office', 'React', 'Angular', 'Veu', 'Public', 'Private', 'Classified', 'General', 'Word File.doc', 'Excel File.doc')
        await checkBoxPage.clickCheckbox('Home');
        await checkBoxPage.checkOutput();
        await checkBoxPage.clickToggle('Home')
        await checkBoxPage.clickToggle('Desktop')
        await checkBoxPage.clickToggle('Documents')
        await checkBoxPage.clickToggle('WorkSpace')
        await checkBoxPage.clickToggle('Office')
        await checkBoxPage.clickToggle('Downloads')

        await checkBoxPage.clickCheckbox('Notes')
        await checkBoxPage.checkOutput('Notes')

        await checkBoxPage.clickCheckbox('Desktop')
        await checkBoxPage.checkOutput('Desktop', 'Notes', 'Commands')

        await checkBoxPage.clickCheckbox("Documents")
        await checkBoxPage.clickCheckbox('Angular')
        await checkBoxPage.checkOutput('Desktop', 'Notes', 'Commands', 'React', 'Veu', 'Office', 'Public', 'Private', 'Classified', 'General')
    })
})