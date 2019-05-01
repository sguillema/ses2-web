Feature: check login
See if student logs in

Background: student credentials 
Given a student with username "username" and password "password" and is registered

# Scenario: user logs in with incorrect credentials 
# Given the user is on the login page
# And is not logged in
# When the user enters their "username" AND "password" AND submits
# Then they are logged in and sent to the dashboard

Scenario: student logs in with correct credentials 
Given the student is on the login page
And is not logged in
When the student enters their "username" AND "password" AND submits
Then they are logged in and sent to the dashboard

# Scenario: user logs in for the first time 
# Given the user is on the login page
# And is not logged in 
# When the user enters their "username" AND "password" AND logs in for the first time
# Then they are brought to the 