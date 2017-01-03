(function () {
	'use strict';

	function returnedBookListController($rootScope, $scope, $q, $document, $location, focus, transactionHistoryService) {
		var vm = this,
        _errors = [],
        _returnBookGridOptions = {
			enableSorting: true,
			columnDefs: [
				{ name: 'BorrowerName', field: 'BorrowerName', cellTemplate: '<span>{{grid.appScope.vm.getUserInfo(row.entity)}}</span>' },
				{ name: 'BookName', field: 'BookName', cellTemplate: '<span>{{grid.appScope.vm.getBookInfo(row.entity)}}</span>' },
				{ field: 'transactionDate' },
				{ field: 'transactionDate' }
			],
			onRegisterApi: function( gridApi ) {
				vm.grid1Api = gridApi;
			}
        };

		/* members */
		angular.extend(vm, {
			returnBookGridOptions: _returnBookGridOptions
        });

		/* functions */
		angular.extend(vm, {
            getUserInfo: function(row) {
                return 'Name:- '+ row.user.name + ' , Phone Number:- ' + row.user.phoneNumber;
            },
            getBookInfo: function(row) {
                return 'Book Name:- '+ row.book.name + ' , Author Name:- ' + row.book.author;
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

                allPromises['transactionHistoryPromise'] = transactionHistoryService.getTransactionsByType('RETURN');

				$q.all(allPromises).then(function (response) {
                    vm.returnBookGridOptions.data = response.transactionHistoryPromise ? response.transactionHistoryPromise : [];
				}, function (error) {
					if (typeof console != 'undefined') console.log(error);
				});
			}
		});

		vm.preInit();
		vm.activate();
	}
	returnedBookListController.$inject = ['$rootScope', '$scope', '$q', '$document', '$location', 'focus', 'transactionHistoryService'];
	angular.module('app').controller('returnedBookListController', returnedBookListController);
})();