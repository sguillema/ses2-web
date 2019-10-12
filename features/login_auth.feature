Feature: Functionality test

  Test for successful functionality

  @userHook
Scenario Outline: user logs in with correct credentials 
    Given the user is on the login page
    And is not logged in
    When the user enters "<username>" AND "<password>" AND submits
    Then they are logged in and sent to the dashboard

Examples:
| username | password |
| 12345678 | password |
| 11230099 | password |


@createHook
Scenario: Admin creates skillset, programs and workshops
    Given the user is on the admin skillset page
    And the user creates a skillset with test data and click submit
    And the user creates a program with the created program 
    When the user creates a workshop 
    Then the created workshop should contain the inherited details from previously created program and skillset