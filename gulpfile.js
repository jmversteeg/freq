'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserify   = require('browserify');
var babelify     = require('babelify');
var handlebars   = require('browserify-handlebars');
var buffer       = require('vinyl-buffer');
var source       = require('vinyl-source-stream');

var argv = require('yargs').argv;

var flags = {
    dev: !argv.dist
};

var paths = {
    assets: require('./assets.json'),
    dist:   "./web/dist"
};

var browserified = function (entry, sourceName) {
    return browserify({
        entries: entry,
        debug:   flags.dev
    })
        .transform(handlebars)
        .transform(babelify)
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