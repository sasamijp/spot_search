'use strict';

/**
 * @ngdoc function
 * @name spotApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the spotApp
 */
angular.module('spotApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
