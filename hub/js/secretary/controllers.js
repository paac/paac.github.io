angular.module('secretary.controller', [])
    .controller('PhoneCtrl', ['$scope', 'PhoneDirectory',
        function($scope, PhoneDirectory) {
            
            var ref = new Firebase("https://hooptie.firebaseio.com/phoneList");
            angularFire(ref, $scope, "phoneDirectory");
            $scope.phoneDirectory = PhoneDirectory;
        }
    ])
    .controller('TodoCtrl', ['$scope', 'angularFire',
        function($scope, angularFire) {
            var ref = new Firebase("https://hooptie.firebaseio.com/todoList");
            $scope.todos = [];
            angularFire(ref, $scope, "todos");
            
            $scope.addTodo = function(task) {
                todo = angular.copy(task);
                task.complete = false;
                $scope.todos.push(todo);
                $scope.newTodo = {};
            };
            $scope.updateTodo = function(index) {
            };
            $scope.delTodo = function(index) {
                $scope.todos.splice(index, 1);
            };
        }
    ]);