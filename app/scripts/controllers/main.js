'use strict';

/**
 * @ngdoc function
 * @name spotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spotApp
 */

angular.module('spotApp')
  .controller('MainCtrl', function ($scope, JsonService, $resource) {
    $scope.loaded = false;
    $scope.selected = "";

    $scope.$watch('$viewContentLoaded', function(){
      setTimeout(function () {
        $scope.$apply(function() {
          $scope.loaded = true;
        });
      },1000);
      setTimeout(function () {
        $(".angular-google-map-container").height(document.body.clientHeight);
      },1200);
    });

    $resource('categolize.json',{}, {
      getData: {method:'GET', isArray: false}
    }).getData(function(data){
      $scope.categorie = [];
      for(var key in data) {
        if (Array.isArray(data[key])){
          $scope.categorie.push({
            key: key,
            array: data[key]
          });
        }
      }
      $scope.categorie = $scope.categorie.reverse();
    });

    $resource('name.json',{ }, {
      getData: {method:'GET', isArray: false}
    }).getData(function(data){
      $scope.names = data;
    });

    $resource('url.json',{ }, {
      getData: {method:'GET', isArray: false}
    }).getData(function(data){
      $scope.urls = data;
    });

    $scope.makers = [];

    JsonService.getData(function(data){
      jQuery.each(data["results"], function(){
        $scope.makers.push({
          id: this["feature_id"],
          attrs: this["attrs"],
          clicked: function(data){
            $scope.markerclicked = true;
            $scope.profiledata = data;
          },
          coords: {
            latitude: this["attrs"]["attr5"],
            longitude: this["attrs"]["attr6"]
          },
          options: { draggable: false }

        });
      });
    });

    $scope.map = {
      center: {
        latitude: 35.8587121,
        longitude: 139.9188615
      },
      zoom: 13,
      refresh: true
    };

    $scope.getKeyByValue = function(hash, value) {
      for(var key in hash) {
        if (hash[key] == value) return key;
      }
    };

    $scope.getAttrID = function(name){
      return $scope.getKeyByValue($scope.names, name)
    };

    $scope.selectedattr = "";
    $scope.selectedname = "";

    $scope.pin = function (name) {
        $scope.selectedattr = $scope.getAttrID(name);
        $scope.selectedname = name;
        $scope.selected = "「"+name+"」ができる場所を表示しています";
        document.querySelector('#infotoast').show()
    };

  });
