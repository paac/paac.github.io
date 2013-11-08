angular.module('scheduler.filter', [])
	.filter('listByDate',  function() {
		return function (objects, date) {
    		var filtered_list = [];
    		for (var i = 0; i < objects.length; i++) {
      			var d = date.getDate();
            
            var itemDate = new Date(objects[i].date);
            itemDate = itemDate.getDate();
      			if (d === itemDate) {
        			filtered_list.push(objects[i]);
      			}
    		}
    		return filtered_list;

  		}
	});