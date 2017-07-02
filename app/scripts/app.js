/*
app.js
by: Joy Lucas
5/4/2017
*/


'use strict';


angular.module('lutongbahay', ['ui.router','ngResource','ngDialog'])
  .config(function ($stateProvider, $urlRouterProvider) {
       $stateProvider
       
       //route for the Mainpage
      .state('app', {
           url:'/',
           views: {
               'header': {
                   templateUrl: 'views/header.html',
                   controller: 'HeaderController'
               },
               'content': {
                   templateUrl: 'views/main.html',
                   controller: 'MainController'
               },
               'footer': {
                   templateUrl: 'views/footer.html'
               }
           }
        })
       // route for the howitworks page
            .state('app.howitworks', {
                url:'howitworks',
                views: {
                    'content@': {
                        templateUrl: 'views/howitworks.html'
                                          
                    }
                }
         })
        //router to order page.
            .state('app.contact', {
                url: 'contact',
                views: {
                    'content@': {
                        templateUrl: 'views/contact.html',
                        controller: 'ContactController'
                    }
                }
         })
         //router to sell page.
            .state('app.sell', {
                url: 'sell',
                views: {
                    'content@': {
                        templateUrl: 'views/sell.html',
                        controller: 'SellController'
                    }
                }
         })
        //router to order page.
            .state('app.favorites', {
                url: 'favorites',
                views: {
                    'content@': {
                        templateUrl: 'views/favorites.html',
                        controller: 'FavoriteController'
                    }
                }
         })   
        //router to viewall page.
            .state('app.viewall', {
                url: 'viewall',
                views: {
                    'content@': {
                        templateUrl: 'views/viewall.html',
                        controller: 'ViewallController'
                    }
                }
         })
         // route for the dishdetail page
            .state('app.itemdetails', {
                url: 'itemdetail',
                views: {
                    'content@': {
                        templateUrl : 'views/itemdetail.html',
                        controller  : 'ItemDetailController'
                   }
                }
            })
    
        //router for register page
             .state('app.register', {
                url: 'register',
                views: {
                    'content@': {
                        templateUrl : 'views/register.html',
                        controller  : 'RegisterController'
                   }
                }
            })
    
        //route to Login
               .state('app.login', {
                url: 'login',
                views: {
                    'content@': {
                        templateUrl: 'views/login.html',
                        controller: 'LoginController'
                    }
                }
         });
   
      $urlRouterProvider.otherwise('/');
  });
