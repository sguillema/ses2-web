const { Selector, ClientFunction } = require('testcafe')

// fixture `First Test`

test('First test - Visit Website', async function(t) {
  const usernameField = Selector('#username')
  const passwordField = Selector('#password')
  const submitBtn = Selector('#submitBtn')
  const getLocation = ClientFunction(() => document.location.href)

  //prettier-ignore
  await t
  .navigateTo('http://localhost:3000')
  .click(usernameField)
  .pressKey('ctrl+a delete')
  .typeText(usernameField, '12345678')
  .click(passwordField)
  .pressKey('ctrl+a delete')
  .typeText(passwordField, 'password')
  .click(submitBtn)
  .expect(getLocation()).contains('http://localhost:3000/dashboard')
})
