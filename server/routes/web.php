<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('places',  ['uses' => 'PlaceController@showAllPlaces']);
  
    $router->get('places/{id}', ['uses' => 'PlaceController@showOnePlace']);
  
    $router->post('places', ['uses' => 'PlaceController@create']);
  
    $router->delete('places/{id}', ['uses' => 'PlaceController@delete']);
  
    $router->put('places/{id}', ['uses' => 'PlaceController@update']);
  
    $router->get('keywords',  ['uses' => 'KeywordController@showAllKeywords']);
  
    $router->get('keywords/{id}', ['uses' => 'KeywordController@showOneKeyword']);
  
    $router->post('keywords', ['uses' => 'KeywordController@create']);
  
    $router->delete('keywords/{id}', ['uses' => 'KeywordController@delete']);
  
    $router->put('keywords/{id}', ['uses' => 'KeywordController@update']);
});