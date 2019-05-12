Feature: User Login

  Test for successful user login

# Background: student credentials 
# Given a student with username "username" and password "password" and is registered

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


# Scenario: user logs in for the first time 
# Given the user is on the login page
# And is not logged in 
# When the user enters their "username" AND "password" AND logs in for the first time
# Then they are brought to the 

# Scenario: user logs in with incorrect credentials 
# Given the user is on the login page
# And is not logged in
# When the user enters their "username" AND "password" AND submits
# Then they are logged in and sent to the dashboard
