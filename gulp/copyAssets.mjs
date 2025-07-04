import gulp from 'gulp';

const copySvg = () => gulp.src('source/img/**/*.svg', {base: 'source'}).pipe(gulp.dest('build'));

const copyImages = () => gulp.src('source/img/**/*.{png,jpg,jpeg,webp,avif}', {base: 'source'}).pipe(gulp.dest('build'));

const copyVideo = () => gulp.src('source/video/**/*.{mp4,webm,ogg,avi,mov}', {base: 'source'}).pipe(gulp.dest('build'));

const copy = () =>
  gulp
      .src(['source/**.html', 'source/fonts/**', 'source/img/**', 'source/favicon/**', 'source/data/**', 'source/video/**'], {
        base: 'source',
      })
      .pipe(gulp.dest('build'));

export {copy, copyImages, copySvg, copyVideo};
