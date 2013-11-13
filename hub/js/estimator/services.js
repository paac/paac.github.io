angular.module('estimator.service', []).
	factory('Vendors', function() {
		vendors = [
			{name: 'Pep Boys'},
			{name: 'Prime'},
			{name: 'Quality'},
			{name: 'Bap Geon'},
			{name: 'API'},
			{name: 'American Tire', tires: true},
			{name: 'Atlantic Tire', tires: true},
			{name: 'Checkered Flag', dealer: true},
			{name: 'Colonial', dealer: true},
			{name: 'Interstate Battery', manualSale: true},
			{name: 'LKQ'},
			{name: 'Perry', dealer: true},
			{name: 'Priority', dealer: true},
			{name: 'Southern', dealer: true}
		];
		return vendors;
	});