'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var del = require('del');

var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var iconfont = require('gulp-iconfont');
var rename = require('gulp-rename');
var consolidate = require('gulp-consolidate');
var lodash = require('lodash');

var imagemin = require('gulp-imagemin');

var paths = {
    styles: ['src/styles/**/*.scss'],
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

gulp.task('clean-fonts', function(cb) {
    del(['styles/base/icons'], cb);
});

gulp.task('clean-scripts', function(cb) {
    del(['dist/scripts'], cb);
});

gulp.task('scripts', ['clean-scripts'], function() {
    return gulp.src(['src/scripts/vendor/**/*.js', 'src/scripts/app.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(reload({ stream: true }));
});

gulp.task('styles', ['clean-styles'], function() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.styles))
        .pipe(reload({ stream: true }));
});

gulp.task('icons', function() {
    return gulp.src(['src/icons/*.svg'])
        .pipe(iconfont({
            fontName: 'icons'
        }))
        .on('codepoints', function(codepoints) {
            var options = {
                glyphs: codepoints,
                fontName: 'icons',
                fontPath: '/dist/fonts/',
                className: 'icon'
            };

            gulp.src('templates/_icons.css')
                .pipe(consolidate('lodash', options))
                .pipe(rename({ basename: '_icons', extname: '.scss' }))
                .pipe(gulp.dest('src/styles/base/'));
        })
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('images', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true    
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function() {
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch('src/icons/**/*.svg', ['icons']);
});

gulp.task('default', ['browser-sync', 'watch']);