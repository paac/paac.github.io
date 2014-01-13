angular.module('estimator.controller', []).
  controller('EstimateCtrl', ['$scope', 'angularFire', 'Vendors',
    function ($scope, angularFire, Vendors) {
      var ref = new Firebase("https://hooptie.firebaseio.com/estimator");
      $scope.orders = [];
      angularFire(ref, $scope, "orders");

      $scope.parts = [];
      $scope.parts.index = $scope.orders.length;
      $scope.predicate = "-date";
      $scope.vendors = Vendors;
      $scope.item = {matrix: 'normal'};

      function totalOrder() {
        var salePriceTotal = 0,
          laborPriceTotal = 0,
          shopSupplies = 0,
          hazardMaterials = 0,
          taxableAmount = 0,
          shopSuppliesCap = 19.73,
          hazardMaterialsCap = 19.73,
          length = $scope.parts.length,
          parts = $scope.parts,
          i = 0;

        for (i = 0; i < length; i++) {
          hazardMaterials += parts[i].salePriceTotal * 0.06;
          shopSupplies += parts[i].laborPrice * 0.06;
          salePriceTotal += parts[i].salePriceTotal;
          laborPriceTotal += parts[i].laborPrice;
        }
        if (hazardMaterials > hazardMaterialsCap) {
          hazardMaterials = hazardMaterialsCap;
        }
        if (shopSupplies > shopSuppliesCap) {
          shopSupplies = shopSuppliesCap;
        }
        taxableAmount = salePriceTotal + hazardMaterials + shopSupplies;
        $scope.parts.subTotal = salePriceTotal + laborPriceTotal;
        $scope.parts.tax = taxableAmount * 0.06;
        $scope.parts.total = (taxableAmount * 1.06) + laborPriceTotal;
        $scope.parts.hazardMaterials = hazardMaterials;
        $scope.parts.shopSupplies = shopSupplies;
      }

      function calcPrice(part) {
        var markup,
          cost = part.costPrice,
          quantity = part.quantity,
          matrix = part.matrix;
        if (matrix === 'tire' || part.tire) {
          markup = 1.25;
        } else if (matrix === 'dealer' || part.dealer) {
          if (cost <= 1) {
            markup = 3.5;
          } else if (cost > 1 && cost <= 5) {
            markup = 3.25;
          } else if (cost > 5 && cost < 50) {
            markup = 2.25;
          } else if (cost > 50 && cost <= 100) {
            markup = 1.82;
          } else if (cost > 100 && cost <= 175) {
            markup = 1.67;
          } else {
            markup = 1.54;
          }
        } else {
          if (cost <= 5) {
            markup = 3.25;
          } else if (cost > 5 && cost <= 10) {
            markup = 2.5;
          } else if (cost > 10 && cost <= 75) {
            markup = 2.25;
          } else if (cost > 75 && cost <= 150) {
            markup = 2;
          } else if (cost > 150 && cost <= 750) {
            markup = 1.85;
          } else {
            markup = 1.54;
          }
        }
        return markup * cost * quantity;
      }

      $scope.deletePart = function (idx) {
        $scope.parts.splice(idx, 1);
        totalOrder();
      };

      $scope.edit = function (idx) {
        $scope.item = angular.copy($scope.parts[idx]);
        $scope.item.originalCopy = idx;
        totalOrder();
      };

      $scope.optionSelected = function (item) {
        item.matrix = item.vendor.matrix;
        item.manualSale = item.vendor.manualSale;
      };

      $scope.addToParts = function (item) {
        var part = {};
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
        } else {
          part.salePriceTotal = calcPrice(part);
        }

        part.totalPrice = part.salePriceTotal + part.laborPrice;

        if (part.originalCopy !== undefined) {
          $scope.parts.splice(part.originalCopy, 1);
        }
        $scope.parts.push(part);
        $scope.item = { matrix: 'normal'};
        totalOrder();
      };

      function updateIndex() {
        var i;
        for (i = 0; i < $scope.orders.length; i++) {
          $scope.orders[i].index = i;
        }
      }

      $scope.duplicateOrder = function (order) {
        order.index = $scope.orders.length;
        $scope.orders.push(order);
        updateIndex();
      };

      $scope.deleteOrder = function (order) {
        $scope.orders.splice(order.index, 1);
        updateIndex();
      };

      $scope.editOrder = function (order) {
        $scope.parts = $scope.orders[order.index].parts;
        $scope.parts.name = $scope.orders[order.index].name;
        $scope.editPart = order.index;
        totalOrder();
        $scope.parts.index = $scope.orders.length;
        updateIndex();
      };

      $scope.addToHistory = function (parts) {
        var order;
        if ($scope.editPart) {
          $scope.orders.splice($scope.editPart, 1);
        }
        $scope.editPart = undefined;
        order = {
          index: $scope.orders.length,
          name: parts.name,
          date: Date.now(),
          total: parts.total,
          parts: parts
        };
        $scope.orders.push(order);
        $scope.parts = [];
      };
    }]);