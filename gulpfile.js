//----------------------<<gulp>>----------------------\\
const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const cheerio = require('gulp-cheerio');

//----------------------<<bower>>----------------------\\
const wiredep = require('gulp-wiredep');

//----------------------<<html scripts>>----------------------\\
const useref = require('gulp-useref');

//----------------------<<pug = html>>----------------------\\
const pug = require('gulp-pug');

//----------------------<<sass = css>>----------------------\\
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

//----------------------<<js>>----------------------\\
const minify = require('gulp-minify');

//----------------------<<dev>>----------------------\\
const browserSync = require('browser-sync').create();

//----------------------<<svg>>----------------------\\
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');

//----------------------<<personal>>----------------------\\
const svgspriteDest = {
    mode: {
        symbol: {
            sprite: "../svg-sprite.svg"
        }
    }
};

//----------------------<<common tasks>>----------------------\\
gulp.task('default', ['clean', 'minify-js'], function(){
    gulp.run('dev');
});

gulp.task('production', ['clean', 'minify-js'], function(){
    gulp.run('build');
});

gulp.task('dev', ['build', 'watch', 'browser-sync']);

gulp.task('build', ['svgSpriteBuild', 'html', 'css', 'assets']);

gulp.task('watch', function(){
    gulp.watch('src/css/**/*.scss', ['css']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/**/*.pug', ['pug']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/assets/**/*.*', ['assets']);
    gulp.watch('src/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function(){
    return gulp.src('build/')
        .pipe(clean());
});

//----------------------<<engine tasks>>----------------------\\
gulp.task('svgSpriteBuild', function() {
    return gulp.src('src/assets/img/svg/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite(svgspriteDest))
        .pipe(gulp.dest('src/assets/img/svg/sprite/'));
});

gulp.task('pug', function(){
    return gulp.src('src/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(wiredep({
            directory: 'bower_components/'
        }))
        .pipe(useref())
        .pipe(gulp.dest('build/'))
});

gulp.task('html', function(){
    return gulp.src('src/**/*.html')
        .pipe(wiredep({
            directory: 'bower_components/'
        }))
        .pipe(useref())
        .pipe(gulp.dest('build/'))
});

gulp.task('css', function(){
    return gulp.src('src/css/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename('main.min.css'))
        .pipe(postcss([cssnano, autoprefixer]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

gulp.task('minify-js', function(){
    gulp.src('src/js/*.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('src/js/ugly'))
});

gulp.task('js', function(){
    gulp.src('src/js/*.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('src/js/ugly'))
        .on('end', function(){
            // gulp.run('pug');
            gulp.run('html');
        });
});

gulp.task('assets', function(){
    return gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('build/assets'));
});

gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: 'build/'
        }
    });
});