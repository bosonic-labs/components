'use strict';

module.exports = function(grunt) {

  var elements = [
    'node_modules/b-dialog/src/*.html',
    'node_modules/b-datalist/src/*.html',
    'node_modules/b-selectable/src/*.html',
    'node_modules/b-datepicker/src/*.html',
    'node_modules/b-sortable/src/*.html',
    'node_modules/b-collapsible/src/*.html',
    'node_modules/b-accordion/src/*.html',
    'node_modules/b-tooltip/src/*.html'
  ];

  grunt.initConfig({

    clean: {
      dist: ['dist'],
    },

    bosonic: {
      components: {
        src: elements,
        css: 'dist/bosonic-components.css',
        js:  'dist/bosonic-components.js'
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      components: {
        files: {
          'dist/bosonic-components.min.js': ['dist/bosonic-components.js']
        }
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bosonic');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['dist']);
  grunt.registerTask('test', ['dist', 'copy:tests', 'karma']);
  grunt.registerTask('demo', ['dist', 'copy:demo', 'connect']);
  grunt.registerTask('dist', ['clean', 'bosonic', 'uglify']);

};
