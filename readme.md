# ejnshtein bot template

## Technology stack

- [Grammy](https://grammy.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)


## Features

- Hot-reload using [Nodemon](https://github.com/remy/nodemon).
- Debugging using VSCode. (Press F5 to connect debugger and have fun!)
- Code linting with ESLint. (Enabled rules from [Standard](https://standardjs.com/), [Typescript-ESLint](https://github.com/typescript-eslint/typescript-eslint), [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) itself)
- Code formatting with [Prettier](https://prettier.io/).
- Format-on-save enabled by default. (Formats ESLint)
- Aliases OOTB with Typescript and [module-alias](https://www.npmjs.com/package/module-alias).

## Usage

I recommend setting up [aliasrc](https://github.com/ejnshtein/aliasrc) in your terminal to use project-wide aliases defined in [aliasrc](./.aliasrc).

### Commands

#### Bootstrap the project

```bash
up
```

This will run Docker Compose with configuration from `docker-compose.yml` and `docker-composer.core.yml`.

`docker-compose.yml` contains general or "base" compose configuration, `docker-compose.core.yml` contains development configuration, additional volume links, port forwarding for debugger, development environmental variables and replacing production command with command that will execute nodemon with its configuration to run app with hot-reload and debugger.

#### Stop the project

```bash
down
```

This will shut down the project.

#### Restart the project

```bash
restart
```

This will restart the project.

#### See logs

```bash
logs
```

This will connect you to application logs.


#### Go inside container

```bash
inapp
```

#### Connect to the process with VSCode debugger

Just open VSCode and press F5.

#### Deploy in production

On production server you will likely won't have aliasrc, so use the following command:

```bash
docker-compose -f docker-compose.yml up --build --force-recreate -d
```

This will build new image, restart the project and run in detached mode.


### CI/CD

Simple CI/CD can be setup using Github Actions.

The following example will use SSH connection in worker to connect to your server and run some deploy commands.

Create `./.github/workflows/deploy.yml` and put the following content inside it.

```yml
name: Deploy

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v2.3.2
    - name: executing remote ssh commands using ssh key
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        port: ${{ secrets.PORT }}
        passphrase: ${{ secrets.PASSPHRASE }}
        script: |
          cd bots/template-bot
          git pull
          sudo docker-compose -f docker-compose.yml up --build --force-recreate -d

```