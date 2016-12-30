(function () {
	'use strict';

	function userListController($rootScope, $scope, $q, $document, $location, focus, authService) {
		var vm = this,
        _errors = [],
        _login = {
            email: null,
            password: null
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
            LoginErrors : _errors,
            login: _login,
            user: _user
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
	userListController.$inject = ['$rootScope', '$scope', '$q', '$document', '$location', 'focus', 'authService'];
	angular.module('app').controller('userListController', userListController);
})();