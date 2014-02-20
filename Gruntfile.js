'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      dist: ['dist'],
    },

    bosonic: {
      components: {
        src: ['node_modules/b-*/src/*.html'],
        css: 'dist/components.css',
        js:  'dist/components.js'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    copy: {
      demo: {
        files: [
          { src: ['node_modules/bosonic/dist/*.js'], dest: 'demo/js/', filter: 'isFile', expand: true, flatten: true },
          { src: ['dist/*.js'], dest: 'demo/js/', filter: 'isFile', expand: true, flatten: true },
          { src: ['dist/*.css'], dest: 'demo/css/', filter: 'isFile', expand: true, flatten: true }
        ]
      },
      tests: {
        files: [
          { src: ['node_modules/b-*/test/*.js'], dest: 'test/', filter: 'isFile', expand: true, flatten: true }
        ]
      }
    },

    connect: {
      demo: {
        options: {
          port: 8020,
          base: './demo',
          hostname: '*',
          keepalive: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bosonic');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['dist']);
  grunt.registerTask('test', ['dist', 'copy:tests', 'karma']);
  grunt.registerTask('demo', ['dist', 'copy:demo', 'connect']);
  grunt.registerTask('dist', ['clean', 'bosonic']);

};
