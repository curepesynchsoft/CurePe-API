# fastify-playground
#Shree Ganesh, BoilerPlate for Fastify, with Prisma for ORM

This Boiler Plate is really simple, All you need to change is to run few command and you will have a working API in no time.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Installing

A step by step series of examples that tell you how to get a development env running.


1. Change .environment-example to .env and setup like this

    ```APP_NAME="Fastify BoilerPlate"``` -> Your app name
    
    ```APP_ENV=local``` -> Your app environment (local, staging, production)

    ```APP_KEY=base64:eg93JlIlVeqLgD5zUhpkLlEjWhs+PA==``` -> your app security key (for jwt purposes)

    ```APP_DEBUG=true``` -> (flag for showing all errors)

    ```HOST="http://127.0.0.1"``` -> Your Host

    ```PORT=1900``` -> Your PORT

    ```APP_VERSION="${APP_NAME}/1.0.0"```  -> Your API or APP Version

    ```API_ROUTE="/api/v1"```  -> Your root API path (appended after HOST)

    ```#mongodb urls go like this - "mongodb://<username>:<password>@<host>:<port>/<collection-name>?authSource=admin&retryWrites=true&w=majority"```
    
    #DATABASE_URL=''

    ```#Dev MYSQL database access - mysql://<username>:<password>@<host>:<port>/<collection-name>```
    
    DATABASE_URL=''

    ```LOG_CHANNEL=stack``` -> Your Logging type

    -> if you are using twilio then enter these ids too.
    
    ```TWILIO_ACCOUNT_SID=""
    TWILIO_AUTH_TOKEN=""
    TWILIO_PHONE=""```

2. install all the dependencies by 

``` npm install ```

``` npx prisma generate ``` for all the prisma initializations

```npx prisma db push ``` after you make changes to ```prisma/schema.prisma``` file.


3. Your Folder Structure:

```prisma``` consists of all your DB related work and you should define all your DB Architectures here , Refer to Prisma doc at https://www.prisma.io/docs/guides for more information

```common-helpers``` -> They consist of utilities or redactor js files for common usage.

```constants``` -> This folder will have all the constants for the app , application.js is for app wide response code messages, informational.js is for general errors, messages.js is for all the Response strings.

```controllers``` -> Like the name says this will be root for all your controllers.

```middlewares``` -> for all the middleware you want to create.

```models``` -> This will have all the models for your controllers, ideally do not try to touch the core repository which acts as the main datasource entry point, ```yourmodel.model.js``` is what you should use to initialize the core repo.

```routes``` -> This will have all the routes for you, ```schema/common``` is the common repo of all the error, success and header schema which you will use in your routes.
I've created a sample ```user``` folder in route with its own route and schema files.

```routes.js``` will have all the routes, specify the routes specially here with all the schema you make.

```services``` will have all the library or third party service api and they all can be kept here.

```plugins``` is for plugins and it houses the authorization jwt verify method to be able to put in onRequest method.

```index.js``` is the main entry point and ```server.js``` accompanies all the work within index.

Happy Coding!




