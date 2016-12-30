(function () {
	'use strict';
	angular.module("app").factory('userListService', [
        'apiHelper',
        function (apiHelper) {
        	return {
        		getAllUsers: _getAllUsers,
        		loginUser: _loginUser
        	};

        	function _getAllUsers(user) {
        		var url = '/api/users',
                    config = { headers: {} },
	                postdata = user;
        		return apiHelper.get(url, postdata, config);
        	}

        	function _loginUser(user) {
        		var url = '/api/auth/login',
                    config = { headers: {} },
	                postdata = user;
        		return apiHelper.post(url, postdata, config);
        	}

        }
	]);
})();