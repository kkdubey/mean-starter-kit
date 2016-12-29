(function () {
	'use strict';
	angular.module("app").factory('authService', [
        'apiHelper',
        function (apiHelper) {
        	return {
        		registerUser: _registerUser,
        		loginUser: _loginUser
        	};

        	function _registerUser(user) {
        		var url = '/api/users',
                    config = { headers: {} },
	                postdata = user;
        		return apiHelper.post(url, postdata, config);
        	}

        	function _loginUser(user) {
        		var url = '/api/Login',
                    config = { headers: {} },
	                postdata = user;
        		return apiHelper.post(url, postdata, config);
        	}

        }
	]);
})();