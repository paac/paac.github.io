angular.module('secretary.controller', [])
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
    }]);