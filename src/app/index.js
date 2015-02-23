'use strict';

angular.module('cheatMealFinalProjectV2', ['ngSanitize', 'ngResource', 'ui.router','chart.js','ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
