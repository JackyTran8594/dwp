angular.module('UserWebApp').controller('CloseTaskCtrl', function ($scope, $rootScope, $locale, HttpService, $translate, $location, $state, $filter, $uibModal, CommonServices) {
    $scope.isShow = true;

    $rootScope.$on('toogleCloseTask', function () {
        $scope.isShow = !$scope.isShow;
    });

    $rootScope.$on('reload', function () {
        loadData(true);
    });


    //Paging
    $scope.params = {};

    $scope.limit = 20;
    $scope.page = 1;

    function reset() {
        $scope.params = {};
        $scope.limit = 20;
        $scope.page = 1;
    }

    function loadData(count) {
        common.spinner(true);
        var params = {
            "page": $scope.page,
            "limit": $scope.limit,
            "SmanId": $scope.SmanId,
            "bIsOpen": "false",
        };

        HttpService.postData('/tasklist/getdata', params).then(function (response) {
            $scope.lstData = [];
            angular.forEach(response, function (value) {
                if (value.CallerVehicles == null || value.CallerVehicles.length <= 0) {
                    value.CallerVehicles = [{
                        "Make": "",
                        "NextMOTDate": "",
                        "WarrantyInfo": "",
                        "LicenseNo": "",
                    }];
                }
                $scope.lstData.push(value);
            });
            $scope.pageGo = $scope.page;
            common.spinner(false);
        }, function error(response) {
            console.log(response);
            common.spinner(false);
        });

        if (count) {
            HttpService.postData('/tasklist/count', params).then(function (response) {
                $scope.totalElements = response;
                $scope.isNoData = ($scope.totalElements <= 0);
                common.spinner(false);
            }, function error(response) {
                console.log(response);
                common.spinner(false);
            });
        }
    }

    loadData(true);


    //<editor-fold desc="Paging & Search Port">
    $scope.$watch("page", function (newValue, oldValue) {
        if (newValue != oldValue) {
            $scope.page = newValue;
            loadData();
        }
    });

    $scope.go = function () {
        $scope.page = $scope.pageGo;
    }

    $scope.changeLimit = function () {
        loadData(false);
    }
    $scope.doSearch = function () {
        $scope.page = 1;
        $scope.pageGo = 1;
        loadData(true);
    }
    //</editor-fold>


    $scope.createTask = function (call,vehicle) {
        $rootScope.cancelReload = true;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/wsplanning/templates/pages/common/task.html',
            controller: 'CreateTaskCtrl',
            controllerAs: '$ctrl',
            size: "full",
            resolve: {
                call: function () {
                    return call;
                },
                vehicle: function () {
                    return vehicle;
                }
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