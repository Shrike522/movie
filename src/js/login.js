
//登陆控制器
angular.module('myMovie')
	.controller('loginCtrl',['$scope',function($scope){
		$scope.userData = {};
	}]);




//注册控制器
angular.module('myMovie')
	.controller('signUpCtrl',['$scope',function($scope){
		$scope.userInfo = {};
		$scope.submitForm = function(){
			if($scope.signUpForm.$invalid || !$scope.userInfo.checkText){
				console.log('信息有错误');
			}else{
				console.log($scope.userInfo);
			}
		}
	}]);


angular.module('myMovie')
	.directive('compare',function(){
		return {
			restrict:'EA',
			require:'ngModel',
			scope:{
				orgPwd:'=compare'
			},
			link:function(scope,element,attrs,con){
				con.$validators.compare = function(v){
					return v == scope.orgPwd;
				}
				scope.$watch('orgPwd',function(){
					con.$validate();
				});
			}
		}
	});

