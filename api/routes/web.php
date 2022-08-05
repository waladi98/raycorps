<?php

/** @var \Laravel\Lumen\Routing\Router $router */

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


$router->group(['prefix' => 'endpoint'], function () use ($router) {
    $router->post('smart',  ['uses' => 'EndpointController@smart']);
    $router->post('pmb',  ['uses' => 'EndpointController@pmb']);
    $router->get('',  ['uses' => 'EndpointController@endpoint_get']);
    $router->post('', ['uses' => 'EndpointController@endpoint_post']);

    $router->post('feeder',  ['uses' => 'EndpointController@feeder']);
    $router->get('listFeeder',  ['uses' => 'EndpointController@feederTable']);
    $router->post('listFeeder',  ['uses' => 'EndpointController@feederTable']);
});
