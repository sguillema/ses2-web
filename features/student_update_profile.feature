Feature: Student Updates Profile

    Test if student can update personal profile
    
@profileHook
Scenario: Student updates personal profile
Given I am a student with username "12345678" and password "password" and logs into my account 
When I go to my personal information page
And change my preferred name to "Obi Wang"
And change my student name to "Test Tester"
And change my email to "wang@test.com"
And preferred contact number to "000"
And home contact number to "123"
And mobile contact number to "0410313513"
And change my gender to female
# And change my birthday (this feature currently does not work)
And change country of origin to "American Samoa"
And change my language to "Arabic"
And change my degree to Postgraduate
And change my course number to "1234567"
And change my faculty to "Engingeering"
# And change my year of study to "4"  (this feature currently does not work)
And change my status to international 
And add my educational background with an "IELTS" of "99"
And I click submit 
Then my information should be updated 