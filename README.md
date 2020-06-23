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
- Start backend: `yarn start-api` or `npm run start-api`
- Navigate to `http://localhost:3000/`
- (optional) Run in terminal `npm i -g cross-env`

## Tests

#### Frontend tests

For testing react components and functions,

- Head over to root directory
- Write `npm test` in terminal

For adding new frontend tests, go to `__tests__` folder in `src` directory. Please follow the below convention to add new test files -

- For adding component tests - `<component_name>.test.js`
- For adding functional tests - `<package_name>_<function_name>.test.js`
- For adding unit tests - `<package_name>_unit.test.js`

#### Backend tests

For testing flask server and API endpoints,

- Head over to root directory OR into `api` folder
- Write `pytest` in terminal

For adding new backend tests, go to `tests` folder in `api` directory. Please follow the below convention to add new test files -

- For adding functional tests - `test_functional_<function_name>.py`
- For adding unit tests - `test_unit.py`

### Architecture

![Architecture](https://github.com/harsh-2711/crypto-manager/blob/master/deployment-diagram/architecture.jpeg)