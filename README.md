# About

This is an adaptation of a physical board game that can be played with others through the browser. This project was built using the MERN stack, in TypeScript, and deployed on Heroku.

# Game Info & Rules

View [game.md](game.md).

# Getting Started

```bash
git clone https://github.com/chrismarcok/boardgame.git
cd boardgame
npm install
touch .env
./axiosTypes.sh
npm run dev
```

Server will start on port 3000. Ensure that any environment variables `process.env.X` where X is your variable are added to the .env file you created.

# TODOs

View [GitHub Projects](https://github.com/chrismarcok/boardgame/projects).

# `.env`:

```bash
SECRET=???
MONGO_URI=???
BASE_URL=http://localhost:3000
EMAIL_PASSWORD=???
ADMIN_KEY=???
```

# Server
The server build process compiles the TypeScript files found in `/src/server` into a single bundled JavaScript file located in the `/dist` directory.

# Client
The client build process compiles the React app located in `/src/client` into a bundled located at `/public/js/app.js`.