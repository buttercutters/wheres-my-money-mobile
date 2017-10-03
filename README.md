## Where's My Money

Where's My Money is an iOS app that allows you to visualize your spending on your Google Calendar.

## Tech Stack

Where's My Money is split up into client and server repos. Link to server repo: https://github.com/buttercutters/wheres-my-money-server

The client is built using react native and redux. The backend is powered by Google Cloud Platform's Cloud Functions for serverless computing and Firbase Realtime Database. Third party APIs used are the Plaid API and Google Calendar API.

Plaid allows secure fetching of financial transactions, which we then visualize on Google Calendar by integrating with the Calendar API.

## Usage

Link to video demo: https://goo.gl/h5V1dH

1. Sign in with your Google Account.
2. Link your bank account to provide access to transaction data.

![Alt text](/screenshots/Plaid.png?raw=true "Link Bank")

3. Your Google Calendar is automatically populated with your spending by day.






