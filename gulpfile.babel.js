/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';

import { default as js, dist } from './tasks/browserify';

gulp.task('clean', () => {
    del.sync(['dist']);
    del.sync(['examples/*.browserified.js']);
});

// Compile examples
gulp.task('js-dev', js({
    src: './examples/js/index.jsx',
    destFilename: 'main.browserified.js',
    destFolder: './examples/'
}));
gulp.task('js-dev', js({
    src: './examples/dropTarget/js/index.jsx',
    destFilename: 'main.browserified.js',
    destFolder: './examples/dropTarget/'
}));

// Compile scripts
gulp.task('js-browserify', dist({
    src: './src/Touch.js',
    destFilename: 'Touch.browserified.js',
    destFolder: './dist/'
}));

gulp.task('babel', () => {
    return gulp.src('src/**/*')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['clean', 'js-dev']);
gulp.task('dist', ['clean', 'babel', 'js-browserify']);

gulp.task('default', ['dev']);
