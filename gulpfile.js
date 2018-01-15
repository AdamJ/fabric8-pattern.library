var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var rename = require("gulp-rename");
var plumber = require('gulp-plumber');
var path = require('path');
var util = require('gulp-util');
var browserSync = require('browser-sync').create();

var watchDist = '/';

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
});

gulp.task('clean', function() {
    return del([
        'node_modules',
        'styles/dependencies'
    ]);
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function () {
  gulp.src(['node_modules/patternfly/node_modules/bootstrap/**/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/bootstrap'))
  gulp.src(['node_modules/patternfly/node_modules/font-awesome/less/*'])
    .pipe(gulp.dest('styles/dependencies/patternfly/font-awesome/less'))
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
  gulp.src(['node_modules/patternfly/node_modules/bootstrap-slider/src/less/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/bootstrap-slider/src/less'))
  gulp.src(['node_modules/patternfly/node_modules/bootstrap-datetimepicker/less/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/bootstrap-datetimepicker/less'))
  gulp.src(['node_modules/patternfly/node_modules/eonasdan-bootstrap-datetimepicker/src/less/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/eonasdan-bootstrap-datetimepicker/src/less'))
  gulp.src(['node_modules/patternfly/dist/less/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly'))
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
                 // path.join('styles/dependencies/patternfly/'),
                 // path.join('styles/dependencies/patternfly/bootstrap/less'),
                 // path.join('styles/dependencies/patternfly/font-awesome/less')],
                path.join('styles/less/'),
                path.join('styles/less/partials/'),
                path.join('styles/dependencies/patternfly/')],
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
  gulp.watch('styles/less/**', ['less']);
  util.log('Now run');
  util.log('');
  util.log(util.colors.red('npm link', path.resolve(watchDist)));
  util.log('');
  util.log('in the npm module you want to link this one to');
 });

gulp.task('default', ['build']);
