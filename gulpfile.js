var gulp = require('gulp');
var traceur = require('gulp-traceur');

var TRACEUR_OPTIONS = {
    "modules": "amd",
    "script": false,
    "types": true,
//    "typeAssertions": true,
//    "typeAssertionModule": "assert",
    "annotations": true,
//    "sourceMaps": "file"
};

var PATH = {
  SRC: './src/**/*.js',
  BUILD: 'dist/amd',
};

// TRANSPILE AT SCRIPT
gulp.task('build/src', function() {
  gulp.src(PATH.SRC)
      .pipe(traceur(TRACEUR_OPTIONS))
      .pipe(gulp.dest(PATH.BUILD));
});

gulp.task('build', ['build/src']);

gulp.task('watch', function() {
  gulp.watch(PATH.SRC, ['build']);
});

gulp.task('default', ['build', 'watch']);