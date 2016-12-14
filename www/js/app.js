// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ionicSound' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var example = angular.module('ionicSound', ['ionic', 'angular-momentjs', 'ngCordova', 'plangular'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }


    });
})

example.controller("ExampleController", function($scope, $cordovaMedia, $ionicLoading) {
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        console.log(Media);
    }
    $scope.play = function(src) {
        console.log('src: ' + src);
        var media = $cordovaMedia.newMedia(src, null, null, mediaStatusCallback);
        console.log(media);
        media.play();
    };


    $scope.pause = function() {
        if (media) {
            var media = $cordovaMedia.newMedia(src, null, null, mediaStatusCallback);
            console.log(media);
            media.pause();
        }
    }


    var mediaStatusCallback = function(status) {
        if (status == 1) {
            $ionicLoading.show({ template: "Loading..." });
        } else {
            $ionicLoading.hide();
        }
    };
})


.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html",
                    controller: 'homeService'
                }
            }
        })
        .state('app.bookmark', {
            url: "/bookmark",
            views: {
                'menuContent': {
                    templateUrl: "templates/bookmark.html",
                    //controller: 'BrowseCtrl'
                }
            }
        })
        .state('app.podcast', {
            url: "/podcast",
            views: {
                'menuContent': {
                    templateUrl: "templates/musolistPod.html",
                    controller: 'musolistPodCtrl'
                }
            }
        })
        .state('app.podplayer', {
            url: "/podplayer",
            views: {
                'menuContent': {
                    templateUrl: "templates/podplayer.html",
                    // controller: 'homeService'
                }
            }
        });
    $urlRouterProvider.otherwise('/app/home');
});
