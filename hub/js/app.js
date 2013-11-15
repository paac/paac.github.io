angular.module('hooptie', ['ngRoute', 'estimator.controller', 'estimator.service', 'secretary.controller', 'scheduler.controller', 'secretary.service', 'scheduler.service', 'scheduler.filter', 'firebase', 'ngAnimate', 'ui.date'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',
        {
          templateUrl: 'partials/dashboard.html'
        })
      .when('./estimator', 
        {
          templateUrl: 'partials/estimator.html',
          controller: 'EstimateCtrl'
        })
      .when('./scheduler',
        {
          templateUrl: 'partials/scheduler.html',
          controller: 'ScheduleCtrl'
        })
      .when('./secretary',
        {
          templateUrl: 'partials/secretary.html'
        })
      .otherwise({
        redirectTo: '/hub'
      });
  }]);
  // .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  //   $routeProvider
  //     .when('/hub/', 
  //       {	
  //         templateUrl: 'partials/dashboard.html',
  //       }
  //     );
  //   $routeProvider
  //     .when('/hub/estimator',
  //       {	
  //         templateUrl: '/hub/partials/estimator.html',
  //         controller: 'EstimateCtrl'		
  //       }
  //     );
  //   $routeProvider
  //     .when('/hub/scheduler',
  //       {	
  //         templateUrl: '/hub/partials/scheduler.html',
  //         controller: 'ScheduleCtrl'
  //       }
  //     );
  //   $routeProvider
  //     .when('/hub/secretary',
  //       {
  //         templateUrl: '/hub/partials/secretary.html'
  //       }
  //     );
  //   }]);       