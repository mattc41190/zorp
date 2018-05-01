const gulp = require('gulp')
const pug = require('gulp-pug')
const stylus = require('gulp-stylus')
const uglify = require('gulp-uglify-es').default
const pump = require('pump')

// Compile Styles
gulp.task('styles', () => {
  return gulp.src('client/styles/*.styl')
  .pipe(stylus({compress: true}))
  .pipe(gulp.dest('build/client/styles'))
})

// Compile Views
gulp.task('views', () => {
  return gulp.src('client/views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('build/client/views'))
})

// Compile Scripts
gulp.task('scripts', (cb) => {
  pump(
    [gulp.src('client/scripts/*.js'),
      uglify(),
      gulp.dest('build/client/scripts')], cb
  )
})

// Create Build Directory
gulp.task('build', ['views', 'styles', 'scripts'], () => {})