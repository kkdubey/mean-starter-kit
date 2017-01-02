(function () {
	'use strict';

	function issueBookController($rootScope, $scope, $q, $document, $location, focus, issueBookService, bookListService, $filter) {
		var vm = this,
        _errors = [],
		_issueBooks = {
			dueDate: null,
			transactionDate: null,
			transactionType: null,
			user: null,
			book: null,
		},
		_users = [],
		_books = [];

		/* members */
		angular.extend(vm, {
            Errors: _errors,
			issueBooks: _issueBooks,
			users: _users,
			books: _books
        });

		/* lookup members */
		angular.extend(vm, {});

		/* functions */
		angular.extend(vm, {
            issueBook: function() {
                vm.validateIssueBook();
                if(vm.Errors.length == 0) {
					vm.issueBooks.transactionDate = new Date();
					vm.issueBooks.transactionType = "BORROW";
                    issueBookService.issueBook(vm.issueBooks).then(function (response) {
						if (response != undefined)  {
							vm.showSuccess = true;
							vm.successMsg = "Book issued successfuly."
							//$location.path("/#/dashboard/user/list");
						}
					}, function (error) {
						debugger;
					});
                }
            },
            validateIssueBook: function() {
                vm.Errors = [];
				var error = {};
                if (vm.issueBooks.user == undefined || vm.issueBooks.user == '') {
					error = { id: 'bookUser', text: 'Please select user' };
					vm.Errors.push(error);
				}
				if (vm.issueBooks.book == undefined || vm.issueBooks.book == '') {
					error = { id: 'book', text: 'Please select book' };
					vm.Errors.push(error);
				}
				if (vm.issueBooks.dueDate == undefined || vm.issueBooks.dueDate == '') {
					error = { id: 'dueDate', text: 'Please enter Due Date' };
					vm.Errors.push(error);
				}
				if(vm.issueBooks.book.noOfAvailableBooks <= 0) {
					error = { id: 'book', text: 'Selected Book are not available please select other book' };
					vm.Errors.push(error);
				} 
				if(vm.issueBooks.user != undefined && vm.issueBooks.user.books.length > 0) {
					var isAlreadyBorrowed = $filter('objectFilterByProperty')(vm.issueBooks.user.books, '_id', vm.issueBooks.book._id)[0];
					if(isAlreadyBorrowed) {
						error = { id: 'book', text: 'Selected Book is already borrowd by user' };
						vm.Errors.push(error);
					}
				}
            },

			goToElement: function (id) {
				focus(id);
			},
			preInit: function () {
                if (Storage != undefined && sessionStorage != undefined) {
                    vm.user = JSON.parse(sessionStorage.getItem('logedInUser'));
                    if(vm.user == undefined || vm.user._id == undefined || vm.user._id == '') {
                        $location.path('/auth');
                    }
                }
			},
			activate: function () {
				var allPromises = {};

                allPromises['getUsersPromise'] = issueBookService.getNormalUsers();
                allPromises['getBooksPromise'] = bookListService.getAllBooks();

				$q.all(allPromises).then(function (response) {
                    vm.users = response.getUsersPromise ? response.getUsersPromise : [];
                    vm.books = response.getBooksPromise ? response.getBooksPromise : [];
				}, function (error) {
					if (typeof console != 'undefined') console.log(error);
				});
			}
		});

		vm.preInit();
		vm.activate();
	}
	issueBookController.$inject = ['$rootScope', '$scope', '$q', '$document', '$location', 'focus', 'issueBookService', 'bookListService', '$filter'];
	angular.module('app').controller('issueBookController', issueBookController);
})();