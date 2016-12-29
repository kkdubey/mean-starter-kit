(function() {
  'use strict';

  angular
    .module('app')
    .config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
      url: '/',
      template: '<main></main>'
    });

    $stateProvider.state('auth', {
      url: '/auth',
      templateUrl: '/app/auth/auth.tpl.html',
      controller: 'authController',
      controllerAs: 'vm'
    });
    $stateProvider.state('admin', {
      url: '/admin',
      templateUrl: '/app/admin/admin.tpl.html',
      controller: 'adminController',
      controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/auth');
  }
})();
