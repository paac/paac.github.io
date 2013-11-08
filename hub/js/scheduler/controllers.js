angular.module('scheduler.controller', []).
	controller('ScheduleCtrl', ['$scope', '$timeout', 'Statuses', 'Time', 'angularFire', function($scope, $timeout, Statuses, Time, angularFire) {
		
		//Get today's date and reset the time to midnight
		$scope.date = new Date();
		$scope.date.setHours(0,0,0,0);

		//declare our sort order
		$scope.predicate = "date";

		//Get our list of statuses
		$scope.statuses = Statuses;
		//Get our list of valid time choices
		//TODO: Refactor this so that already-chosen time options are removed
		$scope.time = Time;

		//If no appointments, create a new array. Else, load our appointments from localStorage
		//TODO: move away from localStorage, get and store our data with a proper database
		// $scope.appointments = (!localStorage.getItem('schedule')) ? [] : JSON.parse(localStorage.getItem('schedule'));
		// This code is here in case our database gets corrupted and I need to reset it.
		
		// localStorage.setItem('schedule', JSON.stringify($scope.appointments));
		
		var ref = new Firebase("https://hooptie.firebaseio.com/scheduler");
		$scope.appointments = [];
		angularFire(ref, $scope, "appointments");

		//returns an object that populates our form with appropriate defaults
		newAppointment = function() {
			return {
				index: $scope.appointments.length,
				status: $scope.statuses[0].value,
				date: new Date(),
				time: {
					hour: $scope.time.hours[0].hour,
					minute: $scope.time.minutes[0].minute
				}
			}
		}

		//Set up our first appointment object of the day.
		$scope.appointment = newAppointment();
		
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

		//Add appointment to schedule
		$scope.addAppointment = function(appointment) {
			appointment = $scope.appointment
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
			//Add it to the schedule

	
			$scope.appointments.push(appointment);
			
			//Set up our next appointment
			$scope.appointment = newAppointment();
			//store our appointment in localStorage & reload
			// localStorage.setItem('schedule', JSON.stringify($scope.appointments));
			// $scope.appointments = JSON.parse(localStorage.getItem('schedule'));
		}

		//edit an existing appointment
		$scope.editAppointment = function(appointment) {
			
			//Get the apppriate appointment
			$scope.appointment = $scope.appointments[appointment.index];
			//storing our object as JSON casts our Date object to a string.
			//Make it an object again.
			$scope.appointment.date = new Date($scope.appointment.date);

			//Yank it our of array
			$scope.appointments.splice(appointment.index, 1);

			//recalculate our index
			$scope.appointment.index = $scope.appointments.length;
			for (var i=0; i < $scope.appointments.length; i++) {
				$scope.appointments[i].index = i;
			}
			//store it in localStorage.
			// localStorage.setItem('schedule', JSON.stringify($scope.appointments));
		}

		//Probably should call this "updateStatus", since it's not as used as generically as this would imply.
		//Then again, it may prove useful for "quick-edits" of other fields.
		$scope.updateAppointment = function(appointment) {
			// localStorage.setItem('schedule', JSON.stringify($scope.appointments));
		}

		//Yank an appointment out of our array and update our schedue in localStorage
		$scope.deleteAppointment = function(appointment) {
			$scope.appointments.splice(appointment.index, 1);
			// localStorage.setItem('schedule', JSON.stringify($scope.appointments));
		}

		//Check to see if any existing appointments are late and update their status accordingly.
		$scope.updateStatus = function(){
			d = new Date();

    		for (var i = 0; i < $scope.appointments.length; i++) {
    			
    			cd = new Date($scope.appointments[i].date);
    			if ((cd < d) && (($scope.appointments[i].status == 'dropoff') || ($scope.appointments[i].status == 'waiting'))) {
    				$scope.appointments[i].status = 'warning';
    			}
    		}
    		// localStorage.setItem('schedule', JSON.stringify($scope.appointments));
  		};

  		//Run our updateStatus every five minutes
  		$scope.intervalFunction = function(){
    		$timeout(function() {
      			$scope.updateStatus();
      			$scope.intervalFunction();
    		}, 1000 * 60 * 5)
  		};
  		$scope.intervalFunction();
		
	}]);