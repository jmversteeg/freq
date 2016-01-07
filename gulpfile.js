'use strict';

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const gulpif       = require('gulp-if');
const rename       = require('gulp-rename');
const concat       = require('gulp-concat');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserify   = require('browserify');
const babelify     = require('babelify');
const handlebars   = require('browserify-handlebars');
const buffer       = require('vinyl-buffer');
const source       = require('vinyl-source-stream');

const argv = require('yargs').argv;

const flags = {
    dev: !argv.dist
};

const paths = {
    assets: require('./assets.json'),
    dist:   "./web/dist"
};

const browserified = function (entry, sourceName) {
    return browserify({
        entries: entry,
        debug:   flags.dev
    })
        .transform(handlebars)
        .transform(babelify, {'presets': ['es2015', 'react']})
        .bundle()
        .pipe(source(sourceName))
        .pipe(buffer());
};

gulp.task('scripts-main', function () {
    return browserified('./assets/scripts/app.js', 'app.js')
        .pipe(gulp.dest(paths.dist));
});

gulp.task('scripts-assets', function () {
    return gulp.src(paths.assets.js)
        .pipe(gulpif(flags.dev, sourcemaps.init()))
        .pipe(concat('app-assets.js'))
        .pipe(gulpif(flags.dev, sourcemaps.write()))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('styles-main', function () {
    return gulp.src([
            './assets/styles/main.scss'
        ])
        .pipe(gulpif(flags.dev, sourcemaps.init()))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulpif(flags.dev, sourcemaps.write()))
        .pipe(rename('app.css'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('styles-assets', function () {
    return gulp.src(paths.assets.css)
        .pipe(gulpif(flags.dev, sourcemaps.init()))
        .pipe(concat('app-assets.css'))
        .pipe(gulpif(flags.dev, sourcemaps.write()))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function () {
    gulp.watch('./assets/**/*.js', ['scripts-main']);
    gulp.watch('./assets/**/*.scss', ['styles-main']);
});

gulp.task('default', [
    'scripts-assets',
    'scripts-main',
    'styles-assets',
    'styles-main'
]);