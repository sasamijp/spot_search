'use strict';

/**
 * @ngdoc overview
 * @name spotApp
 * @description
 * # spotApp
 *
 * Main module of the application.
 */

angular
  .module('spotApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type === 'text/javascript-lazy') {
          var code = elem.text();
          var f = new Function(code);
          f();
        }
      }
    };
  })
  .factory('JsonService', function($resource) {
    return $resource('data.json',{ }, {
      getData: {method:'GET', isArray: false}
    });
  });
