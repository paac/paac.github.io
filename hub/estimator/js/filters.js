angular.module('estimator.filters', []).
	filter('calcSalePrice', function() {
		return function(cost) {
			if (cost <= 5.00) {
				return cost * 3.25;
			} else if ((cost > 5) && (cost <= 10)) {
				return cost * 2.5;
			} else if ((cost > 10) && (cost <= 75)) {
				return cost * 2.25;
			} else if ((cost > 75) && (cost <= 150)) {
				return cost * 2;
			} else if ((cost > 150) && (cost <= 750)) {
				return cost * 1.85;
			} else if (cost > 750) {
				return cost * 1.54;
			}
		}
	});