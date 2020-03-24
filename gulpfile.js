var gulp = require('gulp');
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


/* Footer JS */

gulp.task('footer-js', function () {    
    return gulp.src(['./assets/v5-js/slinky-ie11-fix.js','./assets/v5-js/google-custom-search.js','./assets/v5-js/js-offcanvas.pkgd.min.js','./assets/v5-js/js-offcanvas-trigger.js', './assets/v5-js/aria.js', './assets/v5-js/website-feedback.src.js', './assets/v5-js/content-page.js', './assets/v5-js/notification-bar.js', './assets/v5-js/top-tasks.js', './assets/v5-js/cookies-gtm.js'])
        .pipe(concat('v5-footer.js'))
        .pipe(minify())
	    .pipe(rename("v5-footer.min.js"))
        .pipe(gulp.dest('assets/v5-js/'));
});

gulp.task('footer-slinky-js', function () {    
    	return gulp.src(['./assets/v5-js/slinky.min.js', './assets/v5-js/slinky-custom.js'])
        .pipe(concat('v5-footer-slinky-js.js'))
        .pipe(minify())
	    .pipe(rename("v5-footer-slinky-js.min.js"))
        .pipe(gulp.dest('assets/v5-js/'));
});


// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
       server: {
            baseDir: "./"
            },

            port: 8080,
            open: true,
            notify: false,
			startPath: "/index.htm"
    });
	
	gulp.watch('assets/v5-css/scss/*.scss', gulp.series('sass')).on("change", reload);
    gulp.watch("*.htm").on("change", reload);
	
});

gulp.task('sass', () => {
  return gulp
	  .src("assets/v5-css/scss/v5.scss")
      .pipe(sourcemaps.init())
  	  .pipe(sass().on("error", sass.logError))
	  .pipe(sourcemaps.write('.'))
	  .pipe(rename("v5.min.css"))
      .pipe(gulp.dest("assets/v5-css/"))
});

gulp.task('sass-desktop', () => {
  return gulp
	  .src("assets/v5-css/scss/v5-desktop.scss")
      .pipe(sourcemaps.init())
  	  .pipe(sass().on("error", sass.logError))
	  .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest("assets/v5-css/"))
});
           
gulp.task('minify-css',() => {
  return gulp.src('assets/v5-css/v5.min.css')
    .pipe(cleanCSS())
	.pipe(rename("v5.min.css"))
    .pipe(gulp.dest('assets/v5-css/v5.min/'));
});

gulp.task('minify-desktop-css',() => {
  return gulp.src('assets/v5-css/v5-desktop.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('assets/v5-css/v5-desktop'));
});


/* -------------------------------------------------------------------------------------------------
Utility Tasks
-------------------------------------------------------------------------------------------------- */
const onError = (err) => {
	gutil.beep();
};