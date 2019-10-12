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

Before('@createHook', async () => {
  console.log('Running admin create test')
})
Given('the user is on the admin skillset page', async t => {
  const submitBtn = Selector('#submitBtn', t)

  await t.navigateTo(DOMAIN).click(submitBtn)
})
When('the user creates a skillset with test data and click submit', async t => {
  const skillSetsButton = Selector(
    '#content-sidebar > aside > div.v-list.list.v-list--dense.theme--light > div:nth-child(1) > div:nth-child(5) > a > div.v-list__tile__content > div',
    t
  )
  const createSkillsetButton = Selector(
    '#page-skillset > section > div > div:nth-child(2) > nav > div > button > div',
    t
  )
  const skillTittle = Selector(
    '#admin-layout > div.v-dialog__content.v-dialog__content--active > div > div > form > div > div:nth-child(1) > div > div.v-input__slot > div',
    t
  )
  const skillSubTitle = Selector(
    '#admin-layout > div.v-dialog__content.v-dialog__content--active > div > div > form > div > div:nth-child(2) > div > div.v-input__slot > div',
    t
  )
  const skillSubmitButton = Selector(
    '#admin-layout > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > form > div > button > div',
    t
  )

  await t
    .click(skillSetsButton)
    .click(createSkillsetButton)
    .typeText(skillTittle, 'this is a test title')
    .typeText(skillSubTitle, 'this is a test sub title')
    .click(skillSubmitButton)
})

When('the user creates a program with the created program', async t => {
  const programButton = Selector(
    '#content-sidebar > aside > div.v-list.list.v-list--dense.theme--light > div:nth-child(1) > div:nth-child(4) > a > div.v-list__tile__content > div',
    t
  )
  const createProgramBtn = Selector(
    '#page-programs > section > div > div > nav > div > button > div',
    t
  )
  const programTitle = Selector(
    '#admin-layout > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > form > div:nth-child(1) > div:nth-child(1) > div > div.v-input__slot > div',
    t
  )
  const skillsetField = Selector(
    '#admin-layout > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > form > div:nth-child(1) > div:nth-child(2) > div > div.v-input__slot > div.v-select__slot',
    t
  )
  const skillsetItem = Selector(
    '#admin-layout > div.v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active > div > div > div:nth-child(4)',
    t
  )
  const targetGroup = Selector(
    '#admin-layout > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > form > div:nth-child(1) > div:nth-child(3) > div > div.v-input__slot > div.v-select__slot',
    t
  )
  const targetGroupItem = Selector(
    '#admin-layout > div.v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active > div > div > div:nth-child(1) > a > div',
    t
  )
  const description = Selector('#programDescription', t)
  const createButton = Selector(
    '#admin-layout > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > form > div.step-buttons > button > div',
    t
  )
  await t
    .click(programButton)
    .click(createProgramBtn)
    .typeText(programTitle, 'test program title')
    .click(skillsetField)
    .click(skillsetItem)
    .click(targetGroup)
    .click(targetGroupItem)
    .typeText(description, 'this is a sample text')
    .click(createButton)
})

When('the user creates a workshop', async t => {
  const workshopBtn = Selector(
    '#content-sidebar > aside > div.v-list.list.v-list--dense.theme--light > div:nth-child(1) > div:nth-child(3) > a > div.v-list__tile__content > div',
    t
  )
  const createWorkshopBtn = Selector(
    '#page-workshops > section > div > div > nav > div > button > div',
    t
  )
  const workshopTitle = Selector('#workshopTitle', t)

  const workshopDescription = Selector('#workshopDescription', t)
  const createBtn = Selector(
    '#admin-layout > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text.form > form > div.step-buttons > button > div',
    t
  )

  await t
    .click(workshopBtn)
    .click(createWorkshopBtn)
    .typeText(workshopTitle, 'test workshop title')
    .pressKey('tab down enter')
    .pressKey('tab down enter')
    .typeText(workshopDescription, 'this is test workshop description')
    .click(createBtn)
})

Then(
  'the created workshop should contain the inherited details from previously created program and skillset',
  async t => {
    await t
      .expect(getLocation())
      .contains('http://localhost:3000/admin/workshops')
  }
)
