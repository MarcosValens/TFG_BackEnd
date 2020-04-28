# Port Scanner Backend

### Brief description
This is the backend service for our Port Scanner application, it will perform CRUD operations on a MongoDB.

***

### Pre-requisites
To run this repository locally you will need docker, which you can get here: [Click me](https://docs.docker.com/get-docker/, "Docker download site").

***

### Setup
In the project there is a file called **.env.sample** which contains all the enviroment variables required for the server to run and work properly. You must create a file called **.env** with these environment variables filled up.


>This variable can be skipped, since it will default to port 8000
* PORT

>This makes reference to CORS allowed hosts.
>If there is more than one, input them separated by commas

* WHITELIST

>This is the JWT signing secret. We strongly recommend to do the following on the node.js command line to generate a secret
```javascript
require('crypto').randomBytes(48, function(err, buffer) { 
    console.log(buffer.toString("hex")); 
})
```
* SECRET
>The next two variables make reference to MongoDB credentials
* MONGO_USER
* MOGO_PASSWORD

>This variable is not required since it defaults to 10 rounds.
>This variable specifies the rounds to create a salt for the encrypted password.

* SALT_ROUNDS

>The next two variables are required in order to use google's Oauth2 authentication.
>You can get them here: [Google console](https://console.cloud.google.com/, "Google developer console") by registering a new project (or adding oauth authentication to any existing project of yours).

* GOOGLE_CLIENT_ID
* GOOGLE_CLIENT_SECRET

>These two variables should only have the values "development" or "production" because depending on the value it has, it will lock or unlock some features, such as logging requests.

* MODE
* NODE_ENV

### Run
To run this project all you have to do is type this command in the command line:
```docker
docker-compose up
```