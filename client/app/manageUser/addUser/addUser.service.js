(function () {
	'use strict';
	angular.module("app").factory('addUserService', [
        'apiHelper',
        function (apiHelper) {
			return {
				registerUser: _registerUser,
				loginUser: _loginUser
				};

			function _registerUser(user) {
				var url = '/api/auth/register',
				config = { headers: {} },
				postdata = user;
				return apiHelper.post(url, postdata, config);
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