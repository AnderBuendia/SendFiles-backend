# SendFiles

## Using this repository

Before use this repository, you need to install [Docker](https://www.docker.com/get-started), [Docker Compose](https://docs.docker.com/compose/install/) and [NodeJS](https://nodejs.org/en/download/) with `npm`. They are multiplatform (Windows, MacOS and Linux).

## Backend

You need to clone the following repository:

```
https://github.com/AnderBuendia/sendfiles-backend.git
```
Then go to the directory and modify the .env.example file and define the values:

```
cd sendfiles-backend
mv .env.example .env
```

Inside `sendfiles-backend`, go to `src/db/db.js` and uncomment the following line:

```
dbName: process.env.DB_NAME,
```

Run docker-compose to build and initialize the server:

```
docker-compose up [-d]
```

Go to the web browser and test this at [http://localhost:$PORT](http://localhost:$PORT) and Hello World! must be appears.

## Frontend

Clone the following repository:

```
https://github.com/AnderBuendia/sendfiles.git
```

Then go to the directory and modify the .env.example file and define the values:

```
cd sendfiles-backend
mv .env.example .env
```

Run the following commands and go to the web browser to test this at [http://localhost:$PORT](http://localhost:$PORT):

```
npm install

npm run dev
```


Notes
----

To access website: https://sendfiles.anderb.me