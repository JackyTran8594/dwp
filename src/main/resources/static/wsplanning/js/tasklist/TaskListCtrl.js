angular.module('UserWebApp').controller('TaskListCtrl', function ($scope, $rootScope, $state,$timeout, HttpService, $translate, $location, $state, $filter, $uibModal, CommonServices) {
    $scope.code = "";

    var EmployeeData = $("#EmployeeData").data("employee");
    if (EmployeeData) {
        $scope.SmanId = EmployeeData.SmanId;
    }

    $scope.toogleOpenTask = function () {
        $rootScope.$broadcast("toogleOpenTask", {"item": {}});
    }

    $scope.toogleCloseTask = function () {
        $rootScope.$broadcast("toogleCloseTask", {"item": {}});
    }

    $rootScope.cancelReload = false;
    $scope.reload = function () {
        console.log($state.current);
        if($state.current.name != "app.main.tasklist"){
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

    $scope.onRefresh = function(){
        common.spinner(true);
        $rootScope.cancelReload = false;
        $rootScope.$broadcast("reload", {"item": {}});
        $timeout(common.spinner(false),1000);
    }

    $scope.markDone = function(item,action){
        common.spinner(true);
        item.action = action,
        HttpService.postData('/tasklist/saveTask', item).then(function (response) {
            common.spinner(false);
            common.notifySuccess($translate.instant('saveSuccessfully'));
            $scope.reload();
        }, function error(response) {
            common.spinner(false);
            common.notifyError($translate.instant('saveError'), err.status);
        });
    }

    $scope.openModal = function () {
        $rootScope.cancelReload = true;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/wsplanning/templates/pages/common/create-task.html',
            controller: 'CreateTaskModalCtrl',
            controllerAs: '$ctrl',
            size: "full",
            resolve: {
            }
        });

        modalInstance.result.then(function (value) {
            console.log(value);
            $rootScope.cancelReload = false;
            $scope.reload();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
            $rootScope.cancelReload = false;
            $scope.reload();
        });
    }

});