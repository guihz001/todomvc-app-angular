(function (angular) {
	'use strict';




	// 9 根据URL变化显示相应任务
	// 11 使用服务抽象数据模型管理
	// 12 使用路由完成不同任务的切换
	angular
		.module("todoApp.service", [])
		.service("TodoSer", ["$window", function ($window) {
			//1. 获取数据
			var localStorage = $window.localStorage;
			var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
			this.getData = function () {
				return todoList;
			}
			//2.保存数据
			this.saveData = function () {
				localStorage.setItem('todoList', JSON.stringify(todoList));
			}
			//3.添加数据
			this.add = function (todoName) {
				todoList.push({
					name: todoName,
					isCompleted: false
				})
			}
			//4. 删除一条任务
			this.del = function (index) {
				todoList.splice(index, 1);
			}
			// 5 切换任务选中状态(单个或批量)
			this.selectAll = function (isChecked) {
				todoList.forEach(function (v) {
					v.isCompleted = isChecked;
				})
			}
			// 单选来确定是否全选
			this.selected = function (todoList) {
				return	todoList.length==0?false: todoList.every(function (v) {
					return v.isCompleted;
				})
			}
			// 6 清除已完成任务
			this.clearCompleted = function () {
				return todoList = todoList.filter(function (v) {
					return !v.isCompleted;
				})
			}
            this.isShow=function(){
                return todoList.some(function(v){
                    return v.isCompleted;
                })
            }
			// 7 显示未完成任务数
			this.undone = function () {
				var count = 0;
				todoList.forEach(function (v) {
					if (!v.isCompleted) {
						count++;
					}
				})
				return count;
			}
			// 8 显示不同状态的任务
			//     以及当前任务高亮处理

		}])

})(angular)
