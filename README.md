# Cafenaut

## Setup

Run `npm i --legacy-peer-deps` to install all dependencies of the monorepo.

Populate Firebase required files:
1. For frontend, create a `apps\frontend\.env` file and enter the required fields:
    ```
   VITE_API_KEY=
   VITE_AUTH_DOMAIN=
   VITE_PROJECT_ID=
   VITE_STORAGE_BUCKET=
   VITE_MESSAGING_SENDER_ID=
   VITE_APP_ID=
   VITE_MEASUREMENT_ID=
   ```
2. For backend, create and download a service account `apps\backend\src\auth\firebaseServiceAccount.json`.

## Development frontend client

Run `npx nx serve frontend` for a dev server. Navigate to http://localhost:3333/. The app will automatically reload if you change any of the source files.

## Development backend server

Run `npx nx serve backend` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.
