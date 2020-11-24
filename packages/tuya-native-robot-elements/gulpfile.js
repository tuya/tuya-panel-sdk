const { exec } = require('child_process');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const mergeStream = require('merge-stream');
// const sourcemaps = require('gulp-sourcemaps');
const alias = require('gulp-ts-alias');
const cache = require('gulp-cached');

const tsProject = ts.createProject('./tsconfig.json');
const { watch } = gulp;

function swallowError(error) {
  // If you want details of the error in the console
  // console.log(error.toString());

  this.emit('end');
}

gulp.task('clean', function (cb) {
  return del(['lib'], cb);
});

gulp.task('tsc', function () {
  const tsGulp = gulp
    .src('src/**/*.{ts,tsx,js}')
    // .pipe(alias({ configuration: tsProject.config }))
    // .pipe(sourcemaps.init())
    // .pipe(gulp.dest('dist/testing'))
    .pipe(
      // tsProject({
      //   declaration: true,
      // })
      tsProject(ts.reporter.nullReporter())
    )
    .on('error', swallowError);
  return mergeStream(
    tsGulp.js
      // .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('lib')),
    tsGulp.dts.pipe(gulp.dest('lib'))
  );
});

gulp.task('tsc-dev', function () {
  const tsGulp = gulp
    .src('src/**/*.{ts,tsx,js}')
    .pipe(cache('tsc-dev'))
    .pipe(alias({ configuration: tsProject.config }))
    // .pipe(sourcemaps.init())
    // .pipe(gulp.dest('dist/testing'))
    .pipe(
      // tsProject({
      //   declaration: true,
      // })
      tsProject(ts.reporter.nullReporter())
    )
    .on('error', swallowError);
  return mergeStream(
    tsGulp.js
      // .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('lib')),
    tsGulp.dts.pipe(gulp.dest('lib'))
  );
});

gulp.task('copy', function () {
  return gulp.src('src/**/*.{jpg,png,gif,json}').pipe(gulp.dest('lib'));
});

function push(cb) {
  exec('yalc push', (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  cb();
}

gulp.task('default', gulp.series('clean', gulp.parallel('copy', 'tsc'), push));
gulp.task('watch-flow', gulp.series(gulp.parallel('copy', 'tsc-dev'), push));

gulp.task('watch', function () {
  const watcher = watch('src/**', gulp.series('watch-flow'));

  watcher.on('change', function (path) {
    console.log(`File ${path} was changed`);
  });
});
