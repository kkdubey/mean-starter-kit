(function () {
	'use strict';
	angular.module("app").factory('bookListService', [
        'apiHelper',
        function (apiHelper) {
			return {
				getAllBooks: _getAllBooks,
				};
				
		function _getAllBooks(user) {
			var url = '/api/books',
			config = { headers: {} },
			postdata = user;
			return apiHelper.get(url, postdata, config);
			}

        }
	]);
})();