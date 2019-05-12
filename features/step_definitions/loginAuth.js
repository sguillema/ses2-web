const { Given, When, Then, Before } = require('cucumber')
const { Selector: NativeSelector, ClientFunction } = require('testcafe')

const Selector = (input, t) => {
  return NativeSelector(input).with({ boundTestRun: t })
}
const DOMAIN = 'http://localhost:3000'
const STUDENT_DASHBOARD = `${DOMAIN}/student/dashboard`
const ADMIN_DASHBOARD = `${DOMAIN}/admin/dashboard`
const getLocation = ClientFunction(() => document.location.href)

Before('@userHook', async () => {
  console.log('Running user login test')
})
//test to see if the user is student or admin
function testIdentity(username, password) {
  if (username == '12345678' && password == 'password') {
    return 'student'
  } else if (username == '11230099' && password == 'password') {
    return 'admin'
  }
}
//navigate to index
Given('the user is on the login page', async t => {
  await t.navigateTo(DOMAIN)
})
//clear cookies
Given('is not logged in', async t => {
  ClientFunction(() =>
    document.cookie.split(';').forEach(function(c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })
  )
})
//test for username and password
When(
  /^the user enters "(.+)" AND "(.+)" AND submits$/,
  async (t, [username, password]) => {
    const usernameField = Selector('#username', t)
    const passwordField = Selector('#password', t)
    const submitBtn = Selector('#submitBtn', t)

    this.user = testIdentity(username, password)
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
//test for admin or student dashboard
Then('they are logged in and sent to the dashboard', async t => {
  if (this.user == 'student') {
    await t.expect(getLocation()).contains(STUDENT_DASHBOARD)
  } else if (this.user == 'admin') {
    await t.expect(getLocation()).contains(ADMIN_DASHBOARD)
  }
})