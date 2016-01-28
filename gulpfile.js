// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-cssnano');

// JS hint task
gulp.task('jshint', function() {
  gulp.src(['./src/js/*.js', './src/views/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/img/**/*',
      imgSrcViews = './src/views/images/**/*',
      imgDst = './dist/img',
      imgDstViews = './dist/views/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));

  gulp.src(imgSrcViews)
    .pipe(changed(imgDstViews))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDstViews));
});

// JS strip debugging and minify
gulp.task('scripts', function() {
  gulp.src('./src/js/*.js')
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));

  gulp.src('./src/views/js/*.js')
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/views/js/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./src/css/*.css'])
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'));

  gulp.src(['./src/views/css/*.css'])
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/views/css/'));
});

//minify new or changed HTML pages
gulp.task('htmlpage', function() {
  gulp.src('./src/*.html')
    .pipe(changed('./dist'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
  gulp.src('src/views/*.html')
    .pipe(changed('dist/views'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/views'));
});

// default gulp task
gulp.task('default', ['imagemin', 'scripts', 'styles', 'htmlpage'], function() {
});