angular.module('estimator.routes', []).
	config(function($stateProvider, $urlRouterProvider) {

		 $urlRouterProvider.otherwise("/estimator");

		 $stateProvider
		 	.state('estimator', {
		 		url: '/estimator',
		 		templateUrl: 'partials/estimator.html',
		 		controller: 'EstimateCtrl'
		 	});
	});