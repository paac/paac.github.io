angular.module('secretary.controller', [])
//Phone List
    .controller('PhoneCtrl', ['$scope', 'PhoneDirectory',
        function($scope, PhoneDirectory) {
            $scope.phoneDirectory = PhoneDirectory;
        }
    ])
//To-do list
    .controller('TodoCtrl', ['$scope', 
        function($scope) {
            $scope.todos = (!localStorage.getItem('todos')) ? [] : JSON.parse(localStorage.getItem('todos'));
            $scope.addTodo = function(task) {
                todo = angular.copy(task);
                task.complete = false;
                $scope.todos.push(todo);
                $scope.newTodo = {};
                localStorage.setItem('todos', JSON.stringify($scope.todos));
            }
            $scope.updateTodo = function(index) {
                localStorage.setItem('todos', JSON.stringify($scope.todos));
            }
            $scope.delTodo = function(index) {
                $scope.todos.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify($scope.todos));
            }
        }
    ]);