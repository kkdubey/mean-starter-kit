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
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: '/app/dashboard/dashboard.tpl.html',
      controller: 'dashboardController',
      controllerAs: 'vm'
    });
    $stateProvider.state('dashboard.bookList', {
        url: '/book/list',
        templateUrl: 'app/book/bookList/bookList.tpl.html',
        controller: 'bookListController'
    });
    $stateProvider.state('dashboard.addBook', {
        url: '/book/add',
        templateUrl: 'app/book/addBook/addBook.tpl.html',
        controller: 'addBookController'
    });
    $urlRouterProvider.otherwise('/auth');
  }
})();
