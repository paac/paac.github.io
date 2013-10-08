angular.module('estimator.controllers', []).
	controller('EstimateCtrl', ['$scope', function($scope) {

		$scope.parts = [];
		$scope.orders = (!localStorage.getItem('history')) ? [] : JSON.parse(localStorage.getItem('history'));
		$scope.predicate = "-date";
		
		function totalOrder() {
			var total = 0,
				length = $scope.parts.length,
				parts = $scope.parts;
			for (var i = 0; i < length; i++) {
				total += parts[i].totalPrice;
			}
			$scope.parts.total = total;
		}
			
		function calcPrice(cost, quantity, dealer) {

			var markup;
			markup = (function() {
			  switch (false) {
			    case !(cost <= 5 && !dealer):
			      return '3.25';
			    case !(cost > 5 && cost <= 10 && !dealer):
			      return '2.5';
			    case !(cost > 10 && cost <= 75 && !dealer):
			      return '2.25';
			    case !(cost > 75 && cost <= 150 && !dealer):
			      return '2';
			    case !(cost > 150 && cost <= 750 && !dealer):
			      return '1.85';
			    case !(cost <= 1 && dealer):
			      return '3.5';
			    case !(cost > 1 && cost <= 5 && dealer):
			      return '3.25';
			    case !(cost > 5 && cost <= 50 && dealer):
			      return '2.25';
			    case !(cost > 50 && cost <= 100 && dealer):
			      return '1.82';
			    case !(cost > 100 && cost <= 175 && dealer):
			      return '1.67';
			    default:
			      return '1.54';
			  }
			})();
			return markup * cost * quantity;
		}

		$scope.deletePart = function ( idx ) {
    		$scope.parts.splice(idx, 1);
  			totalOrder();
		};

		$scope.edit = function (idx) {
			$scope.item = $scope.parts[idx];
			$scope.parts.splice(idx, 1);
			totalOrder();
		}

		$scope.addToParts = function(item) {
			
			part = {};
			part = item;
			
			part.costPrice =  (!item.costPrice) ? 0 : item.costPrice;
			part.quantity = (!item.quantity) ? 1 : item.quantity;
			part.laborPrice = (!part.laborHours) ? 0 : part.laborHours * 89;

			if (item.salePrice) {
				part.salePriceTotal = parseFloat(item.salePrice) * part.quantity;
			} else if (item.dealer) {
				part.salePriceTotal = calcPrice(part.costPrice, part.quantity, true);
			} else { 
				part.salePriceTotal = calcPrice(part.costPrice, part.quantity);
			}
			
			part.totalPrice = part.salePriceTotal + part.laborPrice;
			
			$scope.parts.push(part);
			$scope.item = {};

			totalOrder();
		};

		$scope.editOrder = function(idx) {
			
			orders = JSON.parse(localStorage.getItem('history'));
			reversedIndex = orders.length - idx - 1;

			$scope.parts = orders[reversedIndex].parts;
			$scope.parts.name = orders[reversedIndex].name;
			$scope.orders.splice(reversedIndex, 1);
			
			localStorage.setItem('history', JSON.stringify($scope.orders));
			totalOrder();
		}

		$scope.addToHistory = function(parts) {
			
			order = {};

			order.name = parts.name;
			order.date = Date.now();
			order.total = parts.total;
			order.parts = parts;
			
			$scope.orders.push(order);
			$scope.parts = [];
			
			localStorage.setItem('history', JSON.stringify($scope.orders));
		};

	}]);