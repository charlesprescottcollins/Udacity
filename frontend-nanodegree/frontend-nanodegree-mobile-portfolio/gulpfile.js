var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var inlinesource = require('gulp-inline-source');
var minifyhtml = require('gulp-minify-html');
var uncss = require('gulp-uncss');
var del = require('del');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');



// build a fresh dist directory
gulp.task('clean', function(cb) {
  del(['./dist'], cb);
});

// PROFILE
//
//
// tasks for the profile page
gulp.task('build-profile',
  ['minify-profile-images',
  'profile-css',
  'profile-js',
  'process-profile-html']
);
// minify profile images and move to dist
gulp.task('minify-profile-images', ['clean'], function() {
  return gulp.src(['./src/img/**/*.png', './src/img/**/*.jpg'])
    .pipe(imagemin({
      progressive: true,
    }))
    .pipe(gulp.dest('./dist/img/'));
});

// remove unused profile css and minify
gulp.task('profile-css', ['clean'], function() {
  return gulp.src('./src/css/*.css')
    .pipe(uncss({ html: './src/index.html'}))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'));
});


// minify js
gulp.task('profile-js', ['clean'], function(){
  return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

// optimize profile html
gulp.task('process-profile-html', ['clean'], function() {
  return gulp.src('./src/index.html')
    // inline flagged css and js <link> and <script> references
    .pipe(inlinesource({compress: true}))
    // minify html
    .pipe(minifyhtml())
    .pipe(gulp.dest('./dist/'));
});


// PIZZA
//
//
// tasks for the pizza page
gulp.task('build-pizza',
  ['pizza-images',
  'pizza-css',
  'pizza-js',
  'process-pizza-html']
);
// minify profile images and move to dist
gulp.task('pizza-images', ['clean', 'minify-profile-images'], function() {
  return gulp.src(['./src/views/images/**/*.jpg', './src/views/images/*.png'])
  // gulp-imagemin / imagemin-jpegtran doesn't like pizzeria.jpg - potential bug
  // just copy the files for now
    // .pipe(imagemin({
    //   progressive: true,
    // }))
    .pipe(gulp.dest('./dist/views/images/'));
});

// remove unused profile css and minify
gulp.task('pizza-css', ['clean'], function() {
  return gulp.src('./src/views/css/**/*.css')
    //.pipe(uncss({ html: './src/views/pizzeria.html'}))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/views/css/'));
});

// minify js
gulp.task('pizza-js', ['clean'], function(){
  return gulp.src('./src/views/js/**/*.js')
    .pipe(gulp.dest('./dist/views/js/'));
});

// optimize profile html
gulp.task('process-pizza-html', ['clean'], function() {
  return gulp.src('./src/views/pizza.html')
    // minify html
    .pipe(minifyhtml())
    .pipe(gulp.dest('./dist/views/'));
});

//runs all builds
gulp.task('build', ['build-profile', 'build-pizza']);
gulp.task('default', ['build']);

// watch for changes, inefficient since it runs the entire build
gulp.task('watch', ['build'], function() {
  gulp.watch('./src/views/js/**/*.js', ['build']);
});
