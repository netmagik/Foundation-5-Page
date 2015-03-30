module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      css: {
        files: 'scss/**/*.scss',
        tasks: ['sass:dev', 'sass:build'],
        options : {
          spawn : false,
        }
      },

      scripts : {
        files : ['js/dev/app.js', 'js/dev/test.js'],
        tasks : ['concat', 'uglify'],
        options : {
          spawn : false,
        },
      },

      images : {
        files : ['images/src/*.{png,jpg,gif}'],
        tasks : ['newer:imagemin']
      }, // watch images added to src folder

    }, // END OF WATCH SCRIPTS

    // TASKS

    concat : {
      dist : {
        src: ['js/dev/app.js', 'js/dev/test.js'],
        dest: 'js/prod/output.js'
      }
    }, //end concat

     uglify : {
      dist : {
        src : 'js/prod/output.js',
        dest : 'js/prod/output.min.js'
      }
    }, //end uglify

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dev: {
        options: {
          outputStyle: 'expanded',
          sourceMap: 'true'
        },
        files: {
          'css/dev/app.css': 'scss/app.scss'
        }
      },
      build: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: { 'css/prod/app.css' : 'scss/app.scss'}
      }
    },

    imagemin : {
      dynamic : {
        files : [{
          expand : true, // Enable dynamic expansion
          cwd : 'images/src/', // source images (not compressed)
          src : ['**/*.{png,jpg,gif}'], // Actual patterns to match
          dest : 'images/dist/' // Destination of compressed files
        }]
      }
    }, //end imagemin


    browserSync : {
      dev : {
        bsFiles : {
          src : ['css/**/*.css', 'images/*.*', 'js/prod/output.min.js', '*.html']
        },
        options : {
          watchTask : true, // < VERY important
          server : "./"
        }
      }
    }
  }); /*end of watch scripts*/

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

//  grunt.registerTask('build', ['sass']);
  //grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('default', ["browserSync", "watch"]);
 //grunt.registerTask('build', ["sass:build", "uglify"]);
}
