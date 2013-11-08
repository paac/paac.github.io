angular.module('hooptie', ['ngRoute', 'estimator.controller', 'secretary.controller', 'scheduler.controller', 'secretary.service', 'scheduler.service', 'scheduler.filter', 'firebase', 'ngAnimate', 'ui.date'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  		$routeProvider
  			.when('/', 
  				{	
  					templateUrl: './partials/dashboard.html',
  				}
 			);
 		$routeProvider
 			.when('/estimator',
 				{	
 					templateUrl: './partials/estimator.html',
 					controller: 'EstimateCtrl'		
 				}

 			);
 		$routeProvider
 			.when('/scheduler',
 				{	
 					templateUrl: './partials/scheduler.html',
 					controller: 'ScheduleCtrl'
 				}
 			);
 		$routeProvider
 			.when('/secretary',
 				{
 					templateUrl: './partials/secretary.html'
 				}
 			);
 		$routeProvider
  			.otherwise(
  				{	redirectTo: './'}
  			);

  		$locationProvider.html5Mode(true);
  	}]);