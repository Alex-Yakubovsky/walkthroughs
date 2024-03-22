## Introduction

This code sample demonstrates how to implement user uploads using presigned URLs with Cloudflare's R2 or any S3 compatible storage service. The example uses React, Node.js (express), and TypeScript. For a step-by-step walkthrough, visit [Implementing User Uploads with Presigned URLs](https://annotate.dev/p/hello-world/implementing-user-uploads-with-presigned-urls-RcaRFbkDyop8pl).

## Installation and setup

Ensure you have Node.js installed (version 20 or higher).

### Setting up the R2 bucket

Follow the instructions in the [detailed walkthrough](https://annotate.dev/p/hello-world/implementing-user-uploads-with-presigned-urls-RcaRFbkDyop8pl) to set up an R2 bucket. Then, configure your environment variables:

1. Run `mv server/.template.env server/.env` to rename the template environment file.
2. Use a text editor to update the variables in `server/.env` with your Cloudflare account details.

### Starting the backend server

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Start the server:

```bash
npm run start
```

### Starting the React frontend

Open a new terminal window or tab.

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

```bash
npm run start
```

After starting both the backend and frontend, access the web app at http://localhost:5173.
