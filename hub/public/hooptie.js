angular.module('hooptie', ['ngRoute', 'estimator.controller', 'estimator.service', 'secretary.controller', 'scheduler.controller', 'secretary.service', 'scheduler.service', 'scheduler.filter', 'firebase', 'ngAnimate', 'ui.date', 'ui.bootstrap.buttons'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    //Don't try to do anything smart with this. Angular routes are fucking stupid and this will all break without any hint of an error.
    $routeProvider
      .when('/hub/',
        {
          templateUrl: '/hub/partials/dashboard.html'
        })
      .when('/hub/estimator',
        {
          templateUrl: '/hub/partials/estimator.html',
          controller: 'EstimateCtrl'
        })
      .when('/hub/scheduler',
        {
          templateUrl: '/hub/partials/scheduler.html',
          controller: 'ScheduleCtrl'
        })
      .when('/hub/secretary',
        {
          templateUrl: '/hub/partials/secretary.html'
        })
      .otherwise({
        redirectTo: '/hub'
      });
    $locationProvider.html5Mode(true);
  }]);;angular.module('ui.bootstrap.buttons', [])

  .constant('buttonConfig', {
    activeClass: 'active',
    toggleEvent: 'click'
  })

  .directive('btnRadio', ['buttonConfig', function (buttonConfig) {
    var activeClass = buttonConfig.activeClass || 'active';
    var toggleEvent = buttonConfig.toggleEvent || 'click';

    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {

        //model -> UI
        ngModelCtrl.$render = function () {
          element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
        };

        //ui->model
        element.bind(toggleEvent, function () {
          if (!element.hasClass(activeClass)) {
            scope.$apply(function () {
              ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
              ngModelCtrl.$render();
            });
          }
        });
      }
    };
  }])

  .directive('btnCheckbox', ['buttonConfig', function (buttonConfig) {
    var activeClass = buttonConfig.activeClass || 'active';
    var toggleEvent = buttonConfig.toggleEvent || 'click';

    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {

        function getTrueValue() {
          var trueValue = scope.$eval(attrs.btnCheckboxTrue);
          return angular.isDefined(trueValue) ? trueValue : true;
        }

        function getFalseValue() {
          var falseValue = scope.$eval(attrs.btnCheckboxFalse);
          return angular.isDefined(falseValue) ? falseValue : false;
        }

        //model -> UI
        ngModelCtrl.$render = function () {
          element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
        };

        //ui->model
        element.bind(toggleEvent, function () {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(element.hasClass(activeClass) ? getFalseValue() : getTrueValue());
            ngModelCtrl.$render();
          });
        });
      }
    };
  }]);
;angular.module('estimator.controller', []).
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
          extras               = 0,
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
        if (!$scope.parts.noExtras) {
          extras = hazardMaterials + shopSupplies;
        }
        taxableAmount                = salePriceTotal + extras;
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
          part.laborPrice = (!part.laborHours) ? 0 : parseFloat(part.laborHours) * 93;
        } else {
          part.laborPrice = ((part.laborPrice) && (part.laborPrice !== 0)) ? parseFloat(part.laborPrice) : 0;
          part.laborHours = (part.laborPrice !== 0) ? part.laborPrice / 93 : 0;
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

      $scope.clearParts = function() {
        $scope.item = { matrix: 'normal'};
      };
      
      $scope.clearOrder = function () {
        $scope.item = { matrix: 'normal'};
        $scope.parts = [];
      };
    }]);;angular.module('estimator.service', []).
  factory('Vendors', function () {
    var vendors = [
      {name: 'Pep Boys'},
      {name: 'Prime'},
      {name: 'Quality'},
      {name: 'Bap Geon'},
      {name: 'API'},
      {name: 'American Tire', matrix: 'tire'},
      {name: 'Atlantic Tire', matrix: 'tire'},
      {name: 'Checkered Flag', matrix: 'dealer'},
      {name: 'Colonial', matrix: 'dealer'},
      {name: 'Interstate Battery', manualSale: true},
      {name: 'LKQ'},
      {name: 'Perry', matrix: 'dealer'},
      {name: 'Priority', matrix: 'dealer'},
      {name: 'Southern', matrix: 'dealer'}
    ];
    return vendors;
  });;angular.module('scheduler.controller', []).
  controller('ScheduleCtrl', ['$scope', '$timeout', 'Statuses', 'Time', 'angularFire', function ($scope, $timeout, Statuses, Time, angularFire) {

    //Get today's date and reset the time to midnight
    $scope.date = new Date();
    $scope.date.setHours(0, 0, 0, 0);

    //declare our sort order
    $scope.predicate = "date";

    $scope.statuses = Statuses;
    $scope.time = Time;

    var ref = new Firebase("https://hooptie.firebaseio.com/scheduler");
    $scope.appointments = [];
    angularFire(ref, $scope, "appointments");

    var newAppointment = function () {
      return {
        index: $scope.appointments.length,
        status: $scope.statuses[0].value,
        date: new Date(),
        time: {
          hour: $scope.time.hours[0].hour,
          minute: $scope.time.minutes[0].minute
        }
      };
    };

    $scope.appointment = newAppointment();

    function updateIndex() {
      var i,
        appointments = $scope.appointments.filter(function (n) { return n; }),
        max = appointments.length;
        
      for (i = 0; i < max; i++) {
        appointments[i].index = i;
      }
      $scope.appointments = appointments;
    }

    $scope.incDate = function () {
      var today = $scope.date.getDate();
      $scope.date.setDate(today + 1);
    };

    $scope.decDate = function () {
      var today = $scope.date.getDate();
      $scope.date.setDate(today - 1);
    };

    $scope.getModels = function () {
      $scope.models = $scope.appointment.vehicle.make.models;
    };

    $scope.getYears = function () {
      $scope.years = $scope.appointment.vehicle.model.years;
    };

    //Add appointment to schedule
    $scope.addAppointment = function (appointment) {
      appointment = $scope.appointment;
      //Get our selected time values and make it a date object(if it isn't already)
      var hour = appointment.time.hour,
        minute = appointment.time.minute;
      if (appointment.date.setHours) {
        appointment.date.setHours(hour, minute, 0, 0);
      } else {
        appointment.date = new Date(appointment.date);
        appointment.date.setHours(hour, minute, 0, 0);
      }

      $scope.appointments.push(appointment);
      updateIndex();
      $scope.appointment = newAppointment();
    };

    //edit an existing appointment
    $scope.editAppointment = function (appointment) {
      var i;
      $scope.appointment = $scope.appointments[appointment.index];
      $scope.appointment.date = new Date($scope.appointment.date);
      $scope.appointments.splice(appointment.index, 1);

      //recalculate our index
      // $scope.appointment.index = $scope.appointments.length;
      // for (i = 0; i < $scope.appointments.length; i++) {
      //   $scope.appointments[i].index = i;
      //   console.log(i+":"+$scope.appointments[i].index);
      // }
      updateIndex();
    };

    $scope.deleteAppointment = function (appointment) {
      $scope.appointments.splice(appointment.index, 1);
      updateIndex();
    };

    //Check to see if any existing appointments are late and update their status accordingly.
    $scope.updateStatus = function () {
      var date = new Date(),
        i = 0;
      for (i = 0; i < $scope.appointments.length; i++) {
        var currentDate = new Date($scope.appointments[i].date);
        if ((currentDate < date) && (($scope.appointments[i].status === 'dropoff') || ($scope.appointments[i].status === 'waiting'))) {
          $scope.appointments[i].status = 'warning';
        }
      }
    };

    //Run our updateStatus every five minutes
    $scope.intervalFunction = function () {
      $timeout(function () {
        $scope.updateStatus();
        $scope.intervalFunction();
      }, 1000 * 60 * 5);
    };  
    $scope.intervalFunction();
  }]);;angular.module('scheduler.filter', [])
  .filter('listByDate', function () {
    return function (objects, date) {
      var filtered_list = [], i = 0;
      for (i = 0; i < objects.length; i++) {
        var d = date.getDate(),
          m = date.getMonth(),
          itemDate = new Date(objects[i].date),
          itemMonth;
        itemMonth = itemDate.getMonth();
        itemDate = itemDate.getDate();
        if ((d === itemDate) && (m === itemMonth)) {
          filtered_list.push(objects[i]);
        }
      }
      return filtered_list;
    };
  });
;angular.module('scheduler.service', [])
  .factory('Statuses', function () {
    return [
      { name: 'Drop-off', value: 'dropoff' },
      { name: 'Waiting', value: 'waiting' },
      { name: 'Arrived', value: 'arrived' },
      { name: 'Late', value: 'warning' },
      { name: 'No Show', value: 'danger' },
      { name: 'Complete', value: 'success' },
      { name: 'In Progress', value: 'active' }
    ];
  })
  .factory('Time', function () {
    return {
      hours : [
        { hour: 8, name: '8' },
        { hour: 9, name: '9' },
        { hour: 10, name: '10' },
        { hour: 11, name: '11' },
        { hour: 12, name: '12' },
        { hour: 13, name: '1' },
        { hour: 14, name: '2' },
        { hour: 15, name: '3' },
        { hour: 16, name: '4' }
      ],
      minutes: [
        { minute: 0, name: '00' },
        { minute: 15, name: '15' },
        { minute: 30, name: '30' },
        { minute: 45, name: '45' }
      ]
    };
  })
  .factory('Hours', function () {
    return [
      { hour: 8, name: '8' },
      { hour: 9, name: '9' },
      { hour: 10, name: '10' },
      { hour: 11, name: '11' },
      { hour: 12, name: '12' },
      { hour: 13, name: '1' },
      { hour: 14, name: '2' },
      { hour: 15, name: '3' },
      { hour: 16, name: '4' }
    ];
  })
  .factory('Minutes', function () {
    return [
      { minute: 0, name: '00' },
      { minute: 15, name: '15' },
      { minute: 30, name: '30' },
      { minute: 45, name: '45' }
    ];
  });;angular.module('secretary.controller', [])
  .controller('PhoneCtrl', ['$scope', 'PhoneDirectory', 'angularFire',
    function ($scope, PhoneDirectory, angularFire) {
      var ref = new Firebase("https://hooptie.firebaseio.com/phoneList");
      $scope.phoneDirectory = [];
      angularFire(ref, $scope, "phoneDirectory");

      $scope.delPhone = function (index) {
        $scope.phoneDirectory.splice(index, 1);
      };
    }])
  .controller('TodoCtrl', ['$scope', 'angularFire',
    function ($scope, angularFire) {
      var ref = new Firebase("https://hooptie.firebaseio.com/todoList");
      $scope.todos = [];
      angularFire(ref, $scope, "todos");

      $scope.addTodo = function (task) {
        var todo = angular.copy(task);
        task.complete = false;
        $scope.todos.push(todo);
        $scope.newTodo = {};
      };

      $scope.updateTodo = function (index) {
      };

      $scope.delTodo = function (index) {
        $scope.todos.splice(index, 1);
      };
    }]);;angular.module('secretary.service', [])
  .factory('PhoneDirectory', function () {
    return [{
      name: "A&B AUTO PARTS",
      numbers: ["857-1224"]
    }, {
      name: "ACTION SALVAGE",
      numbers: ["800-232-4309"]
    }, {
      name: "ADJ",
      numbers: ["1-800-238-2723"]
    }, {
      name: "ATC",
      numbers: ["853-7333"]
    }, {
      name: "ALWAYS PARTS",
      numbers: ["545-3333", "558-3660"]
    }, {
      name: "ALLEN'S BAP",
      numbers: ["497-4545"]
    }, {
      name: "ARECT",
      numbers: ["622-6571"]
    }, {
      name: "AUTO PARTS INTERNATIONAL",
      numbers: ["855-0170"]
    }, {
      name: "AUTO ZONE",
      numbers: ["460-8744"]
    }, {
      name: "AUTO VALUE",
      numbers: ["497-3539"]
    }, {
      name: "AUTO SALVAGE",
      numbers: ["969-5893"]
    }, {
      name: "ANDY'S WHOLESALE",
      numbers: ["499-4178"]
    }, {
      name: "AMERICAN TIRE",
      numbers: ["855-0001"]
    }, {
      name: "AMERICAN TRANSMISSION",
      numbers: ["497-8500"]
    }, {
      name: "BAP GEON",
      numbers: ["440-0004"]
    }, {
      name: "BARRY'S PERFORMANCE",
      numbers: ["623-6568"]
    }, {
      name: "BAY CHEVROLET",
      numbers: ["855-2261 # 6"]
    }, {
      name: "BAY KIA",
      numbers: ["855-5555"]
    }, {
      name: "BAY TOWING",
      numbers: ["752-1050"]
    }, {
      name: "BEACH FORD",
      numbers: ["486-2717"]
    }, {
      name: "BEACH RADIATOR",
      numbers: ["437-7800"]
    }, {
      name: "BERT'S ALIGNMENT",
      numbers: ["499-2828"]
    }, {
      name: "B & G USED AUTO",
      numbers: ["488-4766"]
    }, {
      name: "BIG AL'S",
      numbers: ["671-7910"]
    }, {
      name: "BOWER'S HILL",
      numbers: ["488-8318"]
    }, {
      name: "BRIAN'S ELECTRICAL",
      numbers: ["575-4281"]
    }, {
      name: "BROOKS SALVAGE",
      numbers: ["800-552-6783"]
    }, {
      name: "BROWNING ALTERNATOR",
      numbers: ["460-1018"]
    }, {
      name: "BUCKY'S TRANSMISSION",
      numbers: ["499-5764"]
    }, {
      name: "BUG HOUSE (FRANK)",
      numbers: ["497-8080"]
    }, {
      name: "CRW",
      numbers: ["461-1360"]
    }, {
      name: "CARQUEST",
      numbers: ["552-0178"]
    }, {
      name: "CARROLLTON USED AUTO",
      numbers: ["238-8556"]
    }, {
      name: "CANNON'S CORVETTE",
      numbers: ["252-435-2212"]
    }, {
      name: "CHARLES BARKER LEXUS",
      numbers: ["486-3500"]
    }, {
      name: "CHARLES BARKER INFINITY",
      numbers: ["437-4014"]
    }, {
      name: "CHARLES BARKER NISSAN",
      numbers: ["284-3140"]
    }, {
      name: "CHARLES BARKER TOYOTA",
      numbers: ["437-4020"]
    }, {
      name: "CHECKERED FLAG",
      numbers: ["490-1111"]
    }, {
      name: "C F TOYOTA",
      numbers: ["687-3443"]
    }, {
      name: "C F HONDA",
      numbers: ["687-3453"]
    }, {
      name: "C F ISUZU",
      numbers: ["687-3463"]
    }, {
      name: "C F LANDROVER",
      numbers: ["490-1111"]
    }, {
      name: "C F VW",
      numbers: ["687-3465"]
    }, {
      name: "C F HYUNDAI",
      numbers: ["687-3463"]
    }, {
      name: "CHARLIE",
      numbers: ["858-0744"]
    }, {
      name: "CHESAPEAKE USED PARTS",
      numbers: ["488-4737"]
    }, {
      name: "CLAYTON'S USED PARTS",
      numbers: ["238-2886"]
    }, {
      name: "JOHN CLIFTON",
      numbers: ["291-2975"]
    }, {
      name: "COMPLETE AUTO PARTS",
      numbers: ["934-2868"]
    }, {
      name: "COLONIAL CADILLAC",
      numbers: ["455-4600"]
    }, {
      name: "COLONIAL CHEVROLET",
      numbers: ["455-4545"]
    }, {
      name: "CSERS",
      numbers: ["499-7643"]
    }, {
      name: "CYL HEAD FACTORY",
      numbers: ["465-5260"]
    }, {
      name: "CUNNINGHAM BROTHERS",
      numbers: ["800-553-7110"]
    }, {
      name: "DOUG'S ELECTRICAL",
      numbers: ["236-4781"]
    }, {
      name: "DOMESTIC LUBES",
      numbers: ["545-0143"]
    }, {
      name: "DOWNTOWN AUTO PARTS",
      numbers: ["627-4796"]
    }, {
      name: "DOMINOS",
      numbers: ["473-1120"]
    }, {
      name: "E & E",
      numbers: ["857-0838"]
    }, {
      name: "FACTORY PARTS",
      numbers: ["855-2241"]
    }, {
      name: "FIRESTONE",
      numbers: ["499-0501"]
    }, {
      name: "FIRST TEAM",
      numbers: ["420-5450 (MITSUBISHI )"]
    }, {
      name: "FREEDOM FORD",
      numbers: ["583-2331"]
    }, {
      name: "GLASSMASTERS",
      numbers: ["518-0123"]
    }, {
      name: "GREEN GIFFORD",
      numbers: ["855-2277"]
    }, {
      name: "GREENBRIAR DODGE",
      numbers: ["420-2800"]
    }, {
      name: "GREENBRIAR KIA",
      numbers: ["424-9659"]
    }, {
      name: "GREENBRIAR GMC",
      numbers: ["424-6380"]
    }, {
      name: "GREENBRIAR VW",
      numbers: ["366-0833"]
    }, {
      name: "GREGORY MACHINE",
      numbers: ["490-1606"]
    }, {
      name: "HALL ACURA",
      numbers: ["631-3063"]
    }, {
      name: "HALL CHRSYLER JEEP",
      numbers: ["598-2200", "498-2370"]
    }, {
      name: "HALL HYUNDAI",
      numbers: ["928-7203"]
    }, {
      name: "HALL MITSUBISHI",
      numbers: ["631-5581"]
    }, {
      name: "HALL NISSAN",
      numbers: ["631-7616"]
    }, {
      name: "HALL MAZDA",
      numbers: ["631-7003"]
    }, {
      name: "HALL SUZUKI",
      numbers: ["928-6000"]
    }, {
      name: "HEAD SHOP",
      numbers: ["631-2110"]
    }, {
      name: "HIGH LINK",
      numbers: ["558-0558"]
    }, {
      name: "HOUSE RIM & WHEELS",
      numbers: ["493-0338"]
    }, {
      name: "HUBCAP HEAVEN",
      numbers: ["473-9441"]
    }, {
      name: "HYDRA HOSE",
      numbers: ["497-8704"]
    }, {
      name: "INTERSTATE BATTERY",
      numbers: ["461-3722"]
    }, {
      name: "INGRAMS",
      numbers: ["543-3531", "855-4738"]
    }, {
      name: "JASPER",
      numbers: ["800-827-7455"]
    }, {
      name: "JPW",
      numbers: ["687-1616"]
    }, {
      name: "JOHNSON'S MUSTANG",
      numbers: ["545-8370"]
    }, {
      name: "KAR TRANSPORT",
      numbers: ["404-3007"]
    }, {
      name: "KEYSTONE",
      numbers: ["800-322-7795"]
    }, {
      name: "KIMNACH FORD",
      numbers: ["461-6401"]
    }, {
      name: "KING GEORGE AUTO",
      numbers: ["800-847-4547"]
    }, {
      name: "KRAMER TIRE",
      numbers: ["855-6234"]
    }, {
      name: "LITTLE JOE'S ISUZU",
      numbers: ["424-0774"]
    }, {
      name: "LKQ",
      numbers: ["488-0040", "465-6519", "805-2900(BILLY)"]
    }, {
      name: "LYNNHAVEN KIA",
      numbers: ["340-0800 #5"]
    }, {
      name: "LYNNHAVEN LINCOLN MERCURY",
      numbers: ["340-0665"]
    }, {
      name: "M & J MOTORS",
      numbers: ["596-1072"]
    }, {
      name: "McKINNY SALVAGE",
      numbers: ["393-9636", "539-1178"]
    }, {
      name: "METRO LOCK",
      numbers: ["455-5500"]
    }, {
      name: "METRO SALVAGE",
      numbers: ["337-4886"]
    }, {
      name: "MIKE MINER",
      numbers: ["235-4839", "430-1123", "888-821-0285"]
    }, {
      name: "MITCH'S MUFFLER",
      numbers: ["877-5738"]
    }, {
      name: "M & M AUTO SALVAGE",
      numbers: ["800-533-4099"]
    }, {
      name: "NORFOLK RECYCLERS",
      numbers: ["622-5391"]
    }, {
      name: "NORFOLK TIRE(HENRY)",
      numbers: ["858-8848"]
    }, {
      name: "OCEANA SALVAGE",
      numbers: ["425-7930"]
    }, {
      name: "O'MALLEYS",
      numbers: ["934-2897"]
    }, {
      name: "PEPBOYS",
      numbers: ["461-7459"]
    }, {
      name: "PERRY BUICK",
      numbers: ["461-1227"]
    }, {
      name: "PERRY SUBARU",
      numbers: ["965-8411"]
    }, {
      name: "PETES TOWING",
      numbers: ["461-5888"]
    }, {
      name: "PHILLIPS MERCEDES",
      numbers: ["499-3771"]
    }, {
      name: "PHILLIPS VOLVO",
      numbers: ["497-4864"]
    }, {
      name: "PHILLY STEAK",
      numbers: ["588-0602"]
    }, {
      name: "PICK& PULL",
      numbers: ["417-0380"]
    }, {
      name: "PIZZA HUT",
      numbers: ["857-6666"]
    }, {
      name: "PRICE'S TRANSMISSION",
      numbers: ["497-6644"]
    }, {
      name: "PRIORITY CHEVROLET",
      numbers: ["424-1811"]
    }, {
      name: "PRIORITY HYUNDAI",
      numbers: ["420-5450"]
    }, {
      name: "PRIORITY TOYOTA",
      numbers: ["366-5000"]
    }, {
      name: "PRIME",
      numbers: ["455-5900"]
    }, {
      name: "RIDDLE ACURA",
      numbers: ["523-1188"]
    }, {
      name: "ROSS AUTO PARTS",
      numbers: ["766-1116"]
    }, {
      name: "RUDY'S TRUCK & AUTO",
      numbers: ["488-4888"]
    }, {
      name: "SATURN OF VA.",
      numbers: ["422-2099"]
    }, {
      name: "SOUTHSIDE TRANSMISSION",
      numbers: ["456-0166( JOE )"]
    }, {
      name: "SPRINGMENDERS",
      numbers: ["459-4440"]
    }, {
      name: "SUFFOLK SALVAGE",
      numbers: ["934-1976"]
    }, {
      name: "SURFRIDER",
      numbers: ["461-6488"]
    }, {
      name: "TAYLOR LOCK",
      numbers: ["434-8397"]
    }, {
      name: "TECH PARTS",
      numbers: ["962-4647"]
    }, {
      name: "TIDEWATER AUTO ELECTRIC",
      numbers: ["499-3131"]
    }, {
      name: "TIDEWATER CORVETTE",
      numbers: ["595-1967"]
    }, {
      name: "TIDEWATER DRIVELINES",
      numbers: ["424-4450"]
    }, {
      name: "TIDEWATER FASTENERS",
      numbers: ["853-7638"]
    }, {
      name: "TIDEWATER MACHINE",
      numbers: ["855-5091", "FAX 855-5336"]
    }, {
      name: "TOTAL EXHAUST",
      numbers: ["397-1251"]
    }, {
      name: "TRANS STAR",
      numbers: ["853-1022"]
    }, {
      name: "TRIPLE DECKER",
      numbers: ["898-5662"]
    }, {
      name: "TUBB'S AUTO PARTS",
      numbers: ["545-8418"]
    }, {
      name: "VA. BEACH DODGE",
      numbers: ["463-6175", "502-8461"]
    }, {
      name: "VA.USED PARTS",
      numbers: ["539-0520"]
    }, {
      name: "UNDERPARTS WAREHOUSE",
      numbers: ["397-1251"]
    }, {
      name: "US 258 AUTO PARTS",
      numbers: ["238-2567"]
    }, {
      name: "WALT'S WATER WORKS",
      numbers: ["599-5360"]
    }, {
      name: "WHEEL RIM REPAIR",
      numbers: ["729-1737", "328-3446"]
    }];
  });
