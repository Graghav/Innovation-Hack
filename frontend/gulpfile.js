var gulp      = require('gulp');
var webserver = require('gulp-webserver');
var sass      = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename    = require('gulp-rename');
var argv      = require('yargs').argv;

var port      = argv.port || 3000;

var paths = {
  sass : ['assets/scss/*.scss']
}

gulp.task('local', ['sass', 'serve','watch']);

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
      .pipe(sass({
        precision: 10,
        onError: console.error.bind(console, 'Sass error:')
      }))
      .pipe(gulp.dest('assets/css/'))
      .pipe(minifyCss({
        keepSpecialComments: 0
       }))
     .pipe(rename({ extname: '.min.css' }))
     .pipe(gulp.dest('assets/css/'))
     .on('end', done);
});


gulp.task('serve', function() {
   gulp
   .src('./')
   .pipe(webserver({
      livereload: false,
      fallback: 'index.html',
      port: port,
      path: '/',
      directoryListing: true,
      open: true
    }))
    .on('end', function(){
    	console.log("Server listening on port " + port);
    });

});
