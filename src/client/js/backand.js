(function (angular) {
  angular
  .module('SnowballFightApp', ['backand'])
  .config(function (BackandProvider) {
    BackandProvider.setAppName('holidayjs2015gojsteam');
    BackandProvider.setAnonymousToken('6920c9f8-c09b-4604-a8f0-64898425b7e7');
  })
  .service('leaderBoardService', function ($http, Backand) {
    var _this = this;

    this.getAllScores = function getAllScores() {
      return $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/users',
        params: {
          pageSize: 20,
          pageNumber: 1
        }
      });
    };

    this.addUser = function addUser(user) {
      return $http({
        method: 'POST',
        url: Backand.getApiUrl() + '/1/objects/users?returnObject=true',
        data: {
          email: user.name + '@holidayjs.com',
          name: user.name,
          score: user.value
        }
      });
    };

  })
  .controller('StartMenuController', ['$scope', 'leaderBoardService', function ($scope, leaderBoardService) {
    var _this = this;

    $scope.gameStart = function gameStart() {
      leaderBoardService.addUser({
        name: this.playerName,
        value: 0
      }).then(function (result) {
        console.log(result);
      });
    };

  }])
  .directive('leaderBoard', function (leaderBoardService) {
    return {
      restrict: 'E',
      link: function (scope, el, atts) {
        leaderBoardService.getAllScores().then(function (response) {
          var scores = response.data.data;
          if (scores.length === 0) {
            scores = [
              { name: 'No Players Have Scored Yet!', value: 0 }
            ];
          }
          scope.scores = scores;

        });
      }
    };
  });
}(window.angular));
