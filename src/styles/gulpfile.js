var gulp = require('gulp');
var sass = require('gulp-sass');
var reactNativeStylesheetCss = require('gulp-react-native-stylesheet-css');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(reactNativeStylesheetCss())
        .pipe(gulp.dest('./dist/sass/'));
});

//define a task with the name of 'default'
// and a callback to perform when the task is ran
gulp.task('default', function() {
  gulp.watch('sass/**/*.scss',['styles']);
  console.log('Default Task Running.');
});