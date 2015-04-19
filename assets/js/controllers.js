
define(function (require) {
   
  var angular = require('angular'),
      Controllers = angular.module('controllers', []);
   
  Controllers.controller('angTskController', require('controllers/angTaskController'));
   
  return Controllers;
   
});