UserWebApp.controller('CreateTaskCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal,
                                                  $uibModalInstance, $timeout, CommonServices,call, vehicle) {

    $scope.call = call;
    $scope.vehicle = vehicle;

    $scope.data = {
        "Db": call.Db,
        "SiteId": call.SiteId,
        "Subject": "Subject",
        "CustomerName": (call.CallerCustomer ) ? call.CallerCustomer.CustomerName : "",
        "CustomerPhone": (call.CallerCustomer ) ? call.CallerCustomer.Tel1 : "",
        "VIN": (vehicle && vehicle.VIN ) ? vehicle.VIN : "",
        "Employee": "",
        "TimeSchedule": "",
        "IsClose": true,
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
            if($scope.lstCallCenterDb && $scope.lstCallCenterDb.length == 1){
                $scope.data.Db = $scope.lstCallCenterDb[0].Id;
                $scope.loadSite();
            }
        });

        CommonServices.getCallCenterTaskType().then(function (data) {
            $scope.lstCallCenterTaskType = data;
        });

        CommonServices.getEmployees().then(function (data) {
            $scope.lstEmployees = data;
        });

    }

    loadCommon();

    $scope.loadSite = function(){
        HttpService.getData('/site/getCallCenterSites/'+$scope.data.Db, {}).then(function (response) {
            $scope.lstCallCenterSite = response;
            if($scope.lstCallCenterSite && $scope.lstCallCenterSite.length == 1){
                $scope.data.SiteId = $scope.lstCallCenterSite[0].Id;
            }
        }, function error(response) {
            $scope.lstCallCenterSite = [];
            $scope.data.SiteId = "";
        });
    }

    $scope.loadSite();



    $scope.ok = function () {
        $uibModalInstance.close($scope.data);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});