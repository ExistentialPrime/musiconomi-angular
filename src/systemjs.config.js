/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      //'npm:': 'node_modules/' // No longer used. All refs are now published to dist/libs
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/animations': 'libs/animations.umd.min.js',
      '@angular/animations/browser': 'libs/animations-browser.umd.min.js',
      '@angular/core': 'libs/core.umd.min.js',
      '@angular/common': 'libs/common.umd.min.js',
      '@angular/compiler': 'libs/compiler.umd.min.js',
      '@angular/platform-browser': 'libs/platform-browser.umd.min.js',
      '@angular/platform-browser/animations': 'libs/platform-browser-animations.umd.js',
      '@angular/platform-browser-dynamic': 'libs/platform-browser-dynamic.umd.min.js',
      '@angular/http': 'libs/http.umd.min.js',
      '@angular/router': 'libs/router.umd.min.js',
      '@angular/router/upgrade': 'libs/router-upgrade.umd.min.js',
      '@angular/forms': 'libs/forms.umd.min.js',
      '@angular/upgrade': 'libs/upgrade.umd.min.js',
      '@angular/upgrade/static': 'libs/upgrade-static.umd.min.js',

      // other libraries
      'angular-in-memory-web-api': 'libs/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      }
    },
     bundles: {
            // Bundle up Rx.js and specify what the bundle holds
            'libs/Rx.min.js': [
                "rxjs/*",
                "rxjs/operator/*",
                "rxjs/observable/*",
                "rxjs/add/operator/*",
                "rxjs/add/observable/*",
                "rxjs/util/*"
            ],
        }
  });
})(this);
