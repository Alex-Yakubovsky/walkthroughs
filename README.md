A simple OAuth client built using Typescript and Express. Checkout [the code walkthrough](https://annotate.dev/p/hello-world/learn-oauth-2-0-by-building-your-own-oauth-client-U2HaZNtvQojn4F).

## Install

Requires node version >= 20. run `npm install`

You'll also need to get OAuth credentials from Google (see the walkthrough above). Create a `.env` file at the root of the project (at the same level as the `package.json` file) and add the following:

```
CLIENT_ID=<client id obtained from>
CLIENT_SECRET=<secret obtained from google>
```

## Run

In your CLI run `npm run start`. Then, in your browser open http://localhost:3000
