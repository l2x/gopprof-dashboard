module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n;'
            },
            css: {
                src: [
                    'app/bower_components/datatables/media/css/jquery.dataTables.min.css',
                    'app/bower_components/angular-datatables/dist/css/angular-datatables.min.css',
                    'app/bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'app/bower_components/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
                    'app/bower_components/bootstrap-material-design/dist/css/ripples.min.css',
                    'app/bower_components/adm-dtp/dist/ADM-dateTimePicker.min.css',
                    'app/app.css',
                ],
                dest: 'build/global.css',
            },
            js: {
                src: [
                    'app/bower_components/jquery/dist/jquery.min.js',
                    'app/bower_components/arrive/minified/arrive.min.js',
                    'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'app/bower_components/bootstrap-material-design/dist/js/material.min.js',
                    'app/bower_components/bootstrap-material-design/dist/js/ripples.min.js',
                    'app/bower_components/datatables/media/js/jquery.dataTables.min.js',
                    'app/bower_components/highcharts/highstock.js',
                    'app/bower_components/angular/angular.min.js',
                    'app/bower_components/angular-route/angular-route.min.js',
                    'app/bower_components/angular-resource/angular-resource.min.js',
                    'app/bower_components/angular-cookies/angular-cookies.min.js',
                    'app/bower_components/adm-dtp/dist/ADM-dateTimePicker.min.js',
                    'app/bower_components/angular-datatables/dist/angular-datatables.min.js',
                ],
                dest: 'build/global.js'
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            app: {
                files: [{
                    src: ['app/app.js', 'app/common/service.js', 'app/common/directive.js', 'app/pprof/index.js', 'app/setting/index.js', 'app/stats/index.js'],
                    dest: 'build/app.js'
                }, ],
            },
        },
        copy: {
            main: {
                files: [{
                    src: ['app/favicon.ico'],
                    dest: 'build/favicon.ico',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    src: ['app/index.tpl'],
                    dest: 'build/index.html',
                    flatten: true
                }, {
                    expand: true,
                    src: ['app/common/*.html'],
                    dest: 'build/common/',
                    flatten: true
                }, {
                    expand: true,
                    src: ['app/pprof/*.html'],
                    dest: 'build/pprof/',
                    flatten: true
                }, {
                    expand: true,
                    src: ['app/setting/*.html'],
                    dest: 'build/setting/',
                    flatten: true
                }, {
                    expand: true,
                    src: ['app/stats/*.html'],
                    dest: 'build/stats/',
                    flatten: true
                }, {
                    expand: true,
                    src: ['app/bower_components/datatables/media/images/*'],
                    dest: 'build/images/',
                    flatten: true
                }, {
                    expand: true,
                    src: ['app/bower_components/bootstrap/fonts/*'],
                    dest: 'build/fonts/',
                    flatten: true
                }],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['concat', 'uglify', 'copy']);
};
