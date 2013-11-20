angular.module('estimator.filter', [])
.filter('pagination', function () {
    return function(objects, scope) {
    	var filtered_list = [];

    	for (var i = 0; i < scope.pager.count; i++) {
    		if (objects[scope.pager.offset + i]) filtered_list.push(objects[scope.pager.offset + i]);
    	}
    	return filtered_list
    }
});