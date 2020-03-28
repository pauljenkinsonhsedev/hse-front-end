var gulp = require('gulp');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const fs = require('fs');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
let cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var rename = require("gulp-rename");

/* WORKFLOW = src > build > www */

/* src: code here
/* build: view here
/* www: distribute here


/* PATHS */

var paths = {
  /* src */
  src: 'src/**/*',
  srcHTM: 'src/**/*.htm',
  srcCSS: 'src/**/*.css',
  srcCSSV4: 'src/assets/v4-css/**/*.css',
  srcCSSV5: 'src/assets/v5-css/**/*.css',
  srcJSV4: 'src/assets/v4-js/**/*.js',
  srcJSV5: 'src/assets/v5-js/**/*.js',
  srcIMAGESV4: 'src/assets/v4-images/**/*.{jpg,png,gif,svg}',
  srcIMAGESV5: 'src/assets/v5-images/**/*.{jpg,png,gif,svg}',
  srcJS: 'src/**/*.js',  
  /* build */
  build: 'build',
  buildCSSV4: 'build/assets/v4-css/',
  buildCSSV5: 'build/assets/v5-css/',
  buildJSV4: 'build/assets/v4-js/',
  buildJSV5: 'build/assets/v5-js/',
  buildJS: 'build/**/*.js', 
  buildIMAGESV4: 'build/assets/v4-images/', 
  buildIMAGESV5: 'build/assets/v5-images/', 
  /* www */
  www: 'www',
  wwwV4CSS: 'www/assets/v4-css/',
  wwwV5CSS: 'www/assets/v5-css/',
  wwwV4JS: 'www/assets/v4-js/',
  wwwV5JS: 'www/assets/v5-js/',
  wwwIMAGESV4: 'www/assets/v4-images/', 
  wwwIMAGESV5: 'www/assets/v5-images/',
};

/* -------------------------------------------------------------------------------------------------
SRC TO BUILD
-------------------------------------------------------------------------------------------------- */

// .htm

gulp.task('build-htm', function () {
  return gulp.src(paths.srcHTM).pipe(gulp.dest(paths.build));
});

// Images (V5) (jpg,png,gif)

gulp.task('build-imagesv5', function () {
  return gulp.src(paths.srcIMAGESV5).pipe(gulp.dest(paths.buildIMAGESV5));
});

// Images (V4) (jpg,png,gif)

gulp.task('build-imagesv4', function () {
  return gulp.src(paths.srcIMAGESV4).pipe(gulp.dest(paths.buildIMAGESV4));
});

// .css (V4)

gulp.task('build-cssv4', function () {
  return gulp.src(paths.srcCSSV4).pipe(gulp.dest(paths.buildCSSV4));
});

// .css (V5)

gulp.task('build-cssv5', function () {
  return gulp.src(paths.srcCSSV5).pipe(gulp.dest(paths.buildCSSV5));
});

// .js (V4)

gulp.task('build-jsv4', function () {
  return gulp.src(paths.srcJSV4).pipe(gulp.dest(paths.buildJSV4));
});

// .js (V5)

gulp.task('build-jsv5', function () {
  return gulp.src(paths.srcJSV5).pipe(gulp.dest(paths.buildJSV5));
});


// TASKS

// All 

gulp.task('build', gulp.series('build-htm', 'build-imagesv5', 'build-imagesv4', 'build-cssv4', 'build-cssv5', 'build-jsv4', 'build-jsv4', function (done) {
  done();
}));

// V4 

gulp.task('build-v4', gulp.series('build-imagesv4', 'build-cssv4', 'build-jsv4', 'build-jsv4', function (done) {
  done();
}));

// V5 

gulp.task('build-v5', gulp.series('build-imagesv5', 'build-cssv5', 'build-jsv5', 'build-jsv5', function (done) {
  done();
}));

// Concat V5 footer js files

gulp.task('build-footer-js', function () {    

  // Gets all V5 footer JS source files
  return gulp.src(['./src/assets/v5-js/slinky-ie11-fix.js','./src/assets/v5-js/google-custom-search.js','./src/assets/v5-js/js-offcanvas.pkgd.min.js','./src/assets/v5-js/js-offcanvas-trigger.js', './src/assets/v5-js/aria.js', './src/assets/v5-js/website-feedback.src.js', './src/assets/v5-js/content-page.js', './src/assets/v5-js/notification-bar.js', './src/assets/v5-js/top-tasks.js', './src/assets/v5-js/cookies-gtm.js'])
      // Concats js files to single V5 footer js file
      .pipe(concat('v5-footer.js'))
      // Renames files for dreamweaver template
      .pipe(rename("v5-footer.min.js"))
      .pipe(gulp.dest('build/assets/v5-js/'));
}); 

/* -------------------------------------------------------------------------------------------------
SRC TO WWW (Distribution)
-------------------------------------------------------------------------------------------------- */

// .htm

gulp.task('www-htm', function () {
  return gulp.src(paths.srcHTM).pipe(gulp.dest(paths.www));
});

// .css (V4)

gulp.task('www-cssv4', function () {
  return gulp.src(paths.srcCSSV4).pipe(gulp.dest(paths.wwwV4CSS));
});

// .css (V5)

gulp.task('www-cssv5', function () {
  return gulp.src(paths.srcCSSV5).pipe(gulp.dest(paths.wwwV5CSS));
});

// .js (V4)

gulp.task('www-jsv4', function () {
  return gulp.src(paths.srcJSV4).pipe(gulp.dest(paths.wwwV4JS));
});

// .js (V5)

gulp.task('www-jsv5', function () {
  return gulp.src(paths.srcJSV5).pipe(gulp.dest(paths.wwwV5JS));
});

// Images (V5) (jpg,png,gif)

gulp.task('www-imagesv5', function () {
  return gulp.src(paths.srcIMAGESV5).pipe(gulp.dest(paths.wwwIMAGESV5));
});

// Images (V4) (jpg,png,gif)

gulp.task('www-imagesv4', function () {
  return gulp.src(paths.srcIMAGESV4).pipe(gulp.dest(paths.wwwIMAGESV4));
});

// MINIFY

gulp.task('www-footer-js', function () {    
  return gulp.src(['./src/assets/v5-js/slinky-ie11-fix.js','./src/assets/v5-js/google-custom-search.js','./src/assets/v5-js/js-offcanvas.pkgd.min.js','./src/assets/v5-js/js-offcanvas-trigger.js', './src/assets/v5-js/aria.js', './src/assets/v5-js/website-feedback.src.js', './src/assets/v5-js/content-page.js', './src/assets/v5-js/notification-bar.js', './src/assets/v5-js/top-tasks.js', './src/assets/v5-js/cookies-gtm.js'])
      .pipe(concat('v5-footer.js'))
      .pipe(minify())
      .pipe(rename("v5-footer.min.js"))
      .pipe(gulp.dest('www/assets/v5-js/'));
}); 

// MULTI TASKS FOR WWW

// ALL

gulp.task('www', gulp.series('www-htm', 'www-cssv5', 'www-cssv4', 'www-jsv5', 'www-jsv4', 'www-imagesv4', 'www-imagesv5', function (done) {
  done();
}));

// V4 

gulp.task('www-v4', gulp.series('www-imagesv4', 'www-cssv4', 'www-jsv4', 'www-jsv4', function (done) {
  done();
}));

// V5 

gulp.task('www-v5', gulp.series('www-imagesv5', 'www-cssv5', 'www-jsv5', 'www-jsv5', 'www-footer-js', 'www-footer-js', function (done) {
  done();
}));

// SASS

gulp.task('sass', () => {
  return gulp
	  .src("src/assets/v5-css/scss/v5.scss")
      .pipe(sourcemaps.init())
  	  .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write('.'))
    /* Rename css file for DW template */
    .pipe(rename("v5.min.css"))
    /* Creates v5.min.css file in build foler */
    .pipe(gulp.dest("src/assets/v5-css/"))
});
           
gulp.task('minify-css',() => {
  return gulp.src('src/assets/v5-css/v5.min.css')
    .pipe(cleanCSS())
	.pipe(rename("v5.min.css"))
    .pipe(gulp.dest('www/assets/v5-css/v5.min/'));
});



/* -------------------------------------------------------------------------------------------------
LEFT NAV (Slinky)
-------------------------------------------------------------------------------------------------- */

gulp.task('footer-slinky-js', function () {    
  return gulp.src(['./src/assets/v5-js/slinky.min.js', './src/assets/v5-js/slinky-custom.js'])
    .pipe(concat('v5-footer-slinky-js.js'))
    .pipe(minify())
  .pipe(rename("v5-footer-slinky-js.min.js"))
    .pipe(gulp.dest('build/assets/v5-js/'));
});


/* -------------------------------------------------------------------------------------------------
BrowserSync
-------------------------------------------------------------------------------------------------- */

// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

  // Serve files from the root of this project
  browserSync.init({
     server: {
          baseDir: "./build/"
          },
          port: 8080,
          open: true,
          notify: false,
    startPath: "/index.htm"
  });

  // Watch for SCSS change
  gulp.watch('src/assets/v5-css/scss/*.scss', gulp.series('sass')).on("change", reload);
  
  // Watch for .htm change and copy src .css to build folder
  gulp.watch("*.htm").on("change", reload);
  gulp.task('sass');
  gulp.task('build-cssv5');
});



/* -------------------------------------------------------------------------------------------------
Utility Tasks
-------------------------------------------------------------------------------------------------- */
const onError = (err) => {
	gutil.beep();
};