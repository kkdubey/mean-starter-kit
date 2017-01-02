(function () {
	'use strict';
	angular.module("app").factory('issueBookService', [
        'apiHelper',
        function (apiHelper) {
            return {
                issueBook: _issueBook,
				getNormalUsers: _getNormalUsers
                };
		function _issueBook(book) {
			var url = '/api/books',
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