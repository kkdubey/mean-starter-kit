(function () {
	'use strict';
	angular.module("app").factory('returnBookService', [
        'apiHelper',
        function (apiHelper) {
            return {
                returnBook: _returnBook,
				getNormalUsers: _getNormalUsers
                };
		function _returnBook(book) {
			var url = '/api/returnBook',
			config = { headers: {} },
			postdata = book;
			return apiHelper.post(url, postdata, config);
		}

		function _getNormalUsers() {
			var url = '/api/getNormalUsers',
			config = { headers: {} };
			return apiHelper.get(url, config);
		}
	}
	]);
})();