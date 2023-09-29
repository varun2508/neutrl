# Neutrl Shopify App

https://shopify.neutrl.com

## What is Neutrl Shopify App?

This is the front-end application that Shopify interacts with when users install or manage the app from within Shopify. It also proxies webhooks to the GraphQL API from Shopify to save things like orders for our customers.

This project is written in [Next.js](https://nextjs.org/)

## The Stack

### Server
- Language: Node 15
- NextJS

## Development Getting Started

### Install dependencies

    # This assumes that the mono-repo project has been fully cloned locally
    cd app
    yarn install

### Setup ENVs

Copy the `.env.example` file into a `.env` file. The full list of ENV setups for this app is in the main README for now.

## Run it

    yarn run dev

## Deploy It

### Initial Setup

In the root of the project (not the app folder), run the following command. This will setup a git remote on Heroku that will then allow you to deploy to production. Heroku is currently setup to target only the `app` folder, so all other folders will be ignored. 

    heroku git:remote -r shopify-app-staging -a neutrl-shopify-app-staging

### Deploy to Heroku

#### Deploy to Staging

    git push shopify-app-staging

#### Diff staging with production

    heroku pipelines:diff -a neutrl-shopify-app-staging

#### Promote staging to production

    heroku pipelines:promote -a neutrl-shopify-app-staging

