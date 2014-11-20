'use strict';

angular.module('drugExpertSystem.filter', [])
	.filter('newlines', function () {
   		return function(text) {
    		return text.split(/\n/g);
  		};
});