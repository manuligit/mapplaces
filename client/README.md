# MapPlaces

## Requirements

* A MySQL database called places
* php version 7.0 up
* node

## Instructions

### Server

Go to the /server/ folder. The PHP backend server can be run with the following command:

```
    php -S localhost:8000 -t public
```
If the API is run on another port, the base_url variable in client/components/router.js needs to be changed.

The database can be created with a dump or running the following command:
```
    php artisan migrate:refresh --seed
```
Which creates only places (dump includes keywords).

### Client

Go to the /client/ folder. Run

```
    npm install
    npm start
```
Which starts a liveserver. 
The site can be found at: http://127.0.0.1:8080/