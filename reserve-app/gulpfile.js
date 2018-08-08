'use strict'

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var sequence = require('gulp-sequence')

gulp.task('sass', function () {
  return gulp.src('./scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./public/css'));
});

// Watching SCSS files
gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass:watch']);

gulp.task('inject-main-js', function () {
  const target = gulp.src('../thymeleaf/templates/index.html');
  const sources = gulp.src('../resources/static/static/js/main.*.js');

  return target.pipe(inject(sources, { relative: false, addPrefix: '.', ignorePath: '../resources/static', addRootSlash: false }))
    .pipe(gulp.dest('../thymeleaf/templates/'));
});

gulp.task('inject-main-css', function () {
  const target = gulp.src('../thymeleaf/templates/index.html');
  const sources = gulp.src('../resources/static/static/css/main.*.css');

  return target.pipe(inject(sources, { relative: false, addPrefix: '.', ignorePath: '../resources/static', addRootSlash: false }))
    .pipe(gulp.dest('../thymeleaf/templates/'));
});

gulp.task('inject', sequence('inject-main-css', 'inject-main-js'));