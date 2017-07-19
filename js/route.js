(function (angular) {
	'use strict';
	angular
		.module("todoApp.route", [])
		.config(["$routeProvider", function ($routeProvider) {
            $routeProvider
            .when('/',{
                templateUrl:'../index.html',
				
            })
			.when('/completed',{
				templateUrl:'../index.html',
				
			})
			.when('/active',{
				templateUrl:'../index.html',
				
			})
		}])
})(angular)
