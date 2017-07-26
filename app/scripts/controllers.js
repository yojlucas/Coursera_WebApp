/*
controllers.js
by: Joy Lucas
5/4/2017
*/


'use strict';

angular.module('lutongbahay')

.controller('MainController', ['$scope', 'viewallFactory', 'favoriteFactory',
                function($scope, viewallFactory, favoriteFactory) {

                  $scope.showItem = false;
                  $scope.message = "Loading ...";

                  $scope.item = viewallFactory.query({
                      featured: "true"
                  })
                  .$promise.then(
                  function(response) {
                      var items = response;
                      $scope.item = items[0];
                      $scope.showItem = true;
                  },
                  function(response) {
                      $scope.message = "Error: " + response.status + " " + response.statusText;
                    
                  });  
}])
//*============VIEWALLCONTROLLER===============================================*/
.controller('ViewallController', ['$scope', 'viewallFactory', 'favoriteFactory', 
                function($scope, viewallFactory, favoriteFactory) {
                                
                  $scope.tab = 1; //the first tab will be selected as active tab.
                  $scope.filtText = '';
                  $scope.showDetails = false;
                  $scope.showFavorites = false;
                  $scope.showMenu = false;  //ng-if=showMenu in the viewall.html
                  $scope.message = "Loading ..."; //handling error messages when server is not working...

                 //to show all the items in the viewall.html
                  viewallFactory.query(
                        function(response) {
                            $scope.items = response;
                            $scope.showMenu = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        });

                        //This function will set the variable to the selected tab index.
                        //Upon Clicking of the tab, the ng-click directive will cause the execution of the select() in the menuCtrl.
                        $scope.select = function(setTab) {
                        $scope.tab = setTab;
                        //Activate Filter
                        if (setTab === 2) {
                            $scope.filtText = "appetizers";
                        }
                        else if (setTab === 3) {
                            $scope.filtText = "mains";
                        }
                        else if (setTab === 4) {
                            $scope.filtText = "desserts";
                        }
                        else if (setTab === 5){
                            $scope.filtText = "other";
                        }
                        else {
                        $scope.filtText = "";  //if none match, do not filter.                                      
                        }
                        };
                        //This function will return true if the current tab is the same as the tab specified in the function parameter.
                        $scope.isSelected = function(checkTab) {
                            return ($scope.tab === checkTab);
                        };

                        $scope.toggleDetails = function() {
                        $scope.showDetails = !$scope.showDetails;         
                        };

                        $scope.toggleFavorites = function() {
                        $scope.showFavorites = !$scope.showFavorites;
                        };

                        $scope.addToFavorites = function(itemId) {
                        console.log('Item added to favorites', itemId);
                            favoriteFactory.save({_id:itemId});
                            $scope.showFavorites = !$scope.showFavorites;
                        };

}])
//*============SELLCONTROLLER=============================*/
 .controller('SellController', ['$scope', 'sellFactory', 
                function($scope, sellFactory) {
                                   
                   //Radio buttons                        
                    $scope.posting = {
                        mychannel:"",
                        image: "",
                        delivery: "",
                        distance:"",
                        location: "",
                        name: "",
                        description: "",
                        category:"",
                        price: "",
                        contact: "",
                        agree:false
                    }; 
                    //If one radio button is selected
                    var channels = [{
                        value: "5miles",
                        label: "Less than 5 miles"
                    }, {
                        value: "10miles",
                        label: "Less than 10 miles"
                    }, {   
                        value:"15miles",
                        label: "Less than 15 miles"
                    }, {
                        value:"20miles",
                        label: "Less than 20 miles"
                    }, {
                        value:"anywhere",
                        label: "Anywhere"  
                    }];
                     $scope.channels = channels;
                     $scope.invalidChannelSelection = false;

                    //To post the item.                       
                    $scope.post = function() {

                        if($scope.posting.agree && ($scope.posting.mychannel === "")){
                            $scope.invalidChannelSelection = true; 
                        } else {
                            $scope.invalidChannelSelection = false;
                            sellFactory.save($scope.posting);

                            $scope.posting = {
                                    mychannel:"",
                                    image: "",
                                    delivery: "",
                                    distance:"",
                                    location: "",
                                    name: "",
                                    description: "",
                                    category:"",
                                    price: "",
                                    contact: "",
                                    agree:false
                            };
                            $scope.posting.mychannel = "";
                            $scope.postForm.$setPristine();
                        }
                    };                            
}])

//*============ITEMDETAILCONTROLLER======================================================*/
.controller('ItemDetailController', ['$scope', '$state', '$stateParams', 'viewallFactory', 'commentFactory', 
                function ($scope, $state, $stateParams, viewallFactory, commentFactory) {
    
                    $scope.item = {};
                    $scope.showItem = false;
                    $scope.message = "Loading ...";

                    $scope.item = viewallFactory.get({
                            id: $stateParams.id
                        })
                        .$promise.then(
                            function (response) {
                                $scope.item = response;
                                $scope.showItem = true;
                            },
                            function (response) {
                                $scope.message = "Error: " + response.status + " " + response.statusText;
                            }
                        );

                    $scope.mycomment = {
                        rating: 5,
                        comment: ""
                    };

                    $scope.submitComment = function () {
                        commentFactory.save({id: $stateParams.id}, $scope.mycomment);
                        $state.go($state.current, {}, {reload: true});
                        $scope.commentForm.$setPristine();
                        $scope.mycomment = {
                            rating: 5,
                            comment: ""
                        };
                };
 }])
//*============FAVORITECONTROLLER===========================*/
.controller('FavoriteController', ['$scope', '$state', 'favoriteFactory', 
                function ($scope, $state, favoriteFactory) {
    
                    $scope.tab = 1;
                    $scope.filtText = '';
                    $scope.showDetails = false;
                    $scope.showDelete = false;
                    $scope.showMenu = false;
                    $scope.message = "Loading ...";
                    
                    favoriteFactory.query(
                        function(response) {
                            $scope.items = response.items;
                            $scope.showMenu = true;
                        },
                        function(response) {
                            $scope.message = "Error: " + response.status + " " + response.statusText;
                        });
                    
                    $scope.select = function (setTab) {
                        $scope.tab = setTab;

                        if (setTab === 2) {
                            $scope.filtText = "appetizers";
                        } else if (setTab === 3) {
                            $scope.filtText = "mains";
                        } else if (setTab === 4) {
                            $scope.filtText = "desserts";
                        } else if (setTab === 5){
                            $scope.filtText = "other";
                        } else {
                            $scope.filtText = "";
                        }
                    };
                    
                    $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                    };

                    $scope.toggleDetails = function () {
                        $scope.showDetails = !$scope.showDetails;
                    };

                    $scope.toggleDelete = function () {
                        $scope.showDelete = !$scope.showDelete;
                    };
                    
                    $scope.deleteFavorite = function(itemId) {
                        console.log('Delete favorites', itemId);
                        favoriteFactory.delete({id: itemId});
                        $scope.showDelete = !$scope.showDelete;
                        $state.go($state.current, {}, {reload: true});
                    };
    
}])

//*============HEADERCONTROLLER==============================================*/
//Handles the login and logout from the Header Bar. 
.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', 
                function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

                    $scope.loggedIn = false;
                    $scope.username = '';

                    //Check if user is authenticated.
                    if(AuthFactory.isAuthenticated()) {
                        $scope.loggedIn = true;
                        $scope.username = AuthFactory.getUsername();
                    }

                    //ng-dialog will be triggered when login button is clicked in the header bar. 
                    $scope.openLogin = function () {
                        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
                    };

                    //will be called when user click the logouot button from the header bar. 
                    $scope.logOut = function() {
                       AuthFactory.logout();
                        $scope.loggedIn = false;
                        $scope.username = '';
                    };

                    //when log in is successful, it will the username in the headerbar.
                    $rootScope.$on('login:Successful', function () {
                        $scope.loggedIn = AuthFactory.isAuthenticated();
                        $scope.username = AuthFactory.getUsername();
                    });

                    $rootScope.$on('registration:Successful', function () {
                        $scope.loggedIn = AuthFactory.isAuthenticated();
                        $scope.username = AuthFactory.getUsername();
                    });

                    //Set the active class of the username in the header.
                    $scope.stateis = function(curstate) {
                       return $state.is(curstate);  
                    };
}])

//*============LOGINCONTROLLER=============================*/

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory',
                function($scope, ngDialog, $localStorage, AuthFactory) {

                    $scope.loginData = $localStorage.getObject('userinfo', '{}');

                    //Call the Authfactory login.
                    $scope.doLogin = function(){
                        if($scope.rememberMe){
                           $localStorage.storeObject('userinfo', $scope.loginData);
                           AuthFactory.login($scope.loginData);
                        }
                           ngDialog.close();
                           };

                    //Register a new user
                    $scope.openRegister = function() {
                         ngDialog.open({template: 'views/register.html', 
                          className: 'ngDialog-message',
                                        controller: "RegisterController" });
                        };
}])

//*============REGISTERCONTROLLER=============================*/
.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory',
            function ($scope, ngDialog, $localStorage, AuthFactory) {
            
                $scope.register={};
                $scope.loginData={};

                $scope.doRegister = function() {
                    console.log('Doing registration', $scope.registration);

                    AuthFactory.register($scope.registration);
                        
                    ngDialog.close();
                };
}])
;
            



