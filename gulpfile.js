var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var plumber = require('gulp-plumber');
var path = require('path');

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
  gulp.src(['node_modules/bootstrap/less/**/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/bootstrap/less'))
  gulp.src(['node_modules/font-awesome/**/*'])
    .pipe(gulp.dest('styles/dependencies/patternfly/font-awesome'))
  gulp.src(['node_modules/patternfly/dist/less/*.less'])
    .pipe(gulp.dest('styles/dependencies/patternfly/'))
})

// Compiles less on to /css
gulp.task('less', function () {
  gulp.src('styles/less/fabric8.less')
    .pipe(plumber())
    .pipe(less({
        paths: [ path.join('node_modules'), path.join('styles/dependencies/patternfly/'), path.join('styles/dependencies/bootstrap/less'), path.join('styles/dependencies/font-awesome/less')],
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('styles/css'))
});

gulp.task('default', ['copy', 'less']);
