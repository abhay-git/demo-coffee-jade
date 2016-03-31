var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    compass = require('gulp-compass'),
    jade = require('gulp-jade'),
    coffee = require('gulp-sass'),
    coffee = require('gulp-coffee');


var $ = require('gulp-load-plugins')();


gulp.task('scripts',function(){
	gulp.src(['app/js/**/*.js','!app/js/**/*min.js'])
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});


gulp.task('html',function(){
    gulp.src(['app/convert_application/jade/**/*.jade'])
    .pipe($.jade({pretty : true , doctype:'html'}))
    .on('error',$.util.log)
    .pipe(gulp.dest('app/application/template'));
});

gulp.task('js',function(){
   gulp.src(['app/convert_application/coffee/**/*.coffee'])
   .pipe($.coffee({bare:true}))
   .on('error',$.util.log)
   .pipe(gulp.dest('app/application/js'));
});


gulp.task('css',function(){
   gulp.src(['app/convert_application/scss/**/*.scss'])
   .pipe($.sass({style:'expanded'}))
   .pipe(gulp.dest('app/application/css'));
});


gulp.task('watch', function(){
   gulp.watch("app/convert_application/scss/**/*.scss",['css']);
   gulp.watch("app/convert_application/jade/**/*.jade",['html']);
   gulp.watch("app/convert_application/coffee/**/*.coffee",['js']);
});



gulp.task('default',['scripts','css','html','js','watch']);