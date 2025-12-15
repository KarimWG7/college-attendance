# Deploying to Railway with Persistent SQLite

This guide explains how to deploy your backend to Railway and ensure your SQLite database survives restarts and deployments.

## 1. Prerequisites

- A [Railway](https://railway.app/) account.
- CLI installed (optional) or GitHub repository connected.

## 2. Environment Variables

In your Railway project settings, add the following variables:

- `PORT`: `8000` (Railway usually sets this automatically, but good to be explicit).
- `DATABASE_STORAGE`: `/app/data/database.sqlite` (This is where we will mount the volume).

## 3. Add a Volume

Railway supports persistent volumes.

1.  Go to your service in Railway.
2.  Click on the **Volumes** tab.
3.  Click **Add Volume**.
4.  Mount Path: `/app/data` (This MUST match the directory in your `DATABASE_STORAGE` variable).

## 4. Deploy

Push your code or trigger a deployment. Railway will:

1.  Build the Docker image using the `Dockerfile`.
2.  Mount the persistent volume at `/app/data`.
3.  Start the app with `npm start`.

## 5. First Time Setup

The application will automatically create the empty SQLite database at `/app/data/database.sqlite` if it doesn't exist.

> [!IMPORTANT]
> Because we use `npm start`, the app runs in production mode. `nodemon` is not used.
