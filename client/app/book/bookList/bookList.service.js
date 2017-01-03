(function () {
	'use strict';
	angular.module("app").factory('bookListService', [
        'apiHelper',
        function (apiHelper) {
			return {
				getAllBooks: _getAllBooks,
				deleteBook: _deleteBook,
				};
				
		function _getAllBooks(user) {
			var url = '/api/books',
			config = { headers: {} },
			postdata = user;
			return apiHelper.get(url, postdata, config);
		}	

		function _deleteBook(bookId) {
			var url = '/api/deleteBook/'+ bookId,
			config = { headers: {} };
			return apiHelper.put(url, config);
		}

        }
	]);
})();