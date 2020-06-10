# Getting Started

```bash
npm install
touch .env
./axiosTypes.sh
npm run dev
```

Server will start on port 3000. Ensure that any environment variables `process.env.X` where X is your variable are added to the .env file you created.

# TODOs

View the [todos.md](misc/todos.md).

#### Variables you will need in `.env`:

* SECRET
* MONGO_URI

# Server
The server build process compiles the TypeScript files found in `/src/server` into a single bundled JavaScript file located in the `/dist` directory.

# Client
The client build process compiles the React app located in `/src/client` into a bundled located at `/public/js/app.js`.