(function () {
	'use strict';

	function userListController($rootScope, $scope, $q, $document, $location, focus, authService, userListService) {
		var vm = this,
        _errors = [],
        _userGridOptions = {
			enableSorting: true,
			columnDefs: [
				{ field: 'name' },
				{ field: 'email' },
				{ field: 'phoneNumber' },
				{ field: 'userType' }
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
			userGridOptions: _userGridOptions
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

                allPromises['getUsersPromise'] = userListService.getAllUsers();

				$q.all(allPromises).then(function (response) {
                    vm.userGridOptions.data = response.getUsersPromise ? response.getUsersPromise : [];
				}, function (error) {
					if (typeof console != 'undefined') console.log(error);
				});
			}
		});

		vm.preInit();
		vm.activate();
	}
	userListController.$inject = ['$rootScope', '$scope', '$q', '$document', '$location', 'focus', 'authService', 'userListService'];
	angular.module('app').controller('userListController', userListController);
})();