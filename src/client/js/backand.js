(function (angular) {
    angular
    .module('SnowballFightApp', ['backand'])
    .config(function (BackandProvider) {
        BackandProvider.setAppName('gojs');
        BackandProvider.setSignUpToken('0820fd61-2cf4-43a2-b941-aa7f327ab256');
        BackandProvider.setAnonymousToken('d7992fbc-3b2e-4a46-9c93-bbdd00748af3');
    })
    .service('leaderBoardService', function ($http, Backand) {
        var _this = this;

        this.getAllScores = function getAllScores () {
            return $http({
                method: 'GET',
                url: Backand.getApiUrl() + '/1/users/',
                params: {
                    pageSize: 20,
                    pageNumber: 1
                }
            });
        };
    })
    .directive('leaderBoard', function (leaderBoardService) {
        return {
            restrict: 'E',
            link: function (scope, el, atts) {
                scope.scores = [
                { name: 'tim', value: '9000' },
                { name: 'atim', value: '9000' },
                { name: 'btim', value: '9000' },
                { name: 'ctim', value: '9000' },
                { name: 'dtim', value: '9000' },
                { name: 'etim', value: '9000' },
                ];
            }
        };
    });
})(window.angular);
