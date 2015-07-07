angular.module('hooptie', ['ngRoute', 'estimator.controller', 'estimator.service', 'secretary.controller', 'scheduler.controller', 'secretary.service', 'scheduler.service', 'scheduler.filter', 'firebase', 'ngAnimate', 'ui.date', 'ui.bootstrap.buttons'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/hub/',
        {
          templateUrl: '/hub/partials/dashboard.html'
        })
      .when('/hub/estimator',
        {
          templateUrl: '/hub/partials/estimator.html',
          controller: 'EstimateCtrl'
        })
      .when('/hub/scheduler',
        {
          templateUrl: '/hub/partials/scheduler.html',
          controller: 'ScheduleCtrl'
        })
      .when('/hub/secretary',
        {
          templateUrl: '/hub/partials/secretary.html'
        })
      .otherwise({
        redirectTo: '/hub'
      });
    $locationProvider.html5Mode(true);
  }]);