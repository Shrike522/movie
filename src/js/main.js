angular.module('myMovie',['ui.router']);


//路由
angular.module('myMovie')
	.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('index',{
		url:'/',
		views:{
			'':{
				templateUrl:'views/first.html'
			},
			'header@index':{
				templateUrl:'views/header.html'
			},
			'footer@index':{
				templateUrl:'views/footer.html'
			},
			'main@index':{
				templateUrl:'views/home.html',
				controller:'homeCtrl'
			}
		}
	})
	.state('index.subject',{
		url:'subject/:subjectId',
		views:{
			'main@index':{
				templateUrl:'views/subject.html',
				controller:'subjectCtrl'
			}
		}
	})
	.state('login',{
		url:'/login',
		templateUrl:'views/login.html',
		controller:'loginCtrl'
	})
	.state('register',{
		url:'/register',
		templateUrl:'views/register.html',
		controller:'signUpCtrl'
	})
	$urlRouterProvider.otherwise('/');
}]);

//拿取数据
angular.module('myMovie')
	.factory('readJSON',['$http','$q',function($http,$q){
	return {
		query:function(file){//此处file为文件data目录下的文件名(不包含拓展名)
			var deferred = $q.defer();
			$http({
				method:'GET',
				url:'data/' + file + '.json',
				cache:true
			}).then(function(result){
				deferred.resolve(result.data);
			},function(err){
				deferred.reject(err.data);
			});
			return deferred.promise;
		}
	}
}]);

