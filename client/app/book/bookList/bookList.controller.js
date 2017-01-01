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
				{ field: 'noOfAvailableBooks' }
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

		/* lookup members */
		angular.extend(vm, {});

		/* functions */
		angular.extend(vm, {
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