# Getting Started

```bash
npm install
touch .env
npm run dev
```

Server will start on port 3000. Ensure that any environment variables `process.env.X` where X is your variable are added to the .env file you created.

# Server
The server build process compiles the TypeScript files found in `/src/server` into a single bundled JavaScript file located in the `/dist` directory.

# Client
The client build process compiles the React app located in `/src/client` into a bundled located at `/public/js/app.js`.

The client configuration will also build the Sass files found at `/src/client/scss`. The App component imports the `app.scss` file.