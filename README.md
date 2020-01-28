<h1 align="center">A simplified Sprinkler Controle System using Rachio API </h1>

<div align="center">Auto formatted with Prettier, tested with Cypress 🎗</div>

<h3 align="center">
  <a href="https://pgiani.github.io/sprinkler-control/">Visit the live app</a> |
  |
  <a href="https://rachio.readme.io/docs">View RAcio API</a>
</h3>

![App screenshot](https://res.cloudinary.com/pablo-giani/image/upload/v1580254049/Screen_Shot_2020-01-28_at_4.25.28_PM_sq04kj.png)

## What is this and who is it for 🤷‍♀️

This is just a work assignment where I have to:

- Create an application without the use of pre-built solutions such as Create React
- Using Rachio's public API, run all a device's zones or specified zones for a set amount of time

## Features

- Build using WebPack 4, took some time to get all configure correctly
- Use ReactJs Hooks
- Image caching to improve user experience
- Cache API responses to again improve user experience
- Deploy App to GitPages, had to create a different WebPack configuration for the deployment
- Automates scripts for dev, build, test and deploy

## Setting up development environment 🛠

- clone the repo and change directory to ./sprinkler-control
- `npm run install`
- `npm run dev`
- The app should now be running on `http://localhost:8080/`

## Tests 🚥

- change directory to ./sprinkler-control
- `npm run test`

## Build ⛴

- change directory to ./sprinkler-control
- `npm run build`

## Deploy to git pages ⛵

- change directory to ./sprinkler-control
- `npm run deploy`

## What's missing?

Everything pretty much, this was a 4-hour sprint to get some basic API call working

### Migrations 🗄

### Proper authentication system 🔐

We currently there is none

### Accessibility ♿

Not all components have properly defined [aria attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), visual focus indicators, etc. Most early-stage companies tend to ignore this aspect of their product but in many cases, they shouldn't, especially once their userbase starts growing.

### Unit/Integration tests 🧪

Very little to no testing has been done due to the very limited time allowed to this implementation. However, as the app grows in complexity, it might be wise to start writing additional unit/integration tests.

### Author: Pablo H Giani ✍️

### License

[GPL2](https://github.com/pgiani/sprinkler-control/blob/master/LICENSE)
