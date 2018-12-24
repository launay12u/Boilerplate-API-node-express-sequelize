import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';
import db from './config/sequelize';

const plugins = gulpLoadPlugins();

const paths = {
    js: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**'],
    nonJs: ['./package.json', './.gitignore', './.env'],
    tests: './server/tests/*.js',
};

//Init test database

gulp.task('initTestDatabase',function(){

    db.sequelize
    .sync({force: true})
    .then(() => {
        console.log('Database test synchronized'); // eslint-disable-line no-console
        db.sequelize.close();
    })
});

//Init database

gulp.task('initTestDatabase_db',function(){

    db.sequelize
    .sync()
    .then(() => {
        console.log('Database synchronized'); // eslint-disable-line no-console
        db.sequelize.close();
    })
});

// Clean up dist and coverage directory
gulp.task('clean', () =>
    del.sync(['dist/**', 'dist/.*', 'coverage/**', '!dist', '!coverage'])
);

// Copy non-js files to dist
gulp.task('copy', () =>
    gulp.src(paths.nonJs)
        .pipe(plugins.newer('dist'))
        .pipe(gulp.dest('dist'))
);

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () =>
    gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
        .pipe(plugins.newer('dist'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot(file) {
                return path.relative(file.path, __dirname);
            },
        }))
        .pipe(gulp.dest('dist'))
);

// Start server with restart on file changes
gulp.task('nodemon', ['copy', 'babel'], () =>
    plugins.nodemon({
        script: path.join('dist', 'index.js'),
        ext: 'js',
        ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
        tasks: ['copy', 'babel'],
    })
);

// gulp serve for development
gulp.task('serve', ['clean'], () => runSequence('nodemon'));

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', ['clean'], () => {
    runSequence(
        ['copy', 'babel']
    );
});



