angular.module('scheduler.filter', [])
  .filter('listByDate', function () {
    return function (objects, date) {
      var filtered_list = [], i = 0;
      for (i = 0; i < objects.length; i++) {
        var d = date.getDate(),
          itemDate = new Date(objects[i].date);
        itemDate = itemDate.getDate();
        if (d === itemDate) {
          filtered_list.push(objects[i]);
        }
      }
      return filtered_list;
    };
  });
