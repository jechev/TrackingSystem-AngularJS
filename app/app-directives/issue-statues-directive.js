'use strict';
angular.module('trackingSystem.app-directives.issues-statues',[])
    .directive("issueStatuses", [function () {
        return {
            restrict: 'A',
            templateUrl: 'app/app-directives/issue-statues.html'
        };
    }]);