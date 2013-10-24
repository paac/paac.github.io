angular.module('scheduler.controllers', []).
	controller('ScheduleCtrl', ['$scope', 'VehicleFactory', function($scope, VehicleFactory) {
		
		$scope.date = new Date();
		$scope.date.setHours(0,0,0,0);

		$scope.statuses = [
			{ name: 'Drop-off', value: 'dropoff' },
			{ name: 'Waiting', value: 'waiting' },
			{ name: 'Late', value: 'warning' },
			{ name: 'No Show', value: 'danger' },
			{ name: 'Complete', value: 'success' },
			{ name: 'In Progress', value: 'active' }
		];

		$scope.hours = [
			{hour: 8, name: '8'},
			{hour: 9, name: '9'},
			{hour: 10, name: '10'},
			{hour: 11, name: '11'},
			{hour: 12, name: '12'},
			{hour: 13, name: '1'},
			{hour: 14, name: '2'},
			{hour: 15, name: '3'},
			{hour: 16, name: '4'}
		];
		
		$scope.minutes = [
			{minute: 0, name: '00'}, 
			{minute: 15, name: '15'}, 
			{minute: 30, name: '30'}, 
			{minute: 45, name: '45'}
		];

		$scope.appointment = {
			status : $scope.statuses[0].value,
			date: new Date(), 
			time: {
				hour: $scope.hours[0].hour, 
				minute: $scope.minutes[0].minute
			}
		};

		VehicleFactory.async().then(function(d) {
			$scope.vehicles = d.data.makes;
		});

		$scope.appointments = (!localStorage.getItem('schedule')) ? [] : JSON.parse(localStorage.getItem('schedule'));
				
		$scope.predicate = "date";
		
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
	}]);