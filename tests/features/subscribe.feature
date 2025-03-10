Feature: Automated Test

  Scenario: User subscription and email verification
    Given the user is on the site homepage
    When the user subscribes to the newsletter with a valid email
    Then the user receives a verification email and clicks the link
    And the user's email is successfully verified