angular.module('hooptie', ['ngRoute', 'estimator.controller', 'secretary.controller', 'scheduler.controller', 'secretary.service', 'scheduler.service', 'scheduler.filter', 'firebase', 'ngAnimate', 'ui.date'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  		$routeProvider
  			.when('/', 
  				{	
  					templateUrl: '/hub/partials/dashboard.html',
  				}
 			);
 		$routeProvider
 			.when('/estimator',
 				{	
 					templateUrl: '/hub/partials/estimator.html',
 					controller: 'EstimateCtrl'		
 				}

 			);
 		$routeProvider
 			.when('/scheduler',
 				{	
 					templateUrl: '/hub/partials/scheduler.html',
 					controller: 'ScheduleCtrl'
 				}
 			);
 		$routeProvider
 			.when('/secretary',
 				{
 					templateUrl: '/hub/partials/secretary.html'
 				}
 			);
 		$routeProvider
  			.otherwise(
  				{	redirectTo: '/hub/'}
  			);

  		$locationProvider.html5Mode(true);
  	}]);