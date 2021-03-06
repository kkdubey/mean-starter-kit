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
        controller: 'bookListController',
        controllerAs: 'vm'
    });
    $stateProvider.state('dashboard.addBook', {
        url: '/book/add',
        templateUrl: 'app/book/addBook/addBook.tpl.html',
        controller: 'addBookController',
        controllerAs: 'vm'
    });
    $stateProvider.state('dashboard.userList', {
        url: '/user/list',
        templateUrl: 'app/manageUser/userList/userList.tpl.html',
        controller: 'userListController',
        controllerAs: 'vm'
    });
    $stateProvider.state('dashboard.addUser', {
        url: '/user/add',
        templateUrl: 'app/manageUser/addUser/addUser.tpl.html',
        controller: 'addUserController',
        controllerAs: 'vm'
    });
    $stateProvider.state('dashboard.issueBook', {
        url: '/book/issue',
        templateUrl: 'app/manageBooks/issueBook/issueBook.tpl.html',
        controller: 'issueBookController',
        controllerAs: 'vm'
    });
    $stateProvider.state('dashboard.returnBook', {
        url: '/book/return',
        templateUrl: 'app/manageBooks/returnBook/returnBook.tpl.html',
        controller: 'returnBookController',
        controllerAs: 'vm'
    });
    $stateProvider.state('dashboard.borrowBookHistory', {
        url: '/book/borrowBookHistory',
        templateUrl: 'app/transactionHistory/borrowedBookList/borrowedBookList.tpl.html',
        controller: 'borrowedBookListController',
        controllerAs: 'vm'
    });
    $stateProvider.state('dashboard.returnBookHistory', {
        url: '/book/returnBookHistory',
        templateUrl: 'app/transactionHistory/returnedBookList/returnedBookList.tpl.html',
        controller: 'returnedBookListController',
        controllerAs: 'vm'
    });
    $urlRouterProvider.otherwise('/auth');
  }
})();
