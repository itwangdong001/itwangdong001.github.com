module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.initConfig({
		uglify:{
			ya1:{
				src:'tmp/index.js',
				dest:'dest/index.min.js'
			}
		},
		concat:{
			con1:{
				src:'src/*.js',
				dest:'tmp/index.js'
			}
		},
		clean:['tmp']
	});
	grunt.registerTask('default',['concat','uglify','clean']);
};
