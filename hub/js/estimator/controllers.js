angular.module('estimator.controller', []).
  controller('EstimateCtrl', ['$scope', 'angularFire', 'Vendors',
    function ($scope, angularFire, Vendors) {
      var ref = new Firebase("https://hooptie.firebaseio.com/estimator");
      $scope.orders = [];
      angularFire(ref, $scope, "orders");

      $scope.parts       = [];
      $scope.parts.index = $scope.orders.length;
      $scope.predicate   = "-date";
      $scope.vendors     = Vendors;
      $scope.item        = {matrix: 'normal'};

      //This function calculates the total for an order
      //Takes no arguments, returns nothing - it just
      //sets the total on the $scope.parts object.
      function totalOrder() {
        var salePriceTotal     = 0,
          laborPriceTotal      = 0,
          shopSupplies         = 0,
          hazardMaterials      = 0,
          taxableAmount        = 0,
          SHOP_SUPPLIES_CAP    = 19.73,
          HAZARD_MATERIALS_CAP = 19.73,
          length               = $scope.parts.length,
          parts                = $scope.parts,
          i                    = 0;

        for (i = 0; i < length; i++) {
          hazardMaterials += parts[i].salePriceTotal * 0.06;
          shopSupplies    += parts[i].laborPrice * 0.06;
          salePriceTotal  += parts[i].salePriceTotal;
          laborPriceTotal += parts[i].laborPrice;
        }
        if (hazardMaterials > HAZARD_MATERIALS_CAP) {
          hazardMaterials = HAZARD_MATERIALS_CAP;
        }
        if (shopSupplies > SHOP_SUPPLIES_CAP) {
          shopSupplies = SHOP_SUPPLIES_CAP;
        }
        taxableAmount                = salePriceTotal + hazardMaterials + shopSupplies;
        $scope.parts.subTotal        = salePriceTotal + laborPriceTotal;
        $scope.parts.tax             = taxableAmount * 0.06;
        $scope.parts.total           = (taxableAmount * 1.06) + laborPriceTotal;
        $scope.parts.hazardMaterials = hazardMaterials;
        $scope.parts.shopSupplies    = shopSupplies;
      }

      //This function calculates the sale price for an item according to our pricing matrices.
      //It takes a part as an argument and returns the sale price. 
      function calcPrice(part) {
        var markup,
          cost     = part.costPrice,
          quantity = part.quantity,
          matrix   = part.matrix;
        if (matrix === 'tire' || part.tire) {
          markup = 1.25;
        } else if (matrix === 'dealer' || part.dealer) {
          if (cost <= 1) {
            markup = 3.5;
          } else if (cost >   1 && cost <=   5) {
            markup = 3.25;
          } else if (cost >   5 && cost <   50) {
            markup = 2.25;
          } else if (cost >  50 && cost <= 100) {
            markup = 1.82;
          } else if (cost > 100 && cost <= 175) {
            markup = 1.67;
          } else {
            markup = 1.54;
          }
        } else {
          if (cost <= 5) {
            markup = 3.25;
          } else if (cost >   5 && cost <=  10) {
            markup = 2.5;
          } else if (cost >  10 && cost <=  75) {
            markup = 2.25;
          } else if (cost >  75 && cost <= 150) {
            markup = 2;
          } else if (cost > 150 && cost <= 750) {
            markup = 1.85;
          } else {
            markup = 1.54;
          }
        }
        return markup * cost * quantity;
      }

      //This function updates our order index anytime there is a change.
      //It takes no arguments and returns nothing, just modifies our 
      //orders array directly.
      function updateIndex() {
        var i,
          orders = $scope.orders.filter(function (n) { return n; }),
          max = orders.length;
        for (i = 0; i < max; i++) {
          orders[i].index = i;
        }
        $scope.orders = orders;
      }

//Parts - the following methods pertain to our parts array.

      //Deletes a part from the array and updates total.
      //Takes a number, idx, as an argument and returns nothing.
      $scope.deletePart = function (idx) {
        $scope.parts.splice(idx, 1);
        totalOrder();
      };

      //Copies an item from our parts array and uses that info
      //to populate our form. Saves a referernce to the index on the item for our original part
      //so that we can remove it from the array later.
      //Takes a number, idx, as an argument and returns nothing.
      $scope.editPart = function (idx) {
        $scope.item = angular.copy($scope.parts[idx]);
        $scope.item.originalCopy = idx;
        totalOrder();
      };

      //Set pricing matrix according to selected vendor.
      //Takes item array as argument and returns nothing.
      $scope.optionSelected = function (item) {
        item.matrix     = item.vendor.matrix;
        item.manualSale = item.vendor.manualSale;
      };

      //Add item to parts array, setting up default values along the way.
      //Takes item as argument, returns nothing.
      $scope.addToParts = function (item) {
        var part = {};

        part           = item;
        part.costPrice = (!item.costPrice) ? 0 : item.costPrice;
        part.quantity  = (!item.quantity)  ? 1 : item.quantity;

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

//Orders - the following methods pertain to our orders array.
      //Clone an existing order and adds it to our array.
      //Takes an order as argument and returns nothing.
      $scope.duplicateOrder = function (order) {
        var orderCopy = angular.copy(order);
        orderCopy.index = $scope.orders.length;
        orderCopy.name  = order.name + "(clone)";
        $scope.orders.push(orderCopy);
        updateIndex();
      };

      //Delete an order from our array.
      //Takes order as argument and returns nothing.
      $scope.deleteOrder = function (order) {
        $scope.orders.splice(order.index, 1);
        updateIndex();
      };

      //Edit an order, populating parts array.
      //Takes order as argument and returns nothing.
      $scope.editOrder = function (order) {
        $scope.parts      = $scope.orders[order.index].parts;
        $scope.parts.name = $scope.orders[order.index].name;
        $scope.editedPart = order.index;
        totalOrder();
        updateIndex();
      };

      //Save order to orders array and clears parts array.
      //Takes parts array as argument and returns nothing.
      $scope.addToHistory = function (parts) {
        var order;
        if ($scope.editedPart) {
          $scope.orders.splice($scope.editedPart, 1);
        }
        $scope.editedPart = undefined;
        order = {
          index : $scope.orders.length,
          name  : parts.name,
          date  : Date.now(),
          total : parts.total,
          parts : parts
        };
        $scope.orders.push(order);
        $scope.parts = [];
        updateIndex();
      };

      $scope.clearOrder = function () {
        $scope.item = { matrix: 'normal'};
        $scope.parts = [];
      };
    }]);