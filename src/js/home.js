
//首页
angular.module('myMovie')
	.controller('homeCtrl',['$scope','readJSON',function($scope,readJSON){
		//选电影数据
		readJSON.query('movie').then(function(data){
			$scope.data = data;
		});
		//点击选择类型
		$scope.movieType = function(str){
			$scope.listType = str;
		}
		//电影排行榜数据
		readJSON.query('movie_list').then(function(data){
			$scope.ranks = data;
		});
		
	}]);


//轮播图指令
angular.module('myMovie')
	.directive('myBanner',['$interval','$timeout','readJSON',function($interval,$timeout,readJSON){
	return {
		restrict:'EA',
		templateUrl:'views/banner.html',
		scope:{},
		link:function(scope,element,attrs){
			var promise = readJSON.query('banner');
			var step = 0;
			promise.then(function(data){
				scope.images = data;
			});
			//渐近渐隐方法
			function timer(){
				if(step>=4){
					step=0;
				}else{
					step++;
				}
				element.find('ul').find('li').eq(step).fadeIn(800).siblings().fadeOut(800);
				element.find('ol').find('li').eq(step).addClass('active').siblings().removeClass('active');
			}
			$timeout(function(){
				element.find('ol').find('li').eq(0).addClass('active');
			},200);
			//每3s进行轮转 调用timer
			var turn = $interval(timer,3000);
			//为点击页码进行页面跳转绑定事件
			element.find('ol').on('click','li',function(){
				$interval.cancel(turn);
				step = $(this).index();
				element.find('ul').find('li').eq(step).fadeIn(800).siblings().fadeOut(800);
				element.find('ol').find('li').eq(step).addClass('active').siblings().removeClass('active');
				//重新调用
				turn = $interval(timer,3000);
			});
		}
	}
}]);

//选电影 按电影种类筛选  data | mtyep:{{list}}
angular.module('myMovie')
	.filter('mtype',function(){
		return function(data,type){
			if(!type){
				return data;
			}else{
				var arr = [];
				for(var i = 0;i<data.length;i++){
					var genres = data[i].genres;
					if(genres.indexOf(type) != -1){
						arr.push(data[i]);
					}
				}
				return arr;
			}
		}
	});
