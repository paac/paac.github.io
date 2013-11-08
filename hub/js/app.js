angular.module('hooptie', ['ngRoute', 'estimator.controller', 'secretary.controller', 'scheduler.controller', 'secretary.service', 'scheduler.service', 'scheduler.filter', 'firebase', 'ngAnimate', 'ui.date'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  		$routeProvider
  			.when('/hub/', 
  				{	
  					templateUrl: '/hub/partials/dashboard.html',
  				}
 			);
 		$routeProvider
 			.when('/hub/estimator',
 				{	
 					templateUrl: '/hub/partials/estimator.html',
 					controller: 'EstimateCtrl'		
 				}

 			);
 		$routeProvider
 			.when('/hub/scheduler',
 				{	
 					templateUrl: '/hub/partials/scheduler.html',
 					controller: 'ScheduleCtrl'
 				}
 			);
 		$routeProvider
 			.when('/hub/secretary',
 				{
 					templateUrl: '/hub/partials/secretary.html'
 				}
 			);

  		$locationProvider.html5Mode(true);
  	}]);