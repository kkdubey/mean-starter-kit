(function () {
	'use strict';

	function bookListController($rootScope, $scope, $q, $document, $location, focus, authService, bookListService) {
		var vm = this,
        _errors = [],
        _bookGridOptions = {
			enableSorting: true,
			columnDefs: [
				{ field: 'name' },
				{ field: 'author' },
				{ field: 'noOfTotalBooks' },
				{ field: 'noOfAvailableBooks' },
				{ field: 'isDeleted', name: 'isDeleted', cellTemplate: '<span>{{grid.appScope.vm.isDeleted(row.entity)}}</span>'},
				{ name: 'Action', field: 'Action', cellTemplate: '<a data-ng-click="grid.appScope.vm.deleteBook(row.entity)">{{grid.appScope.vm.getDeleteButtonText(row.entity)}}</a>' }
			],
			onRegisterApi: function( gridApi ) {
				vm.grid1Api = gridApi;
			}
        },
        _user = {
            name: null,
            phoneNumber: null,
            email: null,
            password: null,
        };

		/* members */
		angular.extend(vm, {
            Errors: _errors,
            user: _user,
			bookGridOptions: _bookGridOptions
        });

		/* functions */
		angular.extend(vm, {
			isDeleted: function(row) {
				if (row.isDeleted) {
					return "Yes"
				} else {
					return "No";
				}
			},
			getDeleteButtonText: function(row) {
				if (!row.isDeleted) {
					return "Delete"
				} else {
					return "Already deleted";
				}
			},
			deleteBook: function(row) {
				console.log(row);
				if(!row.isDeleted) {
					bookListService.deleteBook(row._id).then(function(response){
						console.log(response);
					});
				}
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

                allPromises['getBooksPromise'] = bookListService.getAllBooks();

				$q.all(allPromises).then(function (response) {
                    vm.bookGridOptions.data = response.getBooksPromise ? response.getBooksPromise : [];
				}, function (error) {
					if (typeof console != 'undefined') console.log(error);
				});
			}
		});

		vm.preInit();
		vm.activate();
	}
	bookListController.$inject = ['$rootScope', '$scope', '$q', '$document', '$location', 'focus', 'authService', 'bookListService'];
	angular.module('app').controller('bookListController', bookListController);
})();