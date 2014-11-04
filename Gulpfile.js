'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
// var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var del = require('del');

var browserify = require('browserify');
var es6ify = require('es6ify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
    styles: ['src/styles/vendor/bourbon/_bourbon.scss'],
    scripts: ['src/scripts/**/*.js']
}

var dest = {
    styles: 'dist/styles',
    scripts: 'dist/scripts'
}

function onError(err) {
    gutil.beep();
    gutil.log(gutil.colors.red.bgBlack('Error!'));
    gutil.log('Plugin:', gutil.colors.cyan(err.plugin));
    gutil.log('Message:', gutil.colors.grey(err.message));
}

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:3000"
    });
});

gulp.task('clean-styles', function(cb) {
    del(['dist/styles'], cb);
});

gulp.task('scripts', function() {
    return browserify('./src/scripts/app.js')
        .add(es6ify.runtime)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(dest.scripts));
});

gulp.task('styles', ['clean-styles'], function() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(dest.styles))
        .pipe(reload({ stream: true }));
});

gulp.task('watch', function() {
    gulp.watch(paths.styles, ['styles']);

    var bundler = browserify({
        entries: ['./src/scripts/app.js'],
        transform: [es6ify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }).add(es6ify.runtime);

    var watcher = watchify(bundler);

    watcher.on('update', rebundle);

    function rebundle() {
        var start = new Date(), end, diff;
        gutil.log('Rebundling...');

        watcher
            .bundle()
            .on('error', onError)
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(dest.scripts))
            .pipe(reload({ stream: true }));

        end = new Date();
        diff = end - start;
        gutil.log('Finished ' + gutil.colors.cyan("'bundling '") + 'after ' + gutil.colors.red(diff + 'ms'));
    }

    rebundle();
});

gulp.task('default', ['browser-sync', 'watch']);