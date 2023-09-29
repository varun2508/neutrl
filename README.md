# Full local development setup

## The Stack

### Server

-   NodeJS 15
-   Postgres 13

## Fetch the repo

    # Clone and setup repo
    git clone git@github.com:Carbon-Neutrl/shopify-app.git neutrl
    cd neutrl

## Setup the repo locally

The local development setup consists of a few moving parts:

1. Starting the frontend server
2. Starting the backend server
3. Updating allowed URLs for your development Shopify App in the Shopify Partners admin area

Unfortunately, Shopify App development requires quite a lengthy setup process to get things going. Once you get through this initial setup, ongoing development is a lot easier.

## Starting the frontend server

1. In a new terminal window, navigate to the `app` directory of this repo
2. Run `yarn install` to install all deps
3. In a new terminal window, run `ngrok http 8081` and make note of the `https` ngrok URL. It will look something like `https://<id>.ngrok.io` where `<id>` is a randomly generated string for your instance. You're going to need to update some environment variables.
4. In the `app` directory, copy the `.env.example` file and rename it to `.env`
5. With the url from step 3, paste it in for the following environment variables in the `app/.env` file:
    1. HOST
    2. SHOPIFY_AUTH_CALLBACK_URL - will need `/api/auth/callback` appened to the end of the URL.
6. Once this is done, log into the Shopify Partners area and go to "Apps"
7. Once in "Apps" either create a new, separate app to use for development OR use your existing development app that you've already created
8. Copy the "Api Key" and update the following environment variables in the `app/.env` file:
    1. SHOPIFY_API_KEY
    2. SHOPIFY_API_PUBLIC_KEY
9. Copy the "Api secret" and update the following environment variables in the `app/.env` file:
    1. SHOPIFY_API_SECRET
10. Add the following other environment variables in the `app/.env` file
    1. TEST_MODE=true
    2. GQL_SECRET=<random string>
    3. HOME_PATH=/home
    4. SHOPIFY_AUTH_SCOPES=read_orders,read_products,write_products,read_script_tags,write_script_tags
11. In the Shopify Partners admin area, go to your development app, and then click "app setup"
12. Set the "App url" to the url from step 3
13. Add the following URLs to the "Allowed redirection URL(s)" section
    1. https://<id>.ngrok.io/api/auth - where <id> is the first part of the URL from step 3
    2. https://<id>.ngrok.io/api/auth/callback - where <id> is the first part of the URL from step 3
14. In a new terminal window, run `yarn run dev` to start the frontend development server on `http://localhost:8081`

## Starting the backend server

1. In a new terminal window, navigate to the `server` directory of this repo
2. Run `yarn install` to install all the deps
3. In a new terminal window, run `ngrok http 4000` and make note of the `https` ngrok URL. It will look something like `https://<id>.ngrok.io` where `<id>` is a randomly generated string for your instance. You're going to need to update some environment variables.
4. Open the `app/.env` file and set the following environment variables:
    1. API_URL=https://<id>.ngrok.io/api/v1/graphql - where <id> is the ID from the URL in step 3
5. In the `server` directory, copy the `.env.example` file and rename it to `.env`
6. Set the environement variables in the file `server/.env` to the following:
    1. DATABASE_URL=postgres://dev:developer@localhost:5432/carbon_dev`
    2. CORS_URL=https://<id>.ngrok.io - where <id> is the ID from the URL used for the frontend server
    3. PORT=4000
    4. SHOPIFY_API_SECRET=<secret> - where <secret> is the same as step 13 in the frontend setup
    5. TEST_MODE=true
    6. GQL_SECRET=<random string> - make sure this is the same random string as what's used in step 14.3 in the frontend setup
    7. MIN_OFFSET_WEIGHT=35.5
7. Run `yarn run build` to get an initial build going
8. Run `yarn run dev:db:start` - This will start up your local database instance
9. If the database hasn't been created yet, run `createdb carbon_dev`, otherwise this step can be skipped
10. Run `yarn run typeorm migration:run` to run the initial database migration to setup the initial database structure
11. Run `yarn run dev` to start the dev API server
12. When you're done deving, run `yarn run dev:db:stop` to shut down your local dev database. This will wipe all of your development data.

## Installing and working on the development app

Since this app is embedded into the Shopify Admin, this means you have to actually install and access the app from a Shopify Store. To do so, you need to do the following:

1. Open up the Shopify Partners Admin area
2. Go to "Apps" and then click on your development app
3. Click "More actions" and then click "Test on development store"
4. Select which store you want to test on and this will redirect you to the installation screen
5. After installing, you'll be in the app!
