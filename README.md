#  Frontend Code Challenge

## Setup

Install the project dependencies:

`npm install`

## Running

Update config.json with your Twitter API credentials.
Start the static and proxy servers:

`npm start`


This server will help you to get Twitter's API to send you tweets without you needing to do any authentication.  You don't need to modify server.js at all. 


**
Part II: Minimum Requirements

Use the Twitter API to display three columns containing the last 30 tweets from @MakeSchool, @newsycombinator and @ycombinator. Each tweet should include:

● The tweet content
● A well-formatted created_at date
● A link to the tweet
● For retweets and mentions, the username should be included.

Part III: Additional Requirements

1. Make an ”edit layout” view that has a form to change the layout settings.
2. Use LocalStorage to persist and load the layout settings.
3. Configurable settings could include (you decide; you can pick your own):
a. The order of the columns.
b. The time range of the tweets shown.
c. The number of tweets shown in each column.
d. The overall palette/skin of the page.
4. The”edit layout” panel can appear either on the same page as the tweets page, on its own page, or embedded within the tweets layout - whichever you would like. There should be a straightforward way to toggle between edit and view modes, and it should be clear to the user which mode they are currently in.

Part IV: Additional Challenges / Bonuses / Suggestions

At this point, you have fulfilled all the basic and additional requirements. If you feel inspired, here are more things you can do:

● Ensure a good responsive experience on mobile phones and tablets
● Use an interaction (like drag and drop) instead of a form field to order the columns
● Add another feature you feel is missing from our application
● Adding unit tests will be great


