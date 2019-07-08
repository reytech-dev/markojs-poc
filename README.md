### README

Please run the following command to install the required node deps

```
$ npm install
```

Start the dev Server

```
$ npm run start:dev
```

Reproduce the error "TypeError: fromEl is undefined"

1. Open the following url: http://localhost:8080
2. Open the DEV tools and switch to console Tab
3. Click on the "Show list" button and the error appears

Get rid of the error

1. Reduce the "optione"-Array in the getSelect() function in app/app.marko to 1 entry
   or
2. Remove the key=index in the for-loop in dropdown/index.marko
