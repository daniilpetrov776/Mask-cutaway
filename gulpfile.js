import gulp from 'gulp';
import browserSync from 'browser-sync';
import sharp from 'sharp';
import {deleteAsync} from 'del';
import {compileStyles, compileMinStyles} from './gulp/compileStyles.mjs';
import {copy, copyImages, copySvg} from './gulp/copyAssets.mjs';
import compileScripts from './gulp/compileScripts.mjs';
import {optimizeSvg, sprite, createWebp, createAvif, optimizePng, optimizeJpg} from './gulp/optimizeImages.mjs';
import pug from './gulp/compilePug.mjs';

const PATH_TO_SOURCE = './source/';
const PATH_TO_DIST = './build/';
const PATH_TO_RAW = './raw/';

const server = browserSync.create();
const streamStyles = () => compileStyles().pipe(server.stream());
const clean = () => deleteAsync('build');
const refresh = (done) => {
  server.reload();
  done();
};

const syncServer = () => {
  server.init({
    server: 'build/',
    index: 'video-mask.html',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/pug/**/*.pug', gulp.series(pug, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', streamStyles);
  gulp.watch('source/js/**/*.{js,json}', gulp.series(compileScripts, refresh));
  gulp.watch('source/data/**/*.{js,json}', gulp.series(copy, refresh));
  gulp.watch('source/img/**/*.svg', gulp.series(copySvg, sprite, pug, refresh));
  gulp.watch('source/img/**/*.{png,jpg,webp}', gulp.series(copyImages, pug, refresh));

  gulp.watch('source/favicon/**', gulp.series(copy, refresh));
  gulp.watch('source/video/**', gulp.series(copy, refresh));
  gulp.watch('source/downloads/**', gulp.series(copy, refresh));
  gulp.watch('source/*.php', gulp.series(copy, refresh));
};

export function optimizeRaster() {
  const RAW_DENSITY = 2;
  const TARGET_FORMATS = [undefined, 'webp']; // undefined — initial format: jpg or png

  function createOptionsFormat() {
    const formats = [];

    for (const format of TARGET_FORMATS) {
      for (let density = RAW_DENSITY; density > 0; density--) {
        formats.push({
          format,
          rename: { suffix: `@${density}x` },
          width: ({ width }) => Math.ceil(width * density / RAW_DENSITY),
          jpegOptions: { progressive: true },
        });
      }
    }

    return { formats };
  }

  return gulp.src(`${PATH_TO_RAW}images/**/*.{png,jpg,jpeg}`)
    .pipe(sharp(createOptionsFormat()))
    .pipe(gulp.dest(`${PATH_TO_SOURCE}img`));
}

export function optimizeVector () {
  return src([`${PATH_TO_RAW}**/*.svg`])
    .pipe(svgo())
    .pipe(dest(PATH_TO_SOURCE));
}

const build = gulp.series(clean, copy, sprite, gulp.parallel(compileMinStyles, compileScripts, pug));
const dev = gulp.series(clean, copy, sprite, gulp.parallel(compileMinStyles, compileScripts, pug, optimizePng, optimizeJpg, optimizeSvg), syncServer);
const start = gulp.series(clean, copy, sprite, gulp.parallel(compileStyles, compileScripts, pug), syncServer);
const nomin = gulp.series(clean, copy, sprite, gulp.parallel(compileStyles, compileScripts, pug, optimizePng, optimizeJpg, optimizeSvg));


const optimize = gulp.series(gulp.parallel(optimizePng, optimizeJpg, optimizeSvg));

export {createWebp as webp, createAvif as avif, build, start, dev, nomin, optimize};
