angular.module('ionicSound')
    .controller('homeService', ['$scope', '$http', '$ionicModal', '$ionicPlatform', function($scope, $http, $ionicModal, $ionicPlatform) {

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
            $scope.modal2.show(data);
        }
    }]);
