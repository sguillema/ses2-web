const { Given, When, Then, Before } = require('cucumber')
const { Selector: NativeSelector, ClientFunction } = require('testcafe')

const Selector = (input, t) => {
  return NativeSelector(input).with({ boundTestRun: t })
}
const getLocation = ClientFunction(() => document.location.href)

Before('@studentHook', async () => {
  console.log('Running student login test')
})

Given('the student is on the login page', async t => {
  await t.navigateTo('http://localhost:3000')
})

Given('is not logged in', async t => {
  await t
    .navigateTo('http://localhost:3000/dashboard')
    .expect(getLocation())
    .contains('http://localhost:3000')
})

When(
  /^the student enters "(.+)" AND "(.+)" AND submits$/,
  async (t, [username, password]) => {
    const usernameField = Selector('#username', t)
    const passwordField = Selector('#password', t)
    const submitBtn = Selector('#submitBtn', t)

    await t
      .click(usernameField)
      .pressKey('ctrl+a delete')
      .typeText(usernameField, username)
      .click(passwordField)
      .pressKey('ctrl+a delete')
      .typeText(passwordField, password)
      .click(submitBtn)
  }
)

Then('they are logged in and sent to the dashboard', async t => {
  await t.expect(getLocation()).contains('http://localhost:3000/dashboard')
})
