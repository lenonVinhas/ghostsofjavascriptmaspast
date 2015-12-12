(function (angular) {
  angular
  .module('SnowballFightApp', ['backand'])
  .config(function (BackandProvider) {
    BackandProvider.setAppName('holidayjs2015gojsteam');
    BackandProvider.setSignUpToken('592a952f-20ae-461a-818c-7e5bef86e7a5');
    BackandProvider.setAnonymousToken('6920c9f8-c09b-4604-a8f0-64898425b7e7');
  })
  .service('leaderBoardService', function ($http, Backand) {
    var _this = this;

    this.getAllScores = function getAllScores() {
      return $http ({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/users',
        params: {
          pageSize: 20,
          pageNumber: 1
        }
      });

    };

    this.addUser = function addUser(user) {
    };

  })
  .directive('leaderBoard', function (leaderBoardService) {
    return {
      restrict: 'E',
      link: function (scope, el, atts) {
        // scope.scores = [
        // { name: 'tim', value: '9000' },
        // { name: 'atim', value: '9000' },
        // { name: 'btim', value: '9000' },
        // { name: 'ctim', value: '9000' },
        // { name: 'dtim', value: '9000' },
        // { name: 'etim', value: '9000' },
        // ];
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
