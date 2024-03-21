const { src, dest, watch, parallel } = require('gulp');
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); //asegurarse de que funcione en el navegador que uno desee
const cssnano = require('cssnano');  // va acomprimir nuestro codigo de css
const postcss = require('gulp-postcss'); // permite hacer algunas transformaciones al codigo css
const sourcemaps = require('gulp-sourcemaps');


//Javascript
const terser = require('gulp-terser-js');


function css(done) {
    // CSS
    src('src/scss/**/*.scss')// Identificar el archivo de SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) //Compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("buil/css")) // Almacenarla en el disco duro

    done() // Calback que avisa a gulp cuando llegamos al final
};

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(terser())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('buil/js'));

    done();
}

function dev(done) {

    watch('src/scss/**/*.scss', css);
    watch('src/scss/**/*.js', javascript)
    done();
};

exports.js = javascript;
exports.css = css;
exports.dev = parallel(javascript, dev);