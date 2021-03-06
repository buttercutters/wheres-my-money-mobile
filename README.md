## Where's My Money

Where's My Money is an iOS app that allows you to visualize your spending on your Google Calendar.

## Tech Stack

Where's My Money is split up into client and server repos. Link to server repo: https://github.com/buttercutters/wheres-my-money-server

The client is built using react native and redux. The backend is powered by Google Cloud Platform's Cloud Functions for serverless computing and Firbase Realtime Database. Third party APIs used are the Plaid API and Google Calendar API.

Plaid allows secure fetching of financial transactions, which we then visualize on Google Calendar by integrating with the Calendar API.

## Usage

Link to video demo: https://goo.gl/h5V1dH

1. Sign in with your Google Account.

<img src="screenshots/signIn.png" width="250">

2. Link your bank account to provide access to transaction data.

<img src="screenshots/linkBank.png" width="250">

3. Your Google Calendar is automatically populated with your spending by day.

<img src="screenshots/calendarMonthView.png" width="600">

4. Click on an event to view spending details for that day.

<img src="screenshots/calendarEventDescription.png" width="300">

5. Use the settings tab to link additional bank accounts, or remove linked accounts.

<img src="screenshots/settingsView.png" width="250">






