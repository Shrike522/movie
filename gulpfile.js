//合并所有js为hundle.js 

var gulp = require('gulp');
var concat = require('gulp-concat');//合并
var uglify = require('gulp-uglify');//压缩
var rename = require('gulp-rename');//重命名
var mincss = require('gulp-minify-css');//压缩css
var imagemin = require('gulp-imagemin');//压缩img


gulp.task('default',['concat','imgmin','copy'],function(){
	//监控js css
	gulp.watch(['./src/js/*.js','./src/css/*.css'],function(){
		gulp.run('concat');
	});
});

//合并
gulp.task('concat',function(){
	//合并压缩js
	gulp.src(['./src/lib/*.min.js','./src/js/*.js'])
	.pipe(concat('bundle.js'))
	.pipe(uglify())
	.pipe(rename('bundle.min.js'))
	.pipe(gulp.dest('./dist/js'));
	//压缩css
	gulp.src('./src/css/style.css')
	.pipe(mincss())
	.pipe(rename('style.min.js'))
	.pipe(gulp.dest('./dist/css'));
});

gulp.task('imgmin',function(){
	//压缩img
	gulp.src('./src/img/banner/*.jpg')
	.pipe(imagemin({
		progressive: true
	}))
	.pipe(gulp.dest('./dist/img/banner'));
	gulp.src('./src/img/movie_img/*.jpg')
	.pipe(imagemin({
		progressive: true
	}))
	.pipe(gulp.dest('./dist/img/movie_img'));
});

//复制文件
gulp.task('copy',function(){
	//复制index.html
	gulp.src('./src/index.html')
	.pipe(gulp.dest('./dist'));
	//复制ico
	gulp.src('./src/favicon.ico')
	.pipe(gulp.dest('./dist'));
	//复制各页面面板
	gulp.src('./src/views/*.html')
	.pipe(gulp.dest('./dist/views'));
	//复制临时数据
	gulp.src('./src/data/*.json')
	.pipe(gulp.dest('./dist/data'));
});
