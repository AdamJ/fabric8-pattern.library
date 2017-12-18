var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');

gulp.task('css', function*( {
  return gulp.src('styles/precompiled/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('styles/compiled'))
});

gulp.task('default', ['css']);
