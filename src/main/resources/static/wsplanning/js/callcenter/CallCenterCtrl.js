angular.module('UserWebApp').controller('CallCenterCtrl', function ($scope, $rootScope, $state,$timeout, HttpService, $translate, $location, $state, $filter, $uibModal, CommonServices) {
    $scope.code = "";

    var EmployeeData = $("#EmployeeData").data("employee");
    if (EmployeeData) {
        $scope.SmanId = EmployeeData.SmanId;
    }

    $scope.toogleActiveCall = function () {
        $rootScope.$broadcast("toogleActiveCall", {"item": {}});
    }

    $scope.toogleRecentCall = function () {
        $rootScope.$broadcast("toogleRecentCall", {"item": {}});
    }

    $rootScope.cancelReload = false;
    $scope.reload = function () {
        console.log($state.current);
        if($state.current.name != "app.main.callcenter"){
            $rootScope.cancelReload = true;
            return;
        }
        if ($rootScope.cancelReload) {
            return;
        }
        $rootScope.$broadcast("reload", {"item": {}});
        $timeout(function () {
            $scope.reload();
        }, 30000);

    };
    $scope.reload();

});