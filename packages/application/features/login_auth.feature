Feature: Student Login

  Test for successful student login

# Background: student credentials 
# Given a student with username "username" and password "password" and is registered

  @studentHook
Scenario: student logs in with correct credentials 
    Given the student is on the login page
    And is not logged in
    When the student enters "12345678" AND "password" AND submits
    Then they are logged in and sent to the dashboard

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
