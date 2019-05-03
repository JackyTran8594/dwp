angular.module('UserWebApp').controller('CreateTaskCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal,
                                                                    $uibModalInstance, $timeout, CommonServices, call, vehicle) {

    $scope.call = call;
    $scope.vehicle = vehicle;

    console.log(call);

    $scope.data = {
        "Db": call.Db,
        "SiteId": call.SiteId,
        "Subject": "",
        "CustomerName": (call.CallerCustomer) ? call.CallerCustomer.CustomerName : "",
        "CallId": call.CallId,
        "CustomerPhone": call.CallerId,
        "VIN": (vehicle && vehicle.VIN) ? vehicle.VIN : "",
        "Employee": "",
        "TimeSchedule": "",
        "IsClose": false,
        "Text": "",
    };

    console.log($scope.data);

    $scope.lstCallCenterDb = [];
    $scope.lstCallCenterTaskType = [];
    $scope.lstCallCenterSite = [];
    $scope.lstEmployees = [];

    function loadCommon() {
        CommonServices.getCallCenterDB().then(function (data) {
            $scope.lstCallCenterDb = data;
            if ($scope.lstCallCenterDb && $scope.lstCallCenterDb.length == 1) {
                $scope.data.Db = $scope.lstCallCenterDb[0].Id;
                $scope.loadSite();
            }
        });

        CommonServices.getCallCenterTaskType().then(function (data) {
            $scope.lstCallCenterTaskType = data;
        });

    }

    loadCommon();

    $scope.loadSite = function () {
        HttpService.getData('/site/getCallCenterSites/' + $scope.data.Db, {}).then(function (response) {
            $scope.lstCallCenterSite = response;
            if ($scope.lstCallCenterSite && $scope.lstCallCenterSite.length == 1) {
                $scope.data.SiteId = $scope.lstCallCenterSite[0].Id;
            }
            $scope.getPhoneCallEmployee();
        }, function error(response) {
            $scope.lstCallCenterSite = [];
            $scope.data.SiteId = "";
            $scope.getPhoneCallEmployee();
        });
    }

    $scope.getPhoneCallEmployee = function () {
        $scope.lstEmployees = [];
        if (!$scope.data.Db || !$scope.data.SiteId) {
            return;
        }
        HttpService.getData('/phonecall/getPhoneCallEmployee/' + $scope.data.Db + "/" + $scope.data.SiteId, {}).then(function (response) {
            $scope.lstEmployees = response;
            if ($scope.lstEmployees && $scope.lstEmployees.length == 1) {
                $scope.data.Employee = $scope.lstEmployees[0].SmanId;
            }
        }, function error(response) {
            $scope.data.Employee = "";
        });
    }

    $scope.loadSite();


    $scope.ok = function () {
        var param = {
            "Db": $scope.data.Db,
            "SiteId": $scope.data.SiteId,
            "SubjectId": $scope.data.Subject,
            "CallId": $scope.data.CallId,
            "CustomerName": $scope.data.CustomerName,
            "CustomerPhone": $scope.data.CustomerPhone,
            "VIN": $scope.data.VIN,
            "SmanId": $scope.data.Employee,
            "Started": $scope.data.TimeSchedule,
            "IsClose": $scope.data.IsClose,
            "Body": $scope.data.Text,
        };
        HttpService.postData('/phonecall/createtask/', param, $("#btnSaveTask")).then(function (response) {
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
    $scope.TimeSchedule = new Date();

    $scope.openDate = function (e) {
        e.preventDefault();
        e.stopPropagation();
        $scope.isOpenDate = true;
    };

});