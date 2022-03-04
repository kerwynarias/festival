const { series, src, dest, watch, parallel } = require ('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require ('gulp-imagemin');
const notify = require ('gulp-notify');
const webp = require ('gulp-webp');
const concat = require ('gulp-concat')


//Funciones que copila sass

const paths ={
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
}

function css(){
    return src(paths.scss)
        .pipe( sass())
        .pipe( dest('./build/css'))


}

function minificarcss() {
    return src(paths.scss)
    .pipe( sass({
        outputStyle: 'compressed'
    }))
    .pipe( dest('./build/css'))
}

function javascript(){
    return src(paths.js)
    .pipe( concat('bundle.js'))
    .pipe( dest ('build/js'))

}

//** dos asterisco busca las imagenes en la carpeta en todos los formatos
//* un asterisco busca las imagenes en las demas carpetas
function imagenes(){
    return src(paths.imagenes)
    .pipe( imagemin())
    .pipe ( dest('./build/img'))
    .pipe ( notify ({message: 'imagen Minificada'}) ); //automatiza las ejecucion de imagenes
}

function versionWebp() { 
    return src(paths.imagenes)
    .pipe( webp())
    .pipe( dest('./build/img'))
    .pipe( notify({message: 'Versión webP lista'}) );
}


function watchArchivos(){
    watch(paths.scss, css);
    watch(paths.js, javascript);
}


exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

//ejecuta todas las tareas
exports.default = series ( css, javascript, imagenes, versionWebp, watchArchivos );
