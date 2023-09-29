# Neutrl Shopify GraphQL API

https://shopify-api.neutrl.com

## What is Neutrl Shopify GraphQL API?

This is the underlying backend that supports the Shopify app. This controls interactions with the Shopify API to setup the app on their account, calculate offsets, create/update products and variants that can be purchased via the checkout experience.

## The Stack

### Server

-   Language: Node 15
-   GraphQL
-   TypeORM
-   Postgres 13

## Requirements before starting

-   Make sure you have node and yarn installed on your system
-   Make sure you have docker installed and running on your system (if you need Postgres to run in Docker)
    -   [Installation instructions](https://cloud.google.com/sdk/docs/install#mac)
    -   After installing, run `gcloud auth configure-docker`. This will allow you to pull the private docker containers setup for development.
-   Make sure you have ngrok installed and are on a premium plan. Without this, your API will not be accessible from Shopify. Shopify requires a https connection for all requests.
-   Install and setup your [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

## Development Getting Started

### Install dependencies

    # This assumes that the mono-repo project has been fully cloned locally
    cd server
    yarn install

### Setup DB

If you are using a local version of Postgres, use this setup

    createdb carbon_dev
    yarn run typeorm migration:run

If you need to run Postgres via Docker, use this setup

    # This will start up your local database instance
    yarn run dev:db:start
    yarn run typeorm migration:run

    # This will down your local dev database. This will wipe all of your development data.
    yarn run dev:db:stop

### Setup ENVs

Copy the `.env.example` file into a `.env` file. Make the following changes to it. If you are using the Docker image for Postgres, you'll need to set DATABASE_URL to `postgresql://dev:developer@localhost:5432/carbon_dev`.

    DATABASE_URL=postgres://YOUR_USERNAME@localhost:5432/carbon_dev
    CORS_URL=[Set with ngrok tunnel https URL of the app]
    PORT=4000
    GQL_SECRET=jaWkRYjLGnLPX.2vleMkR9T4AtCybIIIaAQF&AaAtw4i4DYoJPHLCndVh1hp87Qpive2z5XSAWaBevZDUBiME6FO2U3G2EZ5EqigdaAL3aFBo1quRiroqw37DtHV3Q7IoqmzNsfXM8hBwg
    SHOPIFY_API_SECRET=<replace with actual shopify app api secret>
    TEST_MODE=true

## Run it

    yarn run dev

## Run Migrations

If you added new migrations, run them against your db with this command

    yarn run typeorm migration:run

## Revert Migrations

If you need to make changes to your newly added migration, revert the most recently applied one with

    yarn run typeorm migration:revert

## Deploy It

### Initial Setup

In the root of the project (not the server folder), run the following command. This will setup a git remote on Heroku that will then allow you to deploy to production. Heroku is currently setup to target only the `server` folder, so all other folders will be ignored.

    heroku git:remote -r shopify-api-staging -a neutrl-shopify-api-staging

### Deploy to Heroku

Migrations will not need to be ran as part of deploy, they will be automatically applied as part of the release phase. If they fail, the deploy will be halted.

#### Deploy to Staging

    git push shopify-api-staging

#### Diff staging with production

    heroku pipelines:diff -a neutrl-shopify-api-staging

#### Promote staging to production

    heroku pipelines:promote -a neutrl-shopify-api-staging

## Local Database Access (If using docker)

Your local environment comes with a [pgAdmin 4](http://pgadmin.org/) instance out of the box. To connect to this instance, do the following:

1. Go to `http://localhost:5050` in your browser
2. Enter a new master admin password when prompted
3. Close the version warning
4. While on the home dashboard, click the dropdown arrow next to "servers", click on the "carbon_dev" server, and then enter `developer` as the password when it prompts you to enter a password.

## Feature Flags

Some features are locked behind feature flags, this is so we can selectively roll out features and changes to certain users.

Current feature flags in use:

1. `use_patch_estimations` - Use patch for calculations instead of our manual method
