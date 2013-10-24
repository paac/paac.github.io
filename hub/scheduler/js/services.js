angular.module('scheduler.services', []).factory('VehicleFactory', function($http) {

   	var key = '9tsavba6ytcpg853a4fwn3pg',
		url = 'https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=',
   		VehicleFactory = {
    		async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      			var promise = $http.jsonp(url+key+'&callback=JSON_CALLBACK').success(function (response) {
        // The then function here is an opportunity to modify the response
        			
        // The return value gets picked up by the then in the controller.
        			return response.data;
      		});
      // Return the promise to the controller
      	return promise;
    	}
  	};
  	return VehicleFactory;
});