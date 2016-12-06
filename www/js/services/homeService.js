angular.module('ionicSound')
    .controller('homeService', ['$scope', '$http', function($scope, $http, $q) {


        var url = 'podcast.json';

        $http.get(url).success(function(data) {
            $scope.shows = data.shows;
            console.log(data);

        });
    }]);
