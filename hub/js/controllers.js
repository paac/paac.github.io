angular.module('estimator.controllers', []).
	controller('EstimateCtrl', ['$scope', function($scope) {

		$scope.parts = [];
		$scope.orders = (!localStorage.getItem('history')) ? [] : JSON.parse(localStorage.getItem('history'));
		
		//Iterate through parts array and calculate total price
		function totalOrder() {
			$scope.parts.total = 0
			for (var i = 0; i < $scope.parts.length; i++) {
    			$scope.parts.total += $scope.parts[i].totalPrice;
			}
		}

		function calcPrice(cost, quantity, dealer) {
			var markup = 0;
			if (!dealer) {
				if (cost <= 5) {
					markup = 3.25;
				} else if ((cost > 5) && (cost <= 10)) {
					markup = 2.5;
				} else if ((cost > 10) && (cost <= 75)) {
					markup = 2.25;
				} else if ((cost > 75) && (cost <= 150)) {
					markup = 2;
				} else if ((cost > 150) && (cost <= 750)) {
					markup = 1.85;
				} else {
					markup = 1.54;
				}
				
			} else {
				if (cost <= 1) {
					markup = 3.5;
				} else if ((cost > 1) && (cost <= 5)) {
					markup = 3.25; 
				} else if ((cost > 5) && (cost <= 50)) {
					markup = 2.25;
				} else if ((cost > 50) && (cost <= 100)) {
					markup = 1.82;
				} else if ((cost > 100) && (cost <= 175)) {
					markup = 1.67;
				} else {
					markup = 1.54;
				}
			}
			return markup * cost * quantity;
		}

		//Delete part by removing it from the parts array altogether
		$scope.delete = function ( idx ) {
  			
    		$scope.parts.splice(idx, 1);
  			totalOrder();

		};

		//Edit part by setting it as the active part and removing it's current entry from the order
		$scope.edit = function (idx) {

			$scope.item = $scope.parts[idx];
			$scope.item.salePrice = undefined;
			$scope.parts.splice(idx, 1);
			totalOrder();

		}

		//Add a new part to parts array.
		$scope.addToParts = function(item) {
			
			part = {};

			//set up part based on form values and push to parts array
			part.name = item.name;
			part.dealer = item.dealer;
			part.costPrice =  (!item.costPrice) ? 0 : item.costPrice;
			part.quantity = (!item.quantity) ? 1 : item.quantity;
			part.laborHours = (!item.laborHours) ? 0 : item.laborHours;
			part.laborPrice = part.laborHours * 89;

			if (!item.salePrice) {
				if (item.dealer) {
					part.salePrice = calcPrice(part.costPrice, part.quantity, true); 
				} else { 
					part.salePrice = calcPrice(part.costPrice, part.quantity); 
				}
			} else {
				salePrice = parseInt(item.salePrice);
				part.salePrice = salePrice * part.quantity;
			}
			
			part.totalPrice = part.salePrice + part.laborPrice;
			
			$scope.parts.push(part);
			//clear current form values by resetting item
			$scope.item = {};
			totalOrder();
		};

		$scope.editOrder = function(idx) {
			
			$scope.orders = JSON.parse(localStorage.getItem('history'));
			$scope.parts = $scope.orders[idx].parts;
			$scope.parts.name = $scope.name;
			console.log($scope.parts);
			$scope.orders.splice(idx, 1);
			localStorage.setItem('history', JSON.stringify($scope.orders));
			totalOrder();
		}

		$scope.addToHistory = function(parts) {
			order = {};
			$scope.name = parts.name
			order.name = parts.name;
			order.date = Date.now();
			order.total = parts.total;
			order.parts = parts;
			
			$scope.orders.push(order);
			$scope.parts = [];
			
			localStorage.setItem('history', JSON.stringify($scope.orders));
		};
		
	}]);