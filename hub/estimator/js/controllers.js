angular.module('estimator.controllers', []).
	controller('EstimateCtrl', ['$scope', 'angularFire', function($scope, angularFire) {
		var ref = new Firebase("https://hooptie.firebaseio.com/estimator");
		$scope.parts = [];
		$scope.orders = [{"date":1381332715170,"name":"Crawford","parts":[{"costPrice":"425","dealer":false,"laborHours":"5.4","laborPrice":480.6,"manualLabor":false,"name":"Heater core","quantity":1,"salePriceTotal":786.25,"totalPrice":1266.85}],"total":1266.85},{"date":1381338753348,"name":"Storey","parts":[{"costPrice":"3.50","laborHours":1.3,"laborPrice":115.7,"manualLabor":true,"name":"Champion Plugs","quantity":"6","salePriceTotal":68.25,"totalPrice":183.95,"vendor":{"name":"Pep Boys"}},{"costPrice":"22","laborPrice":0,"name":"Spark plug wires","quantity":1,"salePriceTotal":49.5,"totalPrice":49.5,"vendor":{"name":"Pep Boys"}},{"costPrice":0,"laborHours":".5","laborPrice":44.5,"manualLabor":false,"name":"Diagnostics","quantity":1,"salePriceTotal":0,"totalPrice":44.5}],"total":277.95},{"date":1381344429878,"name":"Woodley","parts":[{"costPrice":"27","laborHours":"1.6","laborPrice":142.4,"name":"Wheel Bearing","quantity":1,"salePriceTotal":60.75,"totalPrice":203.15,"vendor":{"name":"Pep Boys"}}],"total":203.15},{"date":1381414147174,"name":"Washington","parts":[{"costPrice":"27.50","laborHours":"1","laborPrice":89,"name":"Rear rotors","quantity":"2","salePriceTotal":123.75,"totalPrice":212.75,"vendor":{"name":"Pep Boys"}},{"costPrice":"25","laborHours":0,"laborPrice":0,"manualLabor":true,"name":"Front pads","quantity":"1","salePriceTotal":56.25,"totalPrice":56.25,"vendor":{"name":"Pep Boys"}},{"costPrice":"25","laborHours":0,"laborPrice":0,"manualLabor":true,"name":"Rear pads","quantity":1,"salePriceTotal":56.25,"totalPrice":56.25,"vendor":{"name":"Pep Boys"}},{"costPrice":"32","laborHours":"1","laborPrice":89,"name":"Front rotors","quantity":"2","salePriceTotal":144,"totalPrice":233,"vendor":{"name":"Pep Boys"}}],"total":558.25},{"date":1381434392247,"name":"Chalk","parts":[{"costPrice":"38","laborHours":"2.2","laborPrice":195.8,"name":"Water pump","quantity":1,"salePriceTotal":85.5,"totalPrice":281.3,"vendor":{"name":"Pep Boys"}},{"costPrice":"5.99","laborPrice":0,"manualSale":true,"name":"Coolant","quantity":"3","salePrice":"12","salePriceTotal":36,"totalPrice":36}],"total":317.3},{"date":1381502114352,"name":"Thomas","parts":[{"costPrice":"3.39","laborHours":".5","laborPrice":44.5,"name":"Fuel filter","quantity":1,"salePriceTotal":11.0175,"totalPrice":55.5175,"vendor":{"name":"Quality"}},{"costPrice":0,"laborHours":0.5,"laborPrice":44.5,"manualLabor":true,"name":"Diagnosis","quantity":1,"salePriceTotal":0,"totalPrice":44.5},{"costPrice":0,"laborHours":0.7303370786516854,"laborPrice":65,"manualLabor":true,"name":"Towing","quantity":1,"salePriceTotal":0,"totalPrice":65},{"costPrice":"149","laborHours":"2","laborPrice":178,"name":"Fuel Pump - best case","quantity":1,"salePriceTotal":298,"totalPrice":476,"vendor":{"name":"Quality"}}],"total":641.0174999999999},{"date":1381779115727,"name":"Mwangi","parts":[{"costPrice":"8.90","laborHours":".6","laborPrice":53.4,"name":"Sway bar links","quantity":"2","salePriceTotal":44.5,"totalPrice":97.9,"vendor":{"name":"Bap Geon"}},{"costPrice":"62.81","dealer":true,"laborHours":".9","laborPrice":80.10000000000001,"name":"Wiper Switch","quantity":1,"salePriceTotal":114.31420000000001,"totalPrice":194.41420000000002,"vendor":{"dealer":true,"name":"Checkered Flag"}},{"costPrice":"83.62","dealer":true,"laborHours":"1","laborPrice":89,"name":"Seat belt receiver","quantity":1,"salePriceTotal":152.1884,"totalPrice":241.1884,"vendor":{"dealer":true,"name":"Checkered Flag"}}],"total":533.5026},{"date":1381925921354,"name":"DJ","parts":[{"costPrice":"125","laborHours":".8","laborPrice":71.2,"name":"alternator","quantity":"1","salePriceTotal":250,"totalPrice":321.2}],"total":321.2},{"date":1381939001038,"name":"Shaw","parts":[{"costPrice":"19","laborHours":"1","laborPrice":89,"name":"Front rotors","quantity":"2","salePriceTotal":85.5,"totalPrice":174.5,"vendor":{"name":"Pep Boys"}},{"costPrice":"2","laborHours":0.5056179775280899,"laborPrice":45,"manualLabor":true,"name":"Wheel stud and nut","quantity":"2","salePriceTotal":13,"totalPrice":58,"vendor":{"name":"Pep Boys"}}],"total":232.5},{"date":1381951580256,"name":"Swain","parts":[{"costPrice":"105","laborHours":"2","laborPrice":178,"name":"Steering column","quantity":1,"salePriceTotal":210,"totalPrice":388}],"total":388},{"date":1382013838427,"name":"Chappell","parts":[{"costPrice":"16.73","laborHours":"1.8","laborPrice":160.20000000000002,"name":"Wheel cylinders","quantity":"2","salePriceTotal":75.285,"totalPrice":235.485,"vendor":{"name":"Pep Boys"}}],"total":235.485},{"date":1382023640112,"name":"Malcomb","parts":[{"costPrice":"16.73","laborHours":".9","laborPrice":80.10000000000001,"name":"Power steering belt","quantity":"1","salePriceTotal":37.6425,"totalPrice":117.7425,"vendor":{"name":"Pep Boys"}},{"costPrice":"21.38","laborPrice":0,"name":"Alternator/AC Belt","quantity":1,"salePriceTotal":48.105,"totalPrice":48.105}],"total":165.8475},{"date":1382118357655,"name":"Maume","parts":[{"costPrice":"2","laborPrice":0,"name":"Spark","quantity":"4","salePriceTotal":26,"totalPrice":26},{"costPrice":"25","laborHours":"1","laborPrice":89,"name":"Spark plug wires","quantity":"1","salePriceTotal":56.25,"totalPrice":145.25,"vendor":{"name":"Pep Boys"}}],"total":171.25},{"date":1382193620102,"name":"Patterson","parts":[{"costPrice":0,"laborHours":"2","laborPrice":178,"name":"Front struts","quantity":1,"salePriceTotal":0,"totalPrice":178},{"costPrice":"110","laborHours":"1.1","laborPrice":97.9,"name":"Rear shocks","quantity":"2","salePriceTotal":440,"totalPrice":537.9,"vendor":{"name":"Pep Boys"}},{"costPrice":"65","laborHours":"1.6","laborPrice":142.4,"name":"Wheel bearing","quantity":"2","salePriceTotal":292.5,"totalPrice":434.9,"vendor":{"name":"Pep Boys"}}],"total":1150.8},{"date":1382536304981,"name":"Haley Williams","parts":[{"costPrice":"32","laborHours":"2.6","laborPrice":231.4,"name":"Inner Tie Rods","quantity":"2","salePriceTotal":144,"totalPrice":375.4,"vendor":{"name":"Pep Boys"}},{"costPrice":"2","laborPrice":0,"name":"Tie rod adjusting sleeves","quantity":"15","salePriceTotal":97.5,"totalPrice":97.5,"vendor":{"name":"Pep Boys"}},{"costPrice":0,"laborHours":0.7859550561797753,"laborPrice":69.95,"manualLabor":true,"name":"Front-end alignment","quantity":1,"salePriceTotal":0,"totalPrice":69.95}],"total":542.85},{"date":1382551424432,"name":"Ronald Booth","parts":[{"costPrice":"147.51","laborPrice":0,"name":"UNI\tGTZ A/S TIGER PAW","quantity":"2","salePrice":184.3875,"salePriceTotal":368.775,"tires":true,"totalPrice":368.775,"vendor":{"name":"American Tire","tires":true}},{"costPrice":"80","laborHours":"1.4","laborPrice":124.6,"name":"Front struts","quantity":"2","salePriceTotal":320,"totalPrice":444.6,"vendor":{"name":"Pep Boys"}},{"costPrice":"35","laborHours":"1.8","laborPrice":160.20000000000002,"name":"Rear struts","quantity":"2","salePriceTotal":157.5,"totalPrice":317.70000000000005,"vendor":{"name":"Pep Boys"}}],"total":1131.075},{"date":1382636396909,"name":"Anonymous","parts":[{"costPrice":"22","laborHours":"2.4","laborPrice":213.6,"name":"Timing belt","quantity":"1","salePriceTotal":49.5,"totalPrice":263.1,"vendor":{"name":"Pep Boys"}}],"total":263.1},{"date":1382800933253,"name":"Dillon","parts":[{"costPrice":"2.48","laborHours":".7","laborPrice":62.3,"name":"Thermostat","quantity":1,"salePriceTotal":8.06,"totalPrice":70.36,"vendor":{"name":"Prime"}},{"costPrice":"1.03","laborPrice":0,"name":"Gasket","quantity":1,"salePriceTotal":3.3475,"totalPrice":3.3475},{"costPrice":"12","laborPrice":0,"manualSale":true,"name":"Coolant","quantity":1,"salePrice":"12","salePriceTotal":12,"totalPrice":12},{"costPrice":0,"laborHours":0.6741573033707865,"laborPrice":60,"manualLabor":true,"name":"Back flush","quantity":1,"salePriceTotal":0,"totalPrice":60}],"total":145.70749999999998},{"date":1382801560211,"name":"Earl Smith","parts":[{"costPrice":"14.08","laborHours":"1","laborPrice":89,"name":"cooling sensoir","quantity":1,"salePriceTotal":31.68,"totalPrice":120.68},{"costPrice":0,"laborHours":0.16853932584269662,"laborPrice":15,"manualLabor":true,"name":"Adjust belts","quantity":1,"salePriceTotal":0,"totalPrice":15}],"total":135.68},{"date":1382966207657,"name":"wilkinson","parts":[{"costPrice":"40.74","laborHours":0.33707865168539325,"laborPrice":30,"manualLabor":true,"name":"Replace tires","quantity":"2","salePrice":50.925000000000004,"salePriceTotal":101.85000000000001,"tires":true,"totalPrice":131.85000000000002,"vendor":{"name":"American Tire","tires":true}},{"costPrice":"2.25","laborPrice":0,"manualSale":true,"name":"Wipers","quantity":"2","salePrice":"9","salePriceTotal":18,"totalPrice":18},{"costPrice":"5.36","laborHours":0.0898876404494382,"laborPrice":8,"manualLabor":true,"name":"Headlight bulb","quantity":"1","salePriceTotal":13.4,"totalPrice":21.4}],"total":171.25000000000003},{"date":1382966513386,"name":"Sam Kirby","parts":[{"costPrice":"95","laborHours":"3.6","laborPrice":320.40000000000003,"name":"front struts","quantity":"2","salePriceTotal":380,"totalPrice":700.4000000000001,"vendor":{"name":"Pep Boys"}},{"costPrice":"65","laborHours":"1","laborPrice":89,"name":"Rear shocks","quantity":"2","salePriceTotal":292.5,"totalPrice":381.5,"vendor":{"name":"Pep Boys"}}],"total":1081.9},{"date":1383077351784,"name":"Roberson","parts":[{"costPrice":"1.84","laborHours":"1.5","laborPrice":133.5,"name":"Plugs","quantity":"6","salePriceTotal":35.88,"totalPrice":169.38,"vendor":{"name":"Pep Boys"}},{"costPrice":"20.45","laborPrice":0,"name":"Wires","quantity":1,"salePriceTotal":46.012499999999996,"totalPrice":46.012499999999996,"vendor":{"name":"Pep Boys"}},{"costPrice":0,"laborHours":0.1797752808988764,"laborPrice":16,"manualLabor":true,"name":"State Inspection","quantity":1,"salePriceTotal":0,"totalPrice":16},{"costPrice":"24.56","dealer":true,"laborHours":".6","laborPrice":53.4,"name":"Fuel","quantity":1,"salePriceTotal":55.26,"totalPrice":108.66,"vendor":{"dealer":true,"name":"Southern"}}],"total":340.0525},{"date":1383077761061,"name":"Labidi","parts":[{"costPrice":"700","dealer":false,"laborHours":"5.2","laborPrice":462.8,"name":"window regulator","quantity":"2","salePriceTotal":2590,"totalPrice":3052.8},{"costPrice":"120","laborHours":"5.2","laborPrice":462.8,"name":"window regulator kit","quantity":"2","salePriceTotal":480,"totalPrice":942.8}],"total":3995.6000000000004},{"date":1383136230445,"name":"DeLaura","parts":[{"costPrice":"18","laborHours":0.6741573033707865,"laborPrice":60,"manualLabor":true,"name":"Front brake pads","quantity":1,"salePriceTotal":40.5,"totalPrice":100.5,"vendor":{"name":"Pep Boys"}},{"costPrice":"25","laborHours":0.6741573033707865,"laborPrice":60,"manualLabor":true,"name":"Front pads oe","quantity":1,"salePriceTotal":56.25,"totalPrice":116.25},{"costPrice":"30","laborHours":0.6741573033707865,"laborPrice":60,"manualLabor":true,"name":"front pads ceramic","quantity":1,"salePriceTotal":67.5,"totalPrice":127.5}],"total":344.25},{"date":1383149143958,"name":"Beasley","parts":[{"costPrice":0,"laborHours":1,"laborPrice":89,"manualLabor":true,"name":"Diagnosis","quantity":1,"salePriceTotal":0,"totalPrice":89},{"costPrice":"47.70","dealer":true,"laborHours":"1.6","laborPrice":142.4,"name":"Horn","quantity":"2","salePriceTotal":214.65,"totalPrice":357.05,"vendor":{"dealer":true,"name":"Perry"}},{"costPrice":"2.25","laborHours":0.06741573033707865,"laborPrice":6,"manualLabor":true,"manualSale":true,"name":"Left front turn signal bulb","quantity":"1","salePrice":"4.5","salePriceTotal":4.5,"totalPrice":10.5},{"costPrice":"21.95","laborHours":0.0898876404494382,"laborPrice":8,"manualLabor":true,"manualSale":true,"name":"Oil Change","quantity":1,"salePrice":"21.95","salePriceTotal":21.95,"totalPrice":29.95},{"costPrice":"91.52","laborHours":"1.3","laborPrice":115.7,"name":"Clockspring","quantity":1,"salePriceTotal":183.04,"totalPrice":298.74},{"costPrice":0,"laborHours":0.1797752808988764,"laborPrice":16,"manualLabor":true,"name":"State Inspection","quantity":1,"salePriceTotal":0,"totalPrice":16}],"total":801.24},{"date":1383242782648,"name":"Sanchez","parts":[{"costPrice":"68","laborHours":"2.3","laborPrice":204.7,"name":"Regulator","quantity":"1","salePriceTotal":153,"totalPrice":357.7,"vendor":{"name":"Pep Boys"}}],"total":357.7},{"date":1383247503280,"name":"fields","parts":[{"costPrice":"25","laborHours":0.6741573033707865,"laborPrice":60,"manualLabor":true,"name":"Front pads-oe","quantity":1,"salePriceTotal":56.25,"totalPrice":116.25},{"costPrice":"12","laborHours":0.2808988764044944,"laborPrice":25,"manualLabor":true,"name":"Brake hose","quantity":1,"salePriceTotal":27,"totalPrice":52}],"total":168.25},{"date":1383322975879,"name":"Duarte","parts":[{"costPrice":"8.75","laborHours":"1.8","laborPrice":160.20000000000002,"name":"Rear wheel cylinders","quantity":"2","salePriceTotal":43.75,"totalPrice":203.95000000000002,"vendor":{"name":"Pep Boys"}},{"costPrice":"18.59","laborHours":0.6741573033707865,"laborPrice":60,"manualLabor":true,"name":"Shoes","quantity":1,"salePriceTotal":41.8275,"totalPrice":101.8275,"vendor":{"name":"Pep Boys"}},{"costPrice":"1.70","laborPrice":0,"name":"Fluid","quantity":"1","salePrice":"4","salePriceTotal":5.5249999999999995,"totalPrice":5.5249999999999995,"vendor":{"name":"Pep Boys"}},{"costPrice":"39","laborHours":"1","laborPrice":89,"name":"Starter","quantity":"1","salePriceTotal":87.75,"totalPrice":176.75,"vendor":{"name":"Pep Boys"}}],"total":488.0525},{"date":1383334010738,"name":"Bray","parts":[{"costPrice":"140","laborHours":"2","laborPrice":178,"name":"Alternator","quantity":1,"salePriceTotal":280,"totalPrice":458,"vendor":{"name":"Pep Boys"}},{"costPrice":"43.76","dealer":true,"laborPrice":0,"name":"Idler pulley","quantity":"1","salePriceTotal":98.46,"totalPrice":98.46,"vendor":{"dealer":true,"name":"Perry"}},{"costPrice":"16.56","dealer":true,"laborPrice":0,"name":"Idler Pulley","quantity":"1","salePriceTotal":37.26,"totalPrice":37.26,"vendor":{"dealer":true,"name":"Perry"}}],"total":593.72},{"date":1383334049882,"name":"Harris","parts":[{"costPrice":"8.27","laborPrice":0,"name":"Mount #2","quantity":1,"salePriceTotal":20.674999999999997,"totalPrice":20.674999999999997},{"costPrice":"8.27","laborHours":"2","laborPrice":178,"name":"Mount #1","quantity":"1","salePriceTotal":20.674999999999997,"totalPrice":198.675}],"total":219.35000000000002},{"date":1383584844458,"name":"Stroman","parts":[{"costPrice":"25","laborHours":"1","laborPrice":89,"name":"Rear brake pads","quantity":1,"salePriceTotal":56.25,"totalPrice":145.25,"vendor":{"name":"Pep Boys"}},{"costPrice":"20","laborPrice":0,"name":"Rotors","quantity":"2","salePriceTotal":90,"totalPrice":90,"vendor":{"name":"Pep Boys"}}],"total":235.25},{"date":1383603059100,"name":"Moses","parts":[{"costPrice":"24","laborPrice":0,"manualSale":true,"name":"Flush kit","quantity":1,"salePrice":"24","salePriceTotal":24,"totalPrice":24},{"costPrice":"12","laborPrice":0,"manualSale":true,"name":"Coolant","quantity":"2","salePrice":"12","salePriceTotal":24,"totalPrice":24},{"costPrice":"90","laborHours":"1.5","laborPrice":133.5,"name":"Radiator","quantity":1,"salePriceTotal":180,"totalPrice":313.5,"vendor":{"name":"Pep Boys"}},{"costPrice":"9.5","laborPrice":0,"name":"Lower radiator hose","quantity":1,"salePriceTotal":23.75,"totalPrice":23.75},{"costPrice":"13.50","laborHours":".7","laborPrice":62.3,"name":"power steering belt","quantity":1,"salePriceTotal":30.375,"totalPrice":92.675,"vendor":{"name":"Pep Boys"}},{"costPrice":0,"laborHours":0.39325842696629215,"laborPrice":35,"manualLabor":true,"name":"Coolant flush","quantity":1,"salePriceTotal":0,"totalPrice":35},{"costPrice":"2","laborPrice":0,"name":"clamps","quantity":"2","salePriceTotal":13,"totalPrice":13}],"total":525.925},{"date":1383766566864,"name":"smack","parts":[{"costPrice":"100","laborHours":".6","laborPrice":53.4,"name":"Alternator","quantity":1,"salePriceTotal":200,"totalPrice":253.4,"vendor":{"name":"Pep Boys"}},{"costPrice":"9","laborPrice":0,"manualSale":true,"name":"Wiper blade","quantity":1,"salePrice":"9","salePriceTotal":9,"totalPrice":9},{"costPrice":0,"laborHours":0.1797752808988764,"laborPrice":16,"manualLabor":true,"name":"SI","quantity":1,"salePriceTotal":0,"totalPrice":16},{"costPrice":0,"laborHours":0.33651685393258424,"laborPrice":29.95,"manualLabor":true,"name":"Oil & Filter Service","quantity":1,"salePriceTotal":0,"totalPrice":29.95}],"total":308.34999999999997},{"date":1383770978924,"name":"Robin Brown","parts":[{"costPrice":"92.20","laborHours":0.16853932584269662,"laborPrice":15,"manualLabor":true,"name":"Uniroyal Tiger Paw","quantity":1,"salePrice":115.25,"salePriceTotal":115.25,"tires":true,"totalPrice":130.25,"vendor":{"name":"American Tire","tires":true}},{"costPrice":"20","laborHours":".9","laborPrice":80.10000000000001,"name":"Right outer tie rod","quantity":"1","salePriceTotal":45,"totalPrice":125.10000000000001,"vendor":{"name":"Pep Boys"}}],"total":255.35000000000002},{"date":1383857970426,"name":"Mimi #2","parts":[{"costPrice":0,"laborHours":0.6741573033707865,"laborPrice":60,"manualLabor":true,"name":"Evac and recharge","quantity":1,"salePriceTotal":0,"totalPrice":60},{"costPrice":"12.50","laborPrice":0,"manualSale":true,"name":"Freon","quantity":"2","salePrice":"12.50","salePriceTotal":25,"totalPrice":25},{"costPrice":"2.5","laborPrice":0,"manualSale":true,"name":"AC Oil dye","quantity":"1","salePrice":"2.5","salePriceTotal":2.5,"totalPrice":2.5},{"costPrice":"166.98","laborPrice":0,"name":"Alternator","quantity":1,"salePriceTotal":308.913,"totalPrice":308.913,"vendor":{"name":"Quality"}},{"costPrice":"228","laborHours":"1.8","laborPrice":160.20000000000002,"name":"AC Compressor","quantity":1,"salePriceTotal":421.8,"totalPrice":582,"vendor":{"name":"Quality"}},{"costPrice":"13.14","laborHours":"1.1","laborPrice":97.9,"name":"Oil Pan gasket","quantity":1,"salePriceTotal":29.565,"totalPrice":127.465,"vendor":{"name":"Pep Boys"}},{"costPrice":"25","laborPrice":0,"name":"Drive Belt","quantity":1,"salePriceTotal":56.25,"totalPrice":56.25,"vendor":{"name":"Pep Boys"}}],"total":1162.128},{"date":1383859346581,"name":"Graham","parts":[{"costPrice":"125","laborHours":"1","laborPrice":89,"name":"AC Compressor - remanufactured","quantity":1,"salePriceTotal":250,"totalPrice":339,"vendor":{"name":"Pep Boys"}},{"costPrice":0,"laborHours":0.6741573033707865,"laborPrice":60,"manualLabor":true,"name":"Evac and recharge","quantity":1,"salePriceTotal":0,"totalPrice":60},{"costPrice":"12.50","laborPrice":0,"manualSale":true,"name":"Freon","quantity":"2","salePrice":"12.50","salePriceTotal":25,"totalPrice":25},{"costPrice":"2.50","laborPrice":0,"manualSale":true,"name":"AC Oil Dye","quantity":1,"salePrice":"2.5","salePriceTotal":2.5,"totalPrice":2.5}],"total":426.5},{"date":1383859720118,"name":"Young","parts":[{"costPrice":"84.98","laborHours":0.6741573033707865,"laborPrice":60,"manualLabor":true,"name":"Prec Trac II","quantity":"4","salePrice":106.22500000000001,"salePriceTotal":424.90000000000003,"tires":true,"totalPrice":484.90000000000003,"vendor":{"name":"American Tire","tires":true}},{"costPrice":0,"laborHours":0.7859550561797753,"laborPrice":69.95,"manualLabor":true,"name":"Alignment","quantity":1,"salePriceTotal":0,"totalPrice":69.95},{"costPrice":0,"laborHours":".5","laborPrice":44.5,"name":"Left marker light","quantity":1,"salePriceTotal":0,"totalPrice":44.5},{"costPrice":"9","laborHours":".5","laborPrice":44.5,"name":"Upper radiator hose","quantity":1,"salePriceTotal":22.5,"totalPrice":67}],"total":666.35}];
		angularFire(ref, $scope, "orders");
		$scope.predicate = "-date";
		$scope.vendors = [
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
		
		$scope.optionSelected = function(item) {
			item.dealer = item.vendor.dealer;
			item.manualSale = item.vendor.manualSale;
			item.tires = item.vendor.tires;
		}

		$scope.addToParts = function(item) {
			part = {};
			part = item;

			part.costPrice =  (!item.costPrice) ? 0 : item.costPrice;
			part.quantity = (!item.quantity) ? 1 : item.quantity;
			if (!part.manualLabor) {
				part.laborPrice = (!part.laborHours) ? 0 : parseFloat(part.laborHours) * 89;
			} else {
				part.laborPrice = ((part.laborPrice) && (part.laborPrice != 0)) ? parseFloat(part.laborPrice) : 0;
				part.laborHours = (part.laborPrice != 0) ? part.laborPrice / 89 : 0;
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
			$scope.parts.push(part);
			$scope.item = {};
			totalOrder();
		};
		$scope.deleteOrder = function(idx) {
			$scope.orders.splice($scope.orders.length - idx - 1, 1);
		}
		$scope.editOrder = function(idx) {
			orders = $scope.orders;
			reversedIndex = orders.length - idx - 1;
			$scope.reversedIndex = reversedIndex;
			$scope.parts = orders[reversedIndex].parts;
			$scope.parts.name = orders[reversedIndex].name;
			
			// localStorage.setItem('history', JSON.stringify($scope.orders));
			totalOrder();
		}

		$scope.addToHistory = function(parts) {
			if ($scope.reversedIndex) $scope.orders.splice($scope.reversedIndex, 1);
			$scope.reversedIndex = undefined;
			order = {};
			order.name = parts.name;
			order.date = Date.now();
			order.total = parts.total;
			order.parts = parts;
			$scope.orders.push(order);
			$scope.parts = [];
			// localStorage.setItem('history', JSON.stringify($scope.orders));
		};
	}]);