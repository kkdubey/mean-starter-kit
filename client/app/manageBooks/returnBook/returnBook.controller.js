(function () {
	'use strict';

	function returnBookController($rootScope, $scope, $q, $document, $location, focus, returnBookService) {
		var vm = this,
        _errors = [],
		_returnBooks = {
			dueDate: null,
			transactionDate: null,
			transactionType: null,
            returnDate: null,
			user: null,
			book: null,
		},
		_users = [],
		_books = [];

		/* members */
		angular.extend(vm, {
            Errors: _errors,
			returnBooks: _returnBooks,
			users: _users,
			books: _books
        });

		/* lookup members */
		angular.extend(vm, {
			getBookBorrowedByUser: function() {

			}
		});

		/* functions */
		angular.extend(vm, {
			onUserChange: function() {
				if(vm.returnBooks.user != undefined && vm.returnBooks.user.books !=undefined) {
					vm.books = vm.returnBooks.user.books;
				} else {
					vm.books = [];
				}
			},
            returnBook: function() {
                vm.validateReturnBook();
                if(vm.Errors.length == 0) {
					vm.returnBooks.transactionDate = new Date();
					vm.returnBooks.transactionType = "RETURN";
					vm.returnBooks.returnDate = new Date();
                    returnBookService.returnBook(vm.returnBooks).then(function (response) {
						if (response != undefined)  {
							vm.showSuccess = true;
							vm.successMsg = "Book returned successfuly."
							$timeout(function() {
								$state.go('dashboard.returnBookHistory');
							}, 1000);
						}
					}, function (error) {
						debugger;
					});
                }
            },
            validateReturnBook: function() {
                vm.Errors = [];
				var error = {};
                if (vm.returnBooks.user == undefined || vm.returnBooks.user == '') {
					error = { id: 'bookUser', text: 'Please select user' };
					vm.Errors.push(error);
				}
				if (vm.returnBooks.book == undefined || vm.returnBooks.book == '') {
					error = { id: 'book', text: 'Please select book' };
					vm.Errors.push(error);
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

                allPromises['getUsersPromise'] = returnBookService.getNormalUsers();

				$q.all(allPromises).then(function (response) {
                    vm.users = response.getUsersPromise ? response.getUsersPromise : [];
				}, function (error) {
					if (typeof console != 'undefined') console.log(error);
				});
			}
		});

		vm.preInit();
		vm.activate();
	}
	returnBookController.$inject = ['$rootScope', '$scope', '$q', '$document', '$location', 'focus', 'returnBookService'];
	angular.module('app').controller('returnBookController', returnBookController);
})();