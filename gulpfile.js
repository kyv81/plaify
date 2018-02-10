const gulp = require('gulp');
const pug = require('gulp-pug');
const del = require('del');
const browserSync = require('browser-sync').create();

// стили
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cssunit = require('gulp-css-unit');

// скрипты
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// svg
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const config = {
  mode: {
    symbol: {
      sprite: '../sprite.svg'
    }
  }
};

// пути
const paths = {
  root: './build',
  templates: {
    pages: 'src/templates/pages/*.pug',
    src: 'src/templates/**/*.pug',
    dest: 'build/assets/'
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'build/assets/styles/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'build/assets/scripts/'
  },
  images: {
    src: 'src/images/**/*.*',
    dest: 'build/assets/images/'
  },
  svgSprite: {
    src: 'src/images/**/*.svg',
    dest: 'build/assets/images/'
  },
  fonts: {
    src: 'src/fonts/**/*.*',
    dest: 'build/assets/fonts/'
  }
};

// pug
function templates() {
  return gulp
    .src(paths.templates.pages)
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
  return gulp
    .src('./src/styles/app.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
        includePaths: require('node-normalize-scss')
          .includePaths
      })
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(
      cssunit({
        type: 'px-to-rem',
        rootSize: 16
      })
    )
    .pipe(sourcemaps.write())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}

// очистка
function clean() {
  return del(paths.root);
}

// webpack
function scripts() {
  return gulp
    .src('src/scripts/app.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

// отслеживаем исходники src
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scripts);
}

// отслеживаем build и перезагружаем браузер
function server() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(
    paths.root + '/**/*.*',
    browserSync.reload
  );
}

// перенос картинок
function images() {
  return gulp
    .src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

// делаем спрайт из иконок svg
function spriteSvg() {
  return (
    gulp
      .src(paths.svgSprite.src)
      // минифицируем svg
      .pipe(
        svgmin({
          js2svg: {
            pretty: true
          }
        })
      )
      // удалить все атрибуты fill, style and stroke в фигурах
      .pipe(
        cheerio({
          run: function($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
          },
          parserOptions: {
            xmlMode: true
          }
        })
      )
      // cheerio плагин заменит, если появилась, скобка '&gt;', на нормальную.
      .pipe(replace('&gt;', '>'))
      // build svg sprite
      .pipe(svgSprite(config))
      .pipe(gulp.dest(paths.svgSprite.dest))
  );
}

// перенос шрифтов
function fonts() {
  return gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.spriteSvg = spriteSvg;
exports.fonts = fonts;
exports.scripts = scripts;

// работаем
gulp.task(
  'default',
  gulp.series(
    gulp.parallel(
      templates,
      styles,
      scripts,
      fonts,
      images,
      spriteSvg
    ),
    gulp.parallel(watch, server)
  )
);

// контрольная сборка
gulp.task(
  'build',
  gulp.series(
    clean,
    gulp.parallel(
      templates,
      styles,
      scripts,
      fonts,
      images,
      spriteSvg
    )
  )
);
