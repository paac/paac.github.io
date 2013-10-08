angular.module('estimator.services', []).
	factory('History', function($mongolabResourceHttp) {
		return $mongolabResourceHttp('histories');
	});