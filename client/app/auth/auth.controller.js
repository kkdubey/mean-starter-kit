(function () {
	'use strict';

	function authController($rootScope, $scope, $q, $document, $location, focus, authService) {
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
            toggleForm: function() {
                vm.Errors = [];
                vm.LoginErrors = [];
                $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
            },
            registerUser: function() {
                vm.validateRegister();
                if(vm.Errors.length == 0) {
                    vm.user.userType = "NORMAL"
                    authService.registerUser(vm.user).then(function (response) {
						debugger;
						if (response != undefined)  {
							
						}
						console.log(response);
					}, function (error) {
						debugger;
					});
                }
            },
            loginUser: function() {
                vm.validateLogin();
                if(vm.Errors.length == 0) {
                    authService.loginUser(vm.login).then(function (response) {
						if (response != undefined)  {
							if (Storage != undefined && sessionStorage != undefined) {
								sessionStorage.setItem('logedInUser', JSON.stringify(response));
								$location.path('/dashboard');
							}
						}
						console.log(response);
					}, function (error) {
						debugger;
					});
                }
            },
            validateRegister: function() {
                vm.Errors = [];
                if (vm.user.name == undefined || vm.user.name == '') {
					var error = { id: 'userName', text: 'Please enter Full Name' };
					vm.Errors.push(error);
				}
				if (vm.user.email == undefined || vm.user.email == '') {
					var error = { id: 'userEmail', text: 'Please enter email' };
					vm.Errors.push(error);
				}
				if (vm.user.phoneNumber == undefined || vm.user.phoneNumber == '') {
					var error = { id: 'phoneNumber', text: 'Please enter Phone Number' };
					vm.Errors.push(error);
				}
				if (vm.user.password == undefined || vm.user.password == '') {
					var error = { id: 'userPassword', text: 'Please enter password' };
					vm.Errors.push(error);
				}
            },
            validateLogin: function() {
                vm.LoginErrors = [];
				if (vm.login.email == undefined || vm.login.email == '') {
					var error = { id: 'loginEmail', text: 'Please enter email' };
					vm.LoginErrors.push(error);
				}
				if (vm.login.password == undefined || vm.login.password == '') {
					var error = { id: 'loginPassword', text: 'Please enter password' };
					vm.LoginErrors.push(error);
				}
            },
			goToElement: function (id) {
				focus(id);
			},
			preInit: function () {
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
	authController.$inject = ['$rootScope', '$scope', '$q', '$document', '$location', 'focus', 'authService'];
	angular.module('app').controller('authController', authController);
})();