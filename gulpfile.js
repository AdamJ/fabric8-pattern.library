var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var plumber = require('gulp-plumber');
var path = require('path');

gulp.task('css', function(){
  return gulp.src('styles/less/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('styles/css'))
});

gulp.task('default', ['css']);

// Compiles less on to /css
gulp.task('less', function () {
  gulp.src('styles/less/fabric8.less')
    .pipe(plumber())
    .pipe(less({
        paths: [ path.join('node_modules'), path.join('node_modules/patternfly/dist/less/dependencies'), path.join('node_modules/bootstrap/less'), path.join('node_modules/font-awesome/less')],
        // sourceMap: {
        //     sourceMapRootpath: '/' // This one for PF files (Optional absolute or relative path to your LESS files)
        // }
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('styles/css'))
});
