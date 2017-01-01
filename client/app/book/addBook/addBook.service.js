(function () {
	'use strict';
	angular.module("app").factory('addBookService', [
        'apiHelper',
        function (apiHelper) {
        	return {
        		addBook: _addBook
        	};
		function _addBook(book) {
			var url = '/api/books',
			config = { headers: {} },
			postdata = book;
			return apiHelper.post(url, postdata, config);
		}
	}
	]);
})();