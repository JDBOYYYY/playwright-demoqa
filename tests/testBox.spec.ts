import { test } from '../pages/pages'

test('Fill form with only Name and Email', async ({ textBoxPage }) => {
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
  await textBoxPage.visit()
  await textBoxPage.fillForm({})
  await textBoxPage.submitForm()
})
test('Test form with very long input values', async ({ textBoxPage }) => {
  const longString = 'A'.repeat(10000) // 10,000 characters long
  await textBoxPage.visit()
  await textBoxPage.fillForm({
    name: longString,
    email: `longemail${longString}@example.com`,
    currentAddress: longString,
    permanentAddress: longString
  })
  await textBoxPage.submitForm()
})
test('Test form with special characters', async ({ textBoxPage }) => {
  const specialChars = '!@#$%^&*()_+{}:"<>?[];\',./`~'
  await textBoxPage.visit()
  await textBoxPage.fillForm({
    name: `John Doe ${specialChars}`,
    email: `john${specialChars}@example.com`,
    currentAddress: `123 Main St ${specialChars}`,
    permanentAddress: `456 Elm St ${specialChars}`
  })
  await textBoxPage.submitForm()
})
test('Test form with SQL injection string', async ({ textBoxPage }) => {
  const sqlInjection = '\'; DROP TABLE users; --'
  await textBoxPage.visit()
  await textBoxPage.fillForm({
    name: `John Doe ${sqlInjection}`,
    email: `john${sqlInjection}@example.com`,
    currentAddress: `123 Main St ${sqlInjection}`,
    permanentAddress: `456 Elm St ${sqlInjection}`
  })
  await textBoxPage.submitForm()
})
test('Test form with HTML/JavaScript code', async ({ textBoxPage }) => {
  const htmlJsCode = '<script>alert(\'XSS\');</script>'
  await textBoxPage.visit()
  await textBoxPage.fillForm({
    name: `John Doe ${htmlJsCode}`,
    email: 'john@example.com',
    currentAddress: `123 Main St ${htmlJsCode}`,
    permanentAddress: '456 Elm St'
  })
  await textBoxPage.submitForm()
})


