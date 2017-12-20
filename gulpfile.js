var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var rename = require("gulp-rename");
var plumber = require('gulp-plumber');
var path = require('path');
var browserSync = require('browser-sync').create();

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function () {
  gulp.src(['node_modules/patternfly/node_modules/bootstrap/less/**/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/bootstrap/less'))
  gulp.src(['node_modules/patternfly/node_modules/bootstrap/fonts/**'])
    .pipe(gulp.dest('styles/dependencies/patternfly/bootstrap/fonts'))
  gulp.src(['node_modules/patternfly/node_modules/font-awesome/**/*'])
    .pipe(gulp.dest('styles/dependencies/patternfly/font-awesome'))
  gulp.src(['node_modules/patternfly/node_modules/bootstrap-datepicker/less/datepicker3.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/bootstrap-datepicker/less'))
  gulp.src(['node_modules/patternfly/node_modules/bootstrap-select/less/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/bootstrap-select/less'))
  gulp.src(['node_modules/patternfly/node_modules/bootstrap-switch/src/less/bootstrap3/**/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/bootstrap-switch/src/less/bootstrap3'))
  gulp.src(['node_modules/patternfly/node_modules/patternfly-bootstrap-combobox/less/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/patternfly-bootstrap-combobox/less'))
  gulp.src(['node_modules/patternfly/node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.css'])
    .pipe(gulp.dest('styles/dependencies/patternfly/bootstrap-touchspin/dist'))
  gulp.src(['node_modules/patternfly/node_modules/c3/c3.css'])
    .pipe(gulp.dest('styles/dependencies/patternfly/c3'))
  gulp.src(['node_modules/patternfly/node_modules/bootstrap-slider/src/less/**/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/bootstrap-slider/src/less'))
  gulp.src(['node_modules/patternfly/node_modules/eonasdan-bootstrap-datetimepicker/src/less/**/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/eonasdan-bootstrap-datetimepicker/src/less'))
  gulp.src(['node_modules/patternfly/dist/less/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/'))
  gulp.src(['node_modules/patternfly/dist/fonts/**'])
    .pipe(gulp.dest('styles/dependencies/fonts'))
  gulp.src(['node_modules/patternfly/dist/img/**'])
    .pipe(gulp.dest('styles/dependencies/img'))
})

// Compiles less on to /css
gulp.task('less', function () {
  gulp.src('styles/less/fabric8.less')
    .pipe(plumber())
    .pipe(less({
        paths: [ path.join('node_modules'),
                 path.join('styles/dependencies/patternfly/'),
                 path.join('styles/dependencies/patternfly/bootstrap/less'),
                 path.join('styles/dependencies/patternfly/font-awesome/less')],
    }))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('styles/css'))
});

gulp.task('dependencies', function () {
  gulp.src(['styles/dependencies/fonts/**'])
    .pipe(gulp.dest('styles/fonts'))
  gulp.src(['styles/dependencies/img/**'])
    .pipe(gulp.dest('styles/img'))
  gulp.src(['node_modules/patternfly/dist/css/*.css'])
    .pipe(gulp.dest('styles/css'))
})

gulp.task('build', ['copy', 'less', 'dependencies']);

// ensure sass finishes, reload browser
gulp.task('styles-watch', ['less'], function (done) {
  browserSync.reload();
  done();
})

// A development task to run anytime a file changes
gulp.task('watch', ['copy', 'less', 'dependencies'], function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('styles/less/**', ['styles-watch']);
  browserSync.reload();
 });

gulp.task('default', ['copy', 'less']);
