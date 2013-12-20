angular.module('scheduler.filter', [])
  .filter('listByDate', function () {
    return function (objects, date) {
      var filtered_list = [], i = 0;
      for (i = 0; i < objects.length; i++) {
        var today = date.getDate(),
          month = date.getMonth(),
          itemDate = new Date(objects[i].date),
          itemMonth;
        itemMonth = itemDate.getMonth();
        itemDate = itemDate.getDate();
        if ((today === itemDate) && (month === itemMonth)) {
          filtered_list.push(objects[i]);
        }
      }
      return filtered_list;
    };
  });
