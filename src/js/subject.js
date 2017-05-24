
//电影详情页
angular.module('myMovie')
	.controller('subjectCtrl',['$scope','$stateParams','readJSON','getMovieInfo','getSeemMovie',function($scope,$stateParams,readJSON,getMovieInfo,getSeemMovie){
		$scope.id = $stateParams.subjectId;
		readJSON.query('movie').then(function(data){
			$scope.json = data;
			$scope.movie = getMovieInfo.info($scope.json,$scope.id);
			$scope.seemMovie = getSeemMovie.type($scope.json,$scope.movie);
		});
		
		readJSON.query('assess').then(function(data){
			$scope.assess = data;
		});
		
	}]);


//确定url所传参数的方法 getMovieInfo.info(json,id);
angular.module('myMovie')
	.factory('getMovieInfo',function(){
		return {
			info:function(json,id){
				var result = {};
				for(var i = 0; i < json.length; i++){
					if(json[i].id == id){
						result = json[i];
					}
				};
				return result;
			}
		}
	});


//选择同类型电影  json:需要遍历的数据  pre:当前id的电影数据
angular.module('myMovie')
	.factory('getSeemMovie',function(){
		return {
			type:function(json,pre){
				var result = [];
				//电影序号
				var num = 1;
				//遍历数据
				for(var i = 0;i<json.length;i++){
					var flag = false;
					for(var j = 0;j<pre.genres.length;j++){
						//比较类型 只要有一个类型相同并且与当前电影id不同 条件flag为true
						if(json[i].id != pre.id && json[i].genres.indexOf(pre.genres[j]) != -1){
							flag = true;
							break;
						}
					}
					//flag为true创建数据
					if(flag){
						var obj = {
							"id":json[i].id,
							"name":json[i].name,
							"number":num
						};
						result.push(obj);
						num++;
					}
				}
				return result;
			}
		}
	});


//将数组转成以斜线为分割的字符串
angular.module('myMovie')
	.filter('getStr',function(){
		return function(data){
			//防止报错(filter在数据加载前运行)
			if(data){
				var str = data.join(" / ");
				return str;
			}else{
				return true;
			}
		}
	});
