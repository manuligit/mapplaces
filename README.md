# MapPlaces

## Requirements

* MySQL
* php version 7.0 up
* node

## Instructions

### Database

The database can be created with a dump with the following command in the project `root`:
```
    mysql -u user -p < places.sql
```
A password needs to be inserted in the prompt. The default value is root for both fields. If other credentials are used, they need to be entered in the `/server/.env` file:
```
    DB_USERNAME=root
    DB_PASSWORD=root
```

...or the places can be created (without keywords) with the following command in `/server/`:
```
    php artisan migrate:refresh --seed
```

### Server

The PHP backend server can be run with the following command in the `/server/` folder:

```
    php -S localhost:8000 -t public
```

If the API is run on another port, the `base_url` variable in `client/components/router.js` needs to be changed. It can be accessed at: [Places](http://localhost:8000/api/places) and [Keywords](http://localhost:8000/api/keywords).

### Client

Go to the `/client/` folder. Run

```
    npm install
    npm start
```
Which starts the live server. 
The website can be found at: http://127.0.0.1:8080/