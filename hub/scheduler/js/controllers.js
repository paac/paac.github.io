angular.module('scheduler.controllers', []).
	controller('ScheduleCtrl', ['$scope', '$timeout', 'Vehicle', 'Statuses', 'Hours', 'Minutes', function($scope, $timeout, Vehicle, Statuses, Hours, Minutes) {
		
		$scope.date = new Date();
		$scope.date.setHours(0,0,0,0);
		$scope.predicate = "date";

		$scope.statuses = Statuses;
		$scope.hours = Hours;
		$scope.minutes = Minutes;

		Vehicle.async().then(function(d) {
			$scope.vehicles = d.data.makes;
		});

		$scope.appointments = (!localStorage.getItem('schedule')) ? [] : JSON.parse(localStorage.getItem('schedule'));
		// $scope.appointments = [];
		// localStorage.setItem('schedule', JSON.stringify($scope.appointments));
		$scope.appointment = {
			index: $scope.appointments.length,
			status : $scope.statuses[0].value,
			date: new Date(), 
			time: {
				hour: $scope.hours[0].hour, 
				minute: $scope.minutes[0].minute
			}
		};

		$scope.incDate = function() {
			today = $scope.date.getDate();
			$scope.date.setDate(today + 1);
		}

		$scope.decDate = function() {
			today = $scope.date.getDate();
			$scope.date.setDate(today - 1);
		}

		$scope.getModels = function() {
			$scope.models = $scope.appointment.vehicle.make.models;
		}

		$scope.getYears = function() {
			$scope.years = $scope.appointment.vehicle.model.years;
		}

		$scope.addAppointment = function(appointment) {
			appointment = $scope.appointment
			// appointment.timeString = appointment.time.hour.hour + ':' + appointment.time.minute.minute;
			hour = appointment.time.hour;
			minute = appointment.time.minute;
			if (appointment.date.setHours) {
				console.log('if');
				appointment.date.setHours(hour,minute,0,0);
			} else {
				console.log('else');
				appointment.date = new Date(appointment.date);
				appointment.date.setHours(hour, minute,0,0);
			}
			$scope.appointments.push(appointment);
			$scope.appointment = {
				index: $scope.appointments.length,
				status : $scope.statuses[0].value,
				date: new Date(), 
				time: {
					hour: $scope.hours[0].hour, 
					minute: $scope.minutes[0].minute
				}
			};
			localStorage.setItem('schedule', JSON.stringify($scope.appointments));
			$scope.appointments = JSON.parse(localStorage.getItem('schedule'));
		}

		$scope.editAppointment = function(appointment) {
			console.log(appointment.index);
			$scope.appointment = $scope.appointments[appointment.index];
			
			console.log($scope.appointment.index);
			$scope.appointment.date = new Date($scope.appointment.date);

			$scope.appointments.splice(appointment.index, 1);
			$scope.appointment.index = $scope.appointments.length;
			for (var i=0; i < $scope.appointments.length; i++) {
				$scope.appointments[i].index = i;
			}
			localStorage.setItem('schedule', JSON.stringify($scope.appointments));
		}

		$scope.updateAppointment = function(appointment) {
			localStorage.setItem('schedule', JSON.stringify($scope.appointments));
		}
		$scope.deleteAppointment = function(appointment) {
			$scope.appointments.splice(appointment.index, 1);
			localStorage.setItem('schedule', JSON.stringify($scope.appointments));
		}

		$scope.updateStatus = function(){
			d = new Date();

    		for (var i = 0; i < $scope.appointments.length; i++) {
    			
    			cd = new Date($scope.appointments[i].date);
    			if ((cd < d) && (($scope.appointments[i].status == 'dropoff') || ($scope.appointments[i].status == 'waiting'))) {
    				$scope.appointments[i].status = 'warning';
    			}
    		}
    		localStorage.setItem('schedule', JSON.stringify($scope.appointments));
  		};

  		// Function to replicate setInterval using $timeout service.
  		$scope.intervalFunction = function(){
    		$timeout(function() {
      			$scope.updateStatus();
      			$scope.intervalFunction();
    		}, 300000)
  		};

  		// Kick off the interval
  		$scope.intervalFunction();
		// $scope.appointments.push(appointment);
		
	}]);