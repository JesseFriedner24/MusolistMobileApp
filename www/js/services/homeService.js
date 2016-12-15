angular.module('ionicSound')
    .controller('homeService', ['$scope', '$http', '$ionicModal', '$ionicPlatform', '$rootScope', function($scope, $http, $ionicModal, $ionicPlatform, $rootScope) {
        // $rootscope.showData = url();

        $scope.data = [];
        var url = 'podcast.json';
        $http.get(url).success(function(data) {
            $scope.shows = data.shows;
            console.log(data);

        });
        $ionicModal.fromTemplateUrl('templates/podPlayer.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal2 = modal;
        });

        // Triggered in the login modal to close it
        $scope.closePod = function() {
            $scope.modal2.hide();
        };
        $scope.resultClick = function(data) {

            console.log(data);
            $scope.selectedTrack = data;
            $rootScope.playlist = data.playlist;
            $scope.modal2.show(data);
        }
    
            $scope.images = [];
 
    $scope.loadImages = function() {
        for(var i = 0; i < 100; i++) {
            $scope.images.push({id: i, src: "{{selectedTrack.playlist[1].cover_url}}"});
        }
    }
 
    }]);
