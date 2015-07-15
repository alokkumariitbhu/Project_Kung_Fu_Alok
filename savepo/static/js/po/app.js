angular.module('savepo', [
		'savepo.controllers'
])
.config([
	'$httpProvider',
	function($httpProvider) {
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	}
])
