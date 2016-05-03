'use strict';
angular.module('trackingSystem.app-directives.issues-view',[])
    .directive("issueView", [function () {
        return {
            restrict: 'A',
            templateUrl: 'app/app-directives/issue-view.html'
        };
    }]);