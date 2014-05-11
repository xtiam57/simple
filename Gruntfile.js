module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    app: {
      src: "src",
      dist: "dist",
      temp: ".temp",
    },

    clean: {
      dist: [
        "<%= app.dist %>/"
      ],
    },

    connect: {
      options: {
        port: 9999,
        protocol: "http",
        hostname: "localhost",
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            "./"
          ]
        }
      }
    },

    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        options: {
          livereload: false
        },
        files: [
          "scss/**/*.scss",
        ],
        tasks: ["sass"]
      },
      css: {
        options: {
          livereload: true
        },
        files: [
          "css/**/*.css"
        ]
      },
      livereload: {
        options: {
          livereload: "<%= connect.options.livereload %>"
        },
        files: [
          "**.html"
        ]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compact', // nested, compact, compressed, expanded
          lineNumbers: true,
          banner: '/* the banner */',
          quiet: true,
          compass: true,
        },
        files: {
          'css/simple.css': 'scss/simple.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-newer");

  grunt.registerTask("default", ["newer:sass", "connect", "watch"]);
};
