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

example.controller("ExampleController", function($scope, $cordovaMedia, $ionicLoading, $rootScope) {
    document.addEventListener("deviceready", onDeviceReady, false);
    $rootScope.podcastPositionSeconds = 0;
    $rootScope.bookmarkList = [];
    $rootScope.bookmarkedSong = {};

    function onDeviceReady() {
        console.log(Media);
    }
    $scope.podcastPosition = function() {
        console.log('in podcast position');
        var trackPosition = $rootScope.podcastPositionSeconds;
        // console.log($rootScope.playlist);
        console.log(trackPosition);
        for (var i = 0; i < $rootScope.playlist.length; i++) {

            var startTime = $rootScope.playlist[i].start;
            var endTime = $rootScope.playlist[i].end;

            var a = startTime.split(':');
            var b = endTime.split(':');

            var startTimeInSeconds = (+a[0]) * 60 + (+a[1]);
            var endTimeInSeconds = (+b[0]) * 60 + (+b[1]);

            console.log(startTimeInSeconds);
            console.log(endTimeInSeconds);

            var startTimeInt = parseInt($rootScope.playlist[i].start);
            var endTimeInt = parseInt($rootScope.playlist[i].end);

            console.log($rootScope.playlist[i].start);
            console.log($rootScope.playlist[i].end);
            // console.log(startTimeInt);
            // console.log(endTimeInt);

            var startTimeString = startTimeInSeconds.toString();
            var endTimeString = endTimeInSeconds.toString();
            // console.log(startTimeString);
            // console.log(endTimeString);
           


            if ((trackPosition >= startTimeInSeconds) && (trackPosition <= endTimeInSeconds)) {
                console.log($rootScope.playlist[i].artist);
                console.log($rootScope.playlist[i].songtitle);
                 var artistName = $rootScope.playlist[i].artist;
            var songTitle = $rootScope.playlist[i].songtitle;
            var bookmarkedSong = {
                artist : artistName,
                title: songTitle
            }
            $rootScope.bookmarkList.push(bookmarkedSong);
            } else {
        
            }
        }
    }

    $scope.play = function(src) {
        console.log('src: ' + src);
        var media = $cordovaMedia.newMedia(src, null, null, mediaStatusCallback);
        var mediaTimer = setInterval(function() {
            console.log('boom');
            $rootScope.podcastPositionSeconds++;
            console.log($rootScope.podcastPositionSeconds);
        }, 1000);
        //play audio
        media.play();
        //pause audio
        $scope.pause = function() {
            if (src) {
                media.pause();
                console.log();
            }
        }
    

    };

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
                    controller: 'bookmarkCtrl'
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
                    controller: 'homeService'
                }
            }
        });
    $urlRouterProvider.otherwise('/app/home');
});
