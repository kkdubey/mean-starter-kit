(function () {
	'use strict';

	function addBookController($rootScope, $scope, $q, $document, $location, $state, focus, addBookService, $timeout) {
		var vm = this,
        _errors = [],
        _book = {
            name: null,
            author: null,
            noOfTotalBooks: null,
			noOfAvailableBooks: null,
        };

		/* members */
		angular.extend(vm, {
            Errors: _errors,
            book: _book
        });

		/* functions */
		angular.extend(vm, {
            addBook: function() {
                vm.validateBook();
                if(vm.Errors.length == 0) {
					vm.book.noOfAvailableBooks = vm.book.noOfTotalBooks;
					vm.book.isDeleted = false;
                    addBookService.addBook(vm.book).then(function (response) {
						if (response != undefined)  {
							vm.showSuccess = true;
							vm.successMsg = "User added successfuly."
							$timeout(function() {
								$state.go('dashboard.bookList');
							}, 1000);
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

				$q.all(allPromises).then(function (response) {
				}, function (error) {
					if (typeof console != 'undefined') console.log(error);
				});
			}
		});

		vm.preInit();
		$scope.$on('$routeChangeSuccess', function (event, current, previous) {
			vm.activate();
		});
	}
	addBookController.$inject = ['$rootScope', '$scope', '$q', '$document', '$location', '$state', 'focus', 'addBookService', '$timeout'];
	angular.module('app').controller('addBookController', addBookController);
})();