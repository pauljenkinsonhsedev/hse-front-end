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
let cleanCSS = require('gulp-clean-css'); // Minify CSS
var minify = require('gulp-minify');
var rename = require("gulp-rename");

/* WORKFLOW = src > build > secureroot */

/* src: code here
/* build: view here
/* secureroot: distribute here


/* PATHS */

var paths = {
  /* src */
  src: 'src/**/*',
  srcHTM: 'src/**/*.htm',
  srcCSS: 'src/**/*.css',
  srcCSSV4: 'src/assets/v4-css/**/*.css',
  srcCSSV5: ['src/assets/v5-css/**/*.css', '!src/assets/v5-css/scss/**/*'],
  srcJSV4: 'src/assets/v4-js/**/*.js',
  srcJSV5: ['src/assets/v5-js/jquery.min.js','src/assets/v5-js/v5-footer.min.js', 'src/assets/v5-js/v5-hse-primary.min.js', 'src/assets/v5-js/gtm.js', 'src/assets/v5-js/v5-footer-slinky-js.min.js', 'src/assets/v5-js/cookie-preferences.js', 'src/assets/v5-js/js-main-menu.js' ],
  srcIMAGESV4: 'src/assets/v4-images/**/*.{jpg,png,gif,svg}',
  srcIMAGESV4HOMEPAGE: 'src/assets/v4-homepage/**/*.{jpg,png,gif,svg}',
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
  buildIMAGESV4HOMEPAGE: 'build/assets/v4-homepage/',
  buildIMAGESV5: 'build/assets/v5-images/', 
  /* secureroot */
  secureroot: 'secureroot',
  securerootV4CSS: 'secureroot/assets/v4-css/',
  securerootV5CSS: 'secureroot/assets/v5-css/',
  securerootV4JS: 'secureroot/assets/v4-js/',
  securerootV5JS: 'secureroot/assets/v5-js/',
  securerootIMAGESV4: 'secureroot/assets/v4-images/', 
  securerootIMAGESV5: 'secureroot/assets/v5-images/',
};

/* -------------------------------------------------------------------------------------------------
SRC TO BUILD
-------------------------------------------------------------------------------------------------- */

// .htm

gulp.task('build-htm', function () {
  return gulp.src(paths.srcHTM).pipe(gulp.dest(paths.build));
});

// Images (V5) (jpg,png,gif,svg)

gulp.task('build-imagesv5', function () {
  return gulp.src(paths.srcIMAGESV5).pipe(gulp.dest(paths.buildIMAGESV5));
});

// Images (V4) (jpg,png,gif,svg)

gulp.task('build-imagesv4', function () {
  return gulp.src(paths.srcIMAGESV4).pipe(gulp.dest(paths.buildIMAGESV4));
});

// Images (V4 homepage) (jpg,png,gif,svg)

gulp.task('build-imagesv4homepage', function () {
  return gulp.src(paths.srcIMAGESV4HOMEPAGE).pipe(gulp.dest(paths.buildIMAGESV4HOMEPAGE));
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

// Concat V5 footer js files

gulp.task('footer-js', function () {    

  // Gets all V5 footer JS source files
  return gulp.src(['./src/assets/v5-js/google-custom-search.js', './src/assets/v5-js/base64-poly.js', 'src/assets/v5-js/js-cookie.js', './src/assets/v5-js/js-main-menu.js','./src/assets/v5-js/v5-hse-primary.min.js','./src/assets/v5-js/slinky-ie11-fix.js', './src/assets/v5-js/aria.js', './src/assets/v5-js/website-feedback.src.js', './src/assets/v5-js/content-page.js', './src/assets/v5-js/notification-bar.js', './src/assets/v5-js/top-tasks.js'])
      // Concats js files to single V5 footer js file
      .pipe(concat('v5-footer.js'))
      // Renames files for dreamweaver template
      .pipe(rename("v5-footer.min.js"))
      .pipe(gulp.dest('src/assets/v5-js/'));
}); 


// TASKS

// All 

gulp.task('build', gulp.series('build-htm', 'build-imagesv5', 'build-imagesv4', 'build-imagesv4homepage', 'build-cssv4', 'build-cssv5', 'build-jsv4', 'build-jsv5', function (done) {
  done();
}));

// V4 

gulp.task('build-v4', gulp.series('build-imagesv4', 'build-cssv4', 'build-jsv4',  function (done) {
  done();
}));

// V5 

gulp.task('build-v5', gulp.series('build-imagesv5', 'build-cssv5', 'build-jsv5',  function (done) {
  done();
}));

/* -------------------------------------------------------------------------------------------------
SRC TO secureroot (Distribution)
-------------------------------------------------------------------------------------------------- */

// .htm

gulp.task('secureroot-htm', function () {
  return gulp.src(paths.srcHTM).pipe(gulp.dest(paths.secureroot));
});

// .css (V4)

gulp.task('secureroot-cssv4', function () {
  return gulp.src(paths.srcCSSV4).pipe(gulp.dest(paths.securerootV4CSS));
});

// .css (V5)

gulp.task('secureroot-cssv5', function () {
  return gulp.src(paths.srcCSSV5).pipe(gulp.dest(paths.securerootV5CSS));
});

// .js (V4)

gulp.task('secureroot-jsv4', function () {
  return gulp.src(paths.srcJSV4).pipe(gulp.dest(paths.securerootV4JS));
});

// .js (V5)

gulp.task('secureroot-jsv5', function () {
  return gulp.src(paths.srcJSV5).pipe(gulp.dest(paths.securerootV5JS));
});

// Images (V5) (jpg,png,gif)

gulp.task('secureroot-imagesv5', function () {
  return gulp.src(paths.srcIMAGESV5).pipe(gulp.dest(paths.securerootIMAGESV5));
});

// Images (V4) (jpg,png,gif)

gulp.task('secureroot-imagesv4', function () {
  return gulp.src(paths.srcIMAGESV4).pipe(gulp.dest(paths.securerootIMAGESV4));
});

/* -------------------------------------------------------------------------------------------------
Minifiy in secureroot
-------------------------------------------------------------------------------------------------- */

gulp.task('minify-secureroot-v5css',() => {
  return gulp.src('secureroot/assets/v5-css/v5.min.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('secureroot/assets/v5-css/'));
});

// MULTI TASKS FOR secureroot

// ALL

gulp.task('secureroot', gulp.series('secureroot-cssv5', 'secureroot-cssv4', 'secureroot-jsv5', 'secureroot-jsv4', 'secureroot-imagesv4', 'secureroot-imagesv5', function (done) {
  done();
}));

// V4 

gulp.task('secureroot-v4', gulp.series('secureroot-imagesv4', 'secureroot-cssv4', 'secureroot-jsv4', 'secureroot-jsv4', function (done) {
  done();
}));

// V5 

gulp.task('secureroot-v5', gulp.series('secureroot-imagesv5', 'secureroot-cssv5', 'secureroot-jsv5', 'secureroot-jsv5', function (done) {
  done();
}));

/* -------------------------------------------------------------------------------------------------
LEFT NAV (Slinky)
-------------------------------------------------------------------------------------------------- */

gulp.task('footer-slinky-js', function () {    
  return gulp.src(['./src/assets/v5-js/slinky.min.js', './src/assets/v5-js/slinky-custom.js'])
    .pipe(concat('v5-footer-slinky-js.js'))
    .pipe(minify())
  .pipe(rename("v5-footer-slinky-js.min.js"))
    .pipe(gulp.dest('src/assets/v5-js/'));
});


// Compiles SCSS files into v5.css
gulp.task('sass', () => {
  return gulp
	  .src("src/assets/v5-css/scss/v5.scss")
      .pipe(sourcemaps.init())
  	  .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write('.'))
    
    /* Creates v5.css file in build foler */
    .pipe(gulp.dest("src/assets/v5-css/"))
});

// Renames v5.css to v5.min.css for templating purposes (Does not minify)

gulp.task('rename-css',() => {
  return gulp.src('src/assets/v5-css/v5.css')
    /* Rename css file for DW template */
    .pipe(rename("v5.min.css"))
    .pipe(gulp.dest('src/assets/v5-css/'));
});

gulp.task('sass-build', gulp.series('sass', 'rename-css', function (done) {
  done();
}));

/* -------------------------------------------------------------------------------------------------
BrowserSync
-------------------------------------------------------------------------------------------------- */

// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

  // Serve files from the root of this project
  browserSync.init({
     server: {
          baseDir: "./build/",
          },
          port: 8080,
          open: true,
          notify: false,
          startPath: "/index.htm"
  });

  // Watch for SCSS change
  gulp.watch('src/assets/v5-css/scss/*.scss', gulp.series('sass-build','build')).on("change", reload);
  
  // Watch for .htm change and copy src .css to build folder
  gulp.watch('src/*.htm', gulp.series('build')).on("change", reload);

});




/* -------------------------------------------------------------------------------------------------
Utility Tasks
-------------------------------------------------------------------------------------------------- */
const onError = (err) => {
	gutil.beep();
};