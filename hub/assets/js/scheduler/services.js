angular.module('scheduler.service', [])
	.factory('Statuses', function() {
		return [
			{ name: 'Drop-off', value: 'dropoff' },
			{ name: 'Waiting', value: 'waiting' },
			{ name: 'Arrived', value: 'arrived' },
			{ name: 'Late', value: 'warning' },
			{ name: 'No Show', value: 'danger' },
			{ name: 'Complete', value: 'no-show' },
			{ name: 'In Progress', value: 'active' }
		];
	})
	.factory('Time', function() {
		return {hours : [
					{hour: 8, name: '8'},
					{hour: 9, name: '9'},
					{hour: 10, name: '10'},
					{hour: 11, name: '11'},
					{hour: 12, name: '12'},
					{hour: 13, name: '1'},
					{hour: 14, name: '2'},
					{hour: 15, name: '3'},
					{hour: 16, name: '4'}
				],
				minutes: [
					{minute: 0, name: '00'}, 
					{minute: 15, name: '15'}, 
					{minute: 30, name: '30'}, 
					{minute: 45, name: '45'}
				]
		};
	})
	.factory('Hours', function() {
		return [
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
	})
	.factory('Minutes', function() {
		return [
			{minute: 0, name: '00'}, 
			{minute: 15, name: '15'}, 
			{minute: 30, name: '30'}, 
			{minute: 45, name: '45'}
		];
	})
;