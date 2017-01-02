(function () {
	'use strict';

	function issueBookController($rootScope, $scope, $q, $document, $location, focus, issueBookService, bookListService) {
		var vm = this,
        _errors = [],
		_issueBook = {
			user: {},
		},
		_users = [],
		_books = [],
        _book = {
            name: null,
            author: null,
            noOfTotalBooks: null,
			noOfAvailableBooks: null,
        };

		/* members */
		angular.extend(vm, {
            Errors: _errors,
            book: _book,
			issueBook: _issueBook,
			users: _users,
			books: _books
        });

		/* lookup members */
		angular.extend(vm, {});

		/* functions */
		angular.extend(vm, {
            issueBook: function() {
                vm.validateBook();
                if(vm.Errors.length == 0) {
					vm.book.noOfAvailableBooks = vm.book.noOfTotalBooks;
                    issueBookService.addBook(vm.book).then(function (response) {
						if (response != undefined)  {
							vm.showSuccess = true;
							vm.successMsg = "User added successfuly."
							//$location.path("/#/dashboard/user/list");
						}
					}, function (error) {
						debugger;
					});
                }
            },
            validateBook: function() {
                vm.Errors = [];
                if (vm.book.name == undefined || vm.book.name == '') {
					var error = { id: 'name', text: 'Please enter Book Name' };
					vm.Errors.push(error);
				}
				if (vm.book.author == undefined || vm.book.author == '') {
					var error = { id: 'author', text: 'Please enter author' };
					vm.Errors.push(error);
				}
				if (vm.book.noOfTotalBooks == undefined || vm.book.noOfTotalBooks == '') {
					var error = { id: 'noOfTotalBooks', text: 'Please enter No Of Total Books' };
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
	issueBookController.$inject = ['$rootScope', '$scope', '$q', '$document', '$location', 'focus', 'issueBookService', 'bookListService'];
	angular.module('app').controller('issueBookController', issueBookController);
})();