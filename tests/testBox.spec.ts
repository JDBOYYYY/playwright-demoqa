import { test } from '../pages/pages'
import { allure } from 'allure-playwright'

test.describe('Text Box Page Tests', () => {

  test('Fill form with only Name and Email', async ({ textBoxPage }) => {
    allure.suite('Basic Functionality')
    allure.subSuite('Partial Form Submission')
    allure.description('Verifies form functionality with only Name and Email fields filled.')
    allure.severity('Normal')

    await textBoxPage.visit()
    await textBoxPage.fillForm({
      name: 'John Doe',
      email: 'john@example.com'
    })
    await textBoxPage.submitForm()
    await textBoxPage.checkOutput({
      name: 'John Doe',
      email: 'john@example.com'
    })
  })

  test('Fill form with all fields', async ({ textBoxPage }) => {
    allure.suite('Basic Functionality')
    allure.subSuite('Complete Form Submission')
    allure.description('Ensures form functionality works with all fields filled.')
    allure.severity('Normal')

    await textBoxPage.visit()
    await textBoxPage.fillForm({
      name: 'John Doe',
      email: 'john@example.com',
      currentAddress: '123 Main St',
      permanentAddress: '456 Elm St'
    })
    await textBoxPage.submitForm()
    await textBoxPage.checkOutput({
      name: 'John Doe',
      email: 'john@example.com',
      currentAddress: '123 Main St',
      permanentAddress: '456 Elm St'
    })
  })

  test('Fill form with only Current Address', async ({ textBoxPage }) => {
    allure.suite('Basic Functionality')
    allure.subSuite('Single Field Form Submission')
    allure.description('Checks form behavior when only the Current Address is filled.')
    allure.severity('Normal')

    await textBoxPage.visit()
    await textBoxPage.fillForm({
      currentAddress: '123 Main St'
    })
    await textBoxPage.submitForm()
    await textBoxPage.checkOutput({
      currentAddress: '123 Main St'
    })
  })

  test('Submit empty form', async ({ textBoxPage }) => {
    allure.suite('Edge Cases')
    allure.subSuite('Empty Form Submission')
    allure.description('Tests the behavior of submitting an empty form.')
    allure.severity('Minor')

    await textBoxPage.visit()
    await textBoxPage.fillForm({})
    await textBoxPage.submitForm()
    await textBoxPage.checkOutput({})
  })

  test('Test form with very long input values', async ({ textBoxPage }) => {
    allure.suite('Edge Cases')
    allure.subSuite('Long Input Values')
    // eslint-disable-next-line max-len
    allure.description('Tests form behavior with extremely long input values. Identifies issues with data handling and UI.')
    allure.severity('Critical')

    const longString = 'A'.repeat(10000) // 10,000 characters long
    await textBoxPage.visit()
    await textBoxPage.fillForm({
      name: longString,
      email: `longemail${longString}@example.com`,
      currentAddress: longString,
      permanentAddress: longString
    })
    await textBoxPage.submitForm()
    await textBoxPage.checkOutput({})
  })

  test('Test form with special characters', async ({ textBoxPage }) => {
    allure.suite('Edge Cases')
    allure.subSuite('Special Characters')
    allure.description('Verifies form functionality with special characters in input fields.')
    allure.severity('Normal')

    const specialChars = '!@#$%^&*()_+{}:"<>?[];\',./`~'
    await textBoxPage.visit()
    await textBoxPage.fillForm({
      name: `John Doe ${specialChars}`,
      email: `john${specialChars}@example.com`,
      currentAddress: `123 Main St ${specialChars}`,
      permanentAddress: `456 Elm St ${specialChars}`
    })
    await textBoxPage.submitForm()
    await textBoxPage.checkOutput({})
  })

  test('Test form with SQL injection string', async ({ textBoxPage }) => {
    allure.suite('Security')
    allure.subSuite('SQL Injection')
    allure.description('Checks form resilience against SQL injection attempts.')
    allure.severity('Critical')

    const sqlInjection = '\'; DROP TABLE users; --'
    await textBoxPage.visit()
    await textBoxPage.fillForm({
      name: `John Doe ${sqlInjection}`,
      email: `john${sqlInjection}@example.com`,
      currentAddress: `123 Main St ${sqlInjection}`,
      permanentAddress: `456 Elm St ${sqlInjection}`
    })
    await textBoxPage.submitForm()
    await textBoxPage.checkOutput({})
  })

  test('Test form with HTML/JavaScript code', async ({ textBoxPage }) => {
    allure.suite('Security')
    allure.subSuite('HTML/JavaScript Injection')
    allure.description('Evaluates form security against HTML/JavaScript code injection.')
    allure.severity('Critical')

    const htmlJsCode = '<script>alert(\'XSS\');</script>'
    await textBoxPage.visit()
    await textBoxPage.fillForm({
      name: `John Doe ${htmlJsCode}`,
      email: 'john@example.com',
      currentAddress: `123 Main St ${htmlJsCode}`,
      permanentAddress: '456 Elm St'
    })
    await textBoxPage.submitForm()
    await textBoxPage.checkOutput({})
  })

})
