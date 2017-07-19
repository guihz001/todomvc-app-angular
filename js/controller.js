(function (angular) {
	angular
		.module("todoApp.controller", [])
		.controller("TodoCtrl", ['$scope', 'TodoSer', '$location', todoCtrlHandle])

	function todoCtrlHandle($scope, TodoSer, $location) {
		var todoList = TodoSer.getData();
		$scope.todoList = todoList;
		$scope.todoedit = {};
		$scope.isCheckedAll = false;
		//1.添加数据
		$scope.add = function () {
			if ($scope.taskName.trim() === '') return;
			TodoSer.add($scope.taskName)
			$scope.taskName = '';
			// TodoSer.saveData();
		}
		//2.删除数据
		$scope.del = function (index) {
			TodoSer.del(index);
			// TodoSer.saveData();
		}
		// 3.修改任务
		$scope.edit = function (index) {
			$scope.todoedit = $scope.todoList[index];
		}
		$scope.saveEdit = function (index) {
			if (todoList[index].name.trim() === '') TodoSer.del(index);
			// TodoSer.saveData();
			$scope.todoedit = {};
		}
		// 4.切换任务选中状态(单个或批量)
		$scope.selectAll = function () {
			TodoSer.selectAll($scope.isCheckedAll)
			// TodoSer.saveData();
		}
		// 5 清除已完成任务
		$scope.clearCompleted = function () {
			$scope.todoList = TodoSer.clearCompleted();
			// TodoSer.saveData();
		}
        $scope.isShow=TodoSer.isShow;
		// 6 显示未完成任务数
		$scope.undone = TodoSer.undone;
		$scope.location = $location;
		$scope.$watch("location.url()", function (newvalue) {
			switch (newvalue) {
				case '/':
					$scope.status = undefined;
					break;
				case '/active':
					$scope.status = true;
					break;
				case '/completed':
					$scope.status = false;
					break;
			}
		})


		$scope.$watch('todoList',function(newvalue){
		    $scope.isCheckedAll=TodoSer.selected(newvalue);
			TodoSer.saveData();

		},true)
	}
})(angular)
