//Wrapper function.
module.exports = function(grunt) {
    //Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowerInstall: {
            target: {
                //Point to the files that should be updated
                //when you run grunt.
                src: [
                    'app/index.html',
                    'app/styles/screen.scss',
                    'app/styles/screen.css'
                ],
                cwd: '',
                dependencies: true,
                exclude: [],
                fileTypes: {},
                ignorePath: '',
            }
        },
        //Sass task.
        sass: {
            dist: {
                options: {
                    compress: false,
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['**/*.scss'],
                    dest: 'app',
                    ext: '.css'
                    // 'app/styles/screen.css' : 'app/styles/screen.scss'
                }]
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        },
        //Uglify task.
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'app/**/*.js',
                '!app/bower_components/**/*.js',
                '!app/bower_components/animate.css/*.js'
            ],
        }
    });

    //Load uglify.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bower-install');

    //Default task(s).
    //grunt.registerTask('default', ['bowerInstall','watch']);
    grunt.registerTask('default', ['uglify', 'bowerInstall', 'jshint:all', 'sass']);
    grunt.registerTask('serve', ['bowerInstall', 'jshint:all', 'sass', 'watch']);
};
