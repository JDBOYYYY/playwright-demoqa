import { test } from '../pages/pages';
import { allure } from 'allure-playwright';
test.describe('Radio Page Tests', () => {

    test.beforeEach(async ({ radioPage }) => {
        await radioPage.visit();
        await radioPage.consentCookies()
    })

    test('Check radio buttons', async ({ radioPage }) => {
        allure.suite('Radio Page');
        allure.subSuite('Check radio buttons');
        allure.description('Verifies if radio buttons are working as intended');
        allure.severity('Normal');

        await radioPage.checkYesRadio()
        await radioPage.checkIfCheckedYes()
        //TODO finish this test
    })
})