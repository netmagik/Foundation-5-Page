module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/*.scss',
        tasks: ['sass'],
        options : {
          spawn : false,
        }
      },

      images : {
        files : ['images/src/*.{png,jpg,gif}'],
        tasks : ['newer:imagemin']
      }, // watch images added to src folder

    },


    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourcemap: 'true'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
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
          src : ['css/*.css', 'images/*.*', 'js/*.js', '*.html']
        },
        options : {
          server : {
            baseDir : "./"

          },
          watchTask : true // < VERY important
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-browser-sync');

//  grunt.registerTask('build', ['sass']);
  //grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('default', ["browserSync", "watch"]);
}
