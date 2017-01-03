(function () {
	'use strict';

	function addUserController($rootScope, $scope, $q, $document, $location, focus, authService) {
		var vm = this,
        _errors = [],
		_showSuccess = false,
		_successMsg = null,
        _user = {
            name: null,
            phoneNumber: null,
            email: null,
            password: null,
			userType: null
        };

		/* members */
		angular.extend(vm, {
            Errors: _errors,
            user: _user,
			showSuccess: _showSuccess,
			successMsg: _successMsg
        });

		/* lookup members */
		angular.extend(vm, {});

		/* functions */
		angular.extend(vm, {
            addUser: function() {
                vm.validateUser();
                if(vm.Errors.length == 0) {
                    authService.registerUser(vm.user).then(function (response) {
						if (response != undefined)  {
							vm.showSuccess = true;
							vm.successMsg = "User added successfuly."
							$timeout(function() {
								$state.go('dashboard.userList');
							}, 1000);
						}
					}, function (error) {
						debugger;
					});
                }
            },
            validateUser: function() {
                vm.Errors = [];
                if (vm.user.name == undefined || vm.user.name == '') {
					var error = { id: 'name', text: 'Please enter Full Name' };
					vm.Errors.push(error);
				}
				if (vm.user.email == undefined || vm.user.email == '') {
					var error = { id: 'email', text: 'Please enter email' };
					vm.Errors.push(error);
				}
				if (vm.user.phoneNumber == undefined || vm.user.phoneNumber == '') {
					var error = { id: 'mobile', text: 'Please enter Phone Number' };
					vm.Errors.push(error);
				}
				if (vm.user.userType == undefined || vm.user.userType == '') {
					var error = { id: 'userType', text: 'Please select user type' };
					vm.Errors.push(error);
				}
				if (vm.user.password == undefined || vm.user.password == '') {
					var error = { id: 'password', text: 'Please enter password' };
					vm.Errors.push(error);
				}
            },
			goToElement: function (id) {
				focus(id);
			},
			preInit: function () {
                if (Storage != undefined && sessionStorage != undefined) {
                    var _user = JSON.parse(sessionStorage.getItem('logedInUser'));
                    if(_user == undefined || _user._id == undefined || _user._id == '') {
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
	addUserController.$inject = ['$rootScope', '$scope', '$q', '$document', '$location', 'focus', 'authService'];
	angular.module('app').controller('addUserController', addUserController);
})();