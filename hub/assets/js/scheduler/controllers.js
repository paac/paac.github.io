 angular.module('scheduler.controller', []).
	controller('ScheduleCtrl', ['$scope', '$timeout', 'Statuses', 'Time', 'angularFire', function($scope, $timeout, Statuses, Time, angularFire) {
		
		//Get today's date and reset the time to midnight
		$scope.date = new Date();
		$scope.date.setHours(0,0,0,0);

		//declare our sort order
		$scope.predicate = "date";

		$scope.statuses = Statuses;
		$scope.time = Time;
		
		var ref = new Firebase("https://hooptie.firebaseio.com/scheduler");
		$scope.appointments = [];
		angularFire(ref, $scope, "appointments");

		newAppointment = function() {
			return {
				index: $scope.appointments.length,
				status: $scope.statuses[0].value,
				date: new Date(),
				time: {
					hour: $scope.time.hours[0].hour,
					minute: $scope.time.minutes[0].minute
				}
			};
		};

		$scope.appointment = newAppointment();
		
		$scope.incDate = function() {
			today = $scope.date.getDate();
			$scope.date.setDate(today + 1);
		};

		$scope.decDate = function() {
			today = $scope.date.getDate();
			$scope.date.setDate(today - 1);
		};

		$scope.getModels = function() {
			$scope.models = $scope.appointment.vehicle.make.models;
		};

		$scope.getYears = function() {
			$scope.years = $scope.appointment.vehicle.model.years;
		};

		//Add appointment to schedule
		$scope.addAppointment = function(appointment) {
			appointment = $scope.appointment;
			//Get our selected time values and make it a date object(if it isn't already)
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
			$scope.appointment = newAppointment();
		};

		//edit an existing appointment
		$scope.editAppointment = function(appointment) {
			
			$scope.appointment = $scope.appointments[appointment.index];
			$scope.appointment.date = new Date($scope.appointment.date);

			$scope.appointments.splice(appointment.index, 1);

			//recalculate our index
			$scope.appointment.index = $scope.appointments.length;
			for (var i=0; i < $scope.appointments.length; i++) {
				$scope.appointments[i].index = i;
			}
		};


		$scope.deleteAppointment = function(appointment) {
			$scope.appointments.splice(appointment.index, 1);
		};

		//Check to see if any existing appointments are late and update their status accordingly.
		$scope.updateStatus = function(){
			d = new Date();

			for (var i = 0; i < $scope.appointments.length; i++) {
				cd = new Date($scope.appointments[i].date);
				if ((cd < d) && (($scope.appointments[i].status == 'dropoff') || ($scope.appointments[i].status == 'waiting'))) {
					$scope.appointments[i].status = 'warning';
				}
			}
		};

		//Run our updateStatus every five minutes
		$scope.intervalFunction = function(){
			$timeout(function() {
				$scope.updateStatus();
				$scope.intervalFunction();
			}, 1000 * 60 * 5);
		};
		$scope.intervalFunction();
	}]);