/* Cointek Gulp overview
 * ================================================================
 * clean - deletes the 'dist' folder and everything in it
 * tslint - checks all the typescript files for proper structure and formatting
 * compile - compiles all the typescript files
 * resources - Copy all resources that are not TypeScript files into dist directory
 * libs - this task will clean and copy all of the angular dependencies to the wwwroot/dist/libs folder
 * watch - watch for changes in Typescript and html files to update BrowserSync
 * build - running the 'build' task will clean everything out and repopulate the app, assets, libs, and vendor folders from scratch
 * ================================================================
 */

/** Setup  */
"use strict";

import fs       from 'fs';
import gulp     from 'gulp';
import yaml     from 'js-yaml';


const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("src/tsconfig.json");
const tslint = require('gulp-tslint');
const SystemBuilder = require('systemjs-builder');

// Load settings from settings.yml
const { PATHS } = loadConfig();
function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}


/**
 * Remove 'dist' directory.
 */
gulp.task('clean', (cb) => {
    return del(["dist"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript sources and create sourcemaps in 'dist'directory.
 */
gulp.task("compile", function () {
    return gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        //.pipe(tsc(tsProject))
        .pipe(tsProject())
        .pipe(sourcemaps.write(".")) //, {sourceRoot: '/src'}))
        .pipe(gulp.dest(PATHS.dist));
});

/**
 * Copy all resources that are not TypeScript files into dist directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/**/*", "src/.htaccess", "!**/*.ts"])
        .pipe(gulp.dest(PATHS.dist));
});



//#region Copy (not bundle) Libs into 'dist' directory.
// ========================================================================
function libsng() {
    return gulp.src( PATHS.libsIn )  
        .pipe( gulp.dest( PATHS.libsOut  ));
}


function libsrxjs() {
    var builder = new SystemBuilder('./', {
        paths: {"rxjs/*": "node_modules/rxjs/*.js"},
        map: {"rxjs": "node_modules/rxjs"},
        packages: {"rxjs": {main: 'Rx.js', defaultExtension: "js"}}
    });

    return builder.bundle('rxjs', PATHS.libsOut + '/Rx.min.js', {
        sourceMaps: true,
        minify: true,
        mangle: true
    });
}

/*
function copyLibs()
{   // Need to return a promise since we cant use gulp.series or gulp.parallel inside a function
    return new Promise(function(resolve, reject) {
        libsng();
        libsrxjs();
        resolve();
    });
}*/

gulp.task('libs', gulp.parallel(libsng, libsrxjs)); 
//#endregion Libs





/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {

    gulp.watch(["src/**/*.ts"]).on('change', gulp.series('compile'));
    gulp.watch(["src/**/*.html", "src/**/*.css", "src/assets/**/*"]).on('change', gulp.series('resources'));

});


/**
 * Build the project and all need resources
 */
gulp.task("build", gulp.series('clean', 'compile', 'resources', 'libs'), () => {
    console.log("Building the project ...");
});


/**
 * Default - Clean, lint, compile, and build the project. then watch for changes
 */
// Build the site, run the server, and watch for file changes
gulp.task('default',  gulp.series('build',  'watch')); 