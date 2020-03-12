# crypto-manager

[![Build Status](https://travis-ci.com/harsh-2711/crypto-manager.svg?branch=master)](https://travis-ci.com/harsh-2711/crypto-manager)

## Installation

- Clone the repo: `git clone https://github.com/harsh-2711/crypto-manager.git && cd crypto-manager`

#### For starting backend APIs:

- Go to `api` directory: `cd api`
- Create a virtual environment (optional): `virtualenv venv`
    - If virtual environment package is not installed, first do: `pip install virtualenv`
- Start virtual environment: `source venv/bin/activate`
- Install dependencies: `pip install -r requirements.txt`
- Get your api keys from [Crypto Compare](https://min-api.cryptocompare.com/pricing) and [Nomics](https://p.nomics.com/cryptocurrency-bitcoin-api)
- Create a `.env` file in the `api` folder and paste the api keys: `touch .env && echo CRYPTO_API_KEY=<crypto_key> >> .env && echo NOMICS_API_KEY=<nomics_key> >> .env`

#### Starting the project

- Head over to main project directory
- Install NodeJs from [NodeJs Official Page](https://nodejs.org/en).
- Install node dependencies: `npm install`
- Start frontend: `npm start`
- Start backend: `yarn start-api`
- Navigate to `http://localhost:3000/`
- (optional) Run in terminal `npm i -g cross-env`

### What's included

Following wil be the file structure upon a successful setup:

```
crypto-manager
├── CHANGELOG.md
├── LICENSE.md
├── README.md
├── package.json
├── public
│   ├── apple-icon.png
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── assets
    │   ├── css
    │   │   └── material-dashboard-react.css
    │   └── img
    │       ├── apple-icon.png
    │       ├── bitcoin.png
    │       ├── cover.jpeg
    │       ├── faces
    │       │   └── marc.jpg
    │       ├── favicon.png
    │       ├── mask.png
    │       ├── new_logo.png
    │       ├── reactlogo.png
    │       ├── sidebar-1.jpg
    │       ├── sidebar-2.jpg
    │       ├── sidebar-3.jpg
    │       ├── sidebar-4.jpg
    │       └── tim_80x80.png
    ├── components
    │   ├── Cards
    │   │   ├── ChartCard.jsx
    │   │   ├── ProfileCard.jsx
    │   │   ├── RegularCard.jsx
    │   │   ├── StatsCard.jsx
    │   │   └── TasksCard.jsx
    │   ├── CustomButtons
    │   │   ├── Button.jsx
    │   │   └── IconButton.jsx
    │   ├── CustomInput
    │   │   └── CustomInput.jsx
    │   ├── Footer
    │   │   └── Footer.jsx
    │   ├── Grid
    │   │   └── ItemGrid.jsx
    │   ├── Header
    │   │   ├── Header.jsx
    │   │   └── HeaderLinks.jsx
    │   ├── Sidebar
    │   │   └── Sidebar.jsx
    │   ├── Snackbar
    │   │   ├── Snackbar.jsx
    │   │   └── SnackbarContent.jsx
    │   ├── Table
    │   │   └── Table.jsx
    │   ├── Tasks
    │   │   └── Tasks.jsx
    │   ├── Typography
    │   │   ├── A.jsx
    │   │   ├── Danger.jsx
    │   │   ├── Info.jsx
    │   │   ├── Muted.jsx
    │   │   ├── P.jsx
    │   │   ├── Primary.jsx
    │   │   ├── Quote.jsx
    │   │   ├── Small.jsx
    │   │   ├── Success.jsx
    │   │   └── Warning.jsx
    │   └── index.js
    ├── containers
    │   └── App
    │       └── App.jsx
    ├── index.js
    ├── logo.svg
    ├── routes
    │   ├── app.jsx
    │   └── index.jsx
    ├── variables
    │   ├── styles
    │   ├── charts.jsx
    │   ├── general.jsx
    │   └── styles.jsx
    └── views
        ├── Dashboard
        │   └── Dashboard.jsx
        ├── Icons
        │   └── Icons.jsx
        ├── Maps
        │   └── Maps.jsx
        ├── Notifications
        │   └── Notifications.jsx
        ├── TableList
        │   └── TableList.jsx
        ├── Typography
        │   └── Typography.jsx
        └── UserProfile
            └── UserProfile.jsx
```
