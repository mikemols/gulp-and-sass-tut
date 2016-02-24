var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var gulpsass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var browsersync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('my_project/assets/sass/i.scss')
    .pipe(sourcemaps.init())
      .pipe(gulpsass())
      .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('my_project/build/css'))
    .pipe(browsersync.stream());
});

gulp.task('js', function () {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    'my_project/assets/js/main.js'
  ])
  .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('my_project/build/js'))

});

gulp.task('watch', function () {
  gulp.watch('my_project/assets/sass/*.scss', ['sass']);
  gulp.watch('my_project/assets/js/*.js', ['js']);
});

gulp.task('default', ['sass', 'js', 'watch']);
