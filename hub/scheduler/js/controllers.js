angular.module('scheduler.controllers', []).
	controller('ScheduleCtrl', ['$scope', 'Vehicle', 'Statuses', 'Hours', 'Minutes', function($scope, Vehicle, Statuses, Hours, Minutes) {
		
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

		$scope.appointment = {
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
			appointment.date.setHours(hour,minute,0,0);
			console.log(appointment);
			$scope.appointments.push(appointment);
			console.log($scope.appointments);
			$scope.appointment = {
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

		$scope.editAppointment = function(idx) {
			$scope.appointment = $scope.appointments[idx];
			$scope.appointments.splice(idx, 1);
			localStorage.setItem('schedule', JSON.stringify($scope.appointments));
		}
		$scope.updateAppointment = function(appointment) {
			console.log(appointment.status);
			localStorage.setItem('schedule', JSON.stringify($scope.appointments));

		}
		$scope.deleteAppointment = function(idx) {
			$scope.appointments.splice(idx, 1);
			localStorage.setItem('schedule', JSON.stringify($scope.appointments));
		}

		// $scope.appointments.push(appointment);
		console.log($scope.appointments[0].name);
		console.log($scope.appointments[1].name);
	}]);