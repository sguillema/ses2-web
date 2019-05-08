const { Given, When, Then } = require('cucumber')
const { Selector } = require('testcafe')

Given(
  'a student with username {string} and password {string} and is registered',
  function(string, string2) {
    return true
  }
)
Given('the student is on the login page', function() {
  // eslint-disable-next-line no-undef
  return 'pending'
})
Given('is not logged in', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})
When('the student enters their {string} AND {string} AND submits', function(
  string,
  string2
) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})
Then('they are logged in and sent to the dashboard', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})
