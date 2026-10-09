# TrickFire Robotics Website

Welcome to the TrickFire Robotics' website! This is a React application.

## Running the App in Development Mode

To start the development server:

```bash
npm install
npm start
```

This will:

- Install all dependencies.
- Run the app in development mode at [http://localhost:3000](http://localhost:3000).

The page will reload automatically when you make changes. Lint errors will appear in the console.

## Project File Structure

```
TrickfireRobotics.github.io/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── README.md
└── ...
```

- `public/`: Static files and the main HTML template.
- `src/`: React components and application logic.
- `components/`: Reused components across the project.
- `pages/`: React page components. Each is given their own folder with the JS and SCSS file respectively.
- `app.js`: Routes with each of the pages corresponding to url routes.
- `package.json`: Project metadata and dependencies.
- `README.md`: Project documentation.

Maintained by [Aaron Quashnock](https://github.com/Quashnock). Open an issue or pull request if you'd like to contribute.