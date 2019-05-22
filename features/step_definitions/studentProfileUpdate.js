const { Given, When, Then, Before } = require('cucumber')
const { Selector: NativeSelector } = require('testcafe')

const Selector = (input, t) => {
  return NativeSelector(input).with({ boundTestRun: t })
}
const DOMAIN = 'http://localhost:3000'

Before('@ProfileHook', async () => {
  console.log('Running student profile update test')
})

Given(
  /^I am a student with username "(.+)" and password "(.+)" and logs into my account$/,
  async (t, [username, password]) => {
    const usernameField = Selector('#username', t)
    const passwordField = Selector('#password', t)
    const submitBtn = Selector('#submitBtn', t)
    const check = Selector('.v-input__slot')

    await t
      .navigateTo(DOMAIN)
      .click(usernameField)
      .pressKey('ctrl+a delete')
      .typeText(usernameField, username)
      .click(passwordField)
      .pressKey('ctrl+a delete')
      .typeText(passwordField, password)
      .click(check)
      .click(submitBtn)
  }
)

// When('I go to my personal information page'),
//   async t => {
//     const profileBtn = Selector('#profileBtn', t)
//     const myInfoBtn = Selector('#div:nth-child(2)', t)

//     await t.click(profileBtn).click(myInfoBtn)
//   }

// Then('I go to my personal information page'),
//   async t => {
//     const profileBtn = Selector('#profileBtn', t)
//     const myInfoBtn = Selector('#div:nth-child(2)', t)

//     await t.click(profileBtn).click(myInfoBtn)
//   }
