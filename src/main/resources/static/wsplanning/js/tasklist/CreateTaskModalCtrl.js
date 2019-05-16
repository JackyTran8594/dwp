angular.module('UserWebApp').controller('CreateTaskModalCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal,
                                                                    $uibModalInstance, $timeout, CommonServices) {
    $scope.data = {};
    $scope.data.Id = "0";
    $scope.data.action = "insert";
    $scope.data.Started = new Date();

    $scope.lstTaskType = [];
    $scope.lstTaskSeries = [];
    $scope.lstEmployees = [];

    $scope.isShow = false;
    $scope.toogleShow = function () {
        $scope.isShow = !$scope.isShow;
    }

    function loadCommon() {
        CommonServices.getTaskTypes().then(function (data) {
            $scope.lstTaskType = data;
        });

        CommonServices.getTaskSeries().then(function (data) {
            $scope.lstTaskSeries = data;
        });

        CommonServices.getEmployees().then(function (data) {
            $scope.lstEmployees = data;
        });


    }

    loadCommon();


    $scope.ok = function () {
        HttpService.postData('/tasklist/saveTask', $scope.data, $("#btnSaveTask")).then(function (response) {
            if(response == false || response == "false"){
                common.notifyError($translate.instant('saveError'));
                return;
            }
            $uibModalInstance.close($scope.data);
            common.notifySuccess($translate.instant('saveSuccessfully'));
        }, function error(response) {
            common.notifyError($translate.instant('saveError'), err.status);
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


    var that = this;

    $scope.isOpenDate = false;

    $scope.openDate = function (e) {
        e.preventDefault();
        e.stopPropagation();
        $scope.isOpenDate = true;
    };



    //Modal
    var $ctrl = this;
    $ctrl.TaskCustomer = null;
    $ctrl.animationsEnabled = true;

    $ctrl.openSearchCustomer = function (size, item) {
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            templateUrl: '/wsplanning/templates/pages/common/customer-form.html',
            controller: 'CustomerModalCtrl',
            controllerAs: '$ctrl',
            size: size,
            backdrop: 'static',
        });

        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
            $ctrl.TaskCustomer = selectedItem;
            $scope.data.TaskCustomer = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };


});

UserWebApp.controller('CustomerModalCtrl', function ($scope, $rootScope, $locale, HttpService, $translate,
                                                     $location, $state, $filter, $uibModal, $uibModalInstance, CommonServices) {



    var $ctrl = this;

    $scope.skey = "";
    $scope.custNo = "";

    $scope.lstCustomers = []

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    function loadData(skey, custNo) {
        CommonServices.getCustomers(skey, custNo).then(function (data) {
            console.log(data);
            $scope.lstCustomers = data;
        })
    }


    $scope.doSearch = function () {
        loadData($scope.skey, $scope.custNo)
    }

    loadData($scope.skey, $scope.custNo);

    $scope.doPick = function (selectedItem) {
        $uibModalInstance.close(selectedItem);
    }

})