# slackers

### Parsity Cohort 3 FT Agile Project

### Organization
Root directory only has 2 folders: frontend & backend. The Git repo is setup at the root, but each folder has it's own npm init. In order for things to work cleanly, *don't open VS Code from the root folder*, cd into each frontend/backend folder and open your workspace from there. You can still control Git from within, but it'll let NPM and ESLint do their thing.

### ESLint
I’ve already set this up in each folder. All you need to do is make sure you have the ESLint and Prettier extensions installed and then add the settings below to your global settings.json. Try to use this config at first. If you have issues, let me know. I’ve gotten pretty good with it, and I think it makes things way easier. If you hate it, go into the ‘.eslintrc’ file and comment out the ‘extends’ line.

`"editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.alwaysShowStatus": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "[javascript]": {
    "editor.formatOnSave": false,
    "editor.defaultFormatter": null
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false,
    "editor.defaultFormatter": null
  },`

### Frontend
I’ve started us out with a create-react-app. I’ve left it as is and created a components folder. I’d for us to name any file that has JSX (HTML imbedded into Javascript, like a component) to .jsx. So ‘Searchbar.jsx’, React doesn’t care either way, but from what I understand, this is best practice. You’ll notice that VS Code gives it a new icon, so it helps to see which files have JSX, and which are vanilla JS files.

### Backend
I got us going with the Mocha test script. Note that Mocha and Chai are listed as dev-dependencies so that they won’t get bundled into the production build on Heroku. Nodemon is set up for ‘index.js’; we can call it ‘server.js,’ but we’ll need to change the script.
