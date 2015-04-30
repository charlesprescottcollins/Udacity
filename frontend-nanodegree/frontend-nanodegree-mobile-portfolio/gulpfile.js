var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var inlinesource = require('gulp-inline-source');
var minifyhtml = require('gulp-minify-html');
var uncss = require('gulp-uncss');
var del = require('del');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');

// tasks for the profile page
gulp.task('build-profile',
  ['clean',
  'minify-profile-images',
  'profile-css',
  'profile-js',
  'process-profile-html']
);

// build a fresh dist directory
gulp.task('clean', function(cb) {
  del(['./dist'], cb);
});

// minify profile images and move to dist
gulp.task('minify-profile-images', function() {
  return gulp.src('src/img/*')
    .pipe(imagemin({
      progressive: true,
    }))
    .pipe(gulp.dest('./dist/img/'));
});

// remove unused profile css and minify
gulp.task('profile-css', function() {
  return gulp.src('./src/css/*.css')
    .pipe(uncss({ html: './src/index.html'}))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'));
});

// minify js
gulp.task('profile-js', function(){
  return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

// optimize profile html
gulp.task('process-profile-html', function() {
  return gulp.src('./src/index.html')
    // inline flagged css and js <link> and <script> references
    .pipe(inlinesource({compress: true}))
    // minify html
    .pipe(minifyhtml())
    .pipe(gulp.dest('./dist/'));
});
