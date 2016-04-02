'use strict';

/* Services */

var phonecatServices = angular.module('mainApp', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('Phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
}]);