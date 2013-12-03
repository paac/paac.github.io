angular.module('estimator.controller', []).
        controller('EstimateCtrl', ['$scope', 'angularFire', 'Vendors',
                function($scope, angularFire, Vendors) {
                var ref = new Firebase("https://hooptie.firebaseio.com/estimator");
                $scope.orders = [];
                angularFire(ref, $scope, "orders");

                $scope.parts = [];
                $scope.predicate = "-date";
                $scope.vendors = Vendors;

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
                        $scope.item = angular.copy($scope.parts[idx]);
                        $scope.item.originalCopy = idx;
                        totalOrder();
                };
                
                $scope.optionSelected = function(item) {
                        item.dealer = item.vendor.dealer;
                        item.manualSale = item.vendor.manualSale;
                        item.tires = item.vendor.tires;
                };

                $scope.addToParts = function(item) {
                        part = {};
                        part = item;

                        part.costPrice =  (!item.costPrice) ? 0 : item.costPrice;
                        part.quantity = (!item.quantity) ? 1 : item.quantity;
                        if (!part.manualLabor) {
                                part.laborPrice = (!part.laborHours) ? 0 : parseFloat(part.laborHours) * 89;
                        } else {
                                part.laborPrice = ((part.laborPrice) && (part.laborPrice !== 0)) ? parseFloat(part.laborPrice) : 0;
                                part.laborHours = (part.laborPrice !== 0) ? part.laborPrice / 89 : 0;
                        }
                        if (part.manualSale) {
                                part.salePriceTotal = parseFloat(item.salePrice) * part.quantity;
                        } else if (part.dealer) {
                                part.salePriceTotal = calcPrice(part.costPrice, part.quantity, true);
                        } else if (part.tires) {
                                part.salePrice = part.costPrice * 1.25;
                                part.salePriceTotal = part.salePrice * part.quantity;
                        } else { 
                                part.salePriceTotal = calcPrice(part.costPrice, part.quantity);
                        }
                        part.totalPrice = part.salePriceTotal + part.laborPrice;
                        console.log(part.originalCopy);
                        if (typeof part.originalCopy !== undefined) $scope.parts.splice(part.originalCopy, 1);
                        $scope.parts.push(part);
                        $scope.item = {};
                        totalOrder();
                };
                $scope.deleteOrder = function(idx) {
                        $scope.orders.splice($scope.orders.length - idx - 1, 1);
                };
                $scope.editOrder = function(idx) {
                        //copy our entire work order history...gotta be a better way?
                        orders = $scope.orders;
                        //get total number of orders and subtract our index
                        reversedIndex = orders.length - idx - 1;
                        //copy our reversed index to $scope...?
                        $scope.reversedIndex = reversedIndex;
                        //assign the selected order to our parts model
                        $scope.parts = orders[reversedIndex].parts;
                        //assign customer name to order
                        $scope.parts.name = orders[reversedIndex].name;

                        //recalculate total
                        totalOrder();
                };

                $scope.addToHistory = function(parts) {
                        if ($scope.reversedIndex) $scope.orders.splice($scope.reversedIndex, 1);
                        $scope.reversedIndex = undefined;
                        order = {
                                name: parts.name,
                                date: Date.now(),
                                total: parts.total,
                                parts: parts
                        };
                        $scope.orders.push(order);
                        $scope.parts = [];
                };
        }]);