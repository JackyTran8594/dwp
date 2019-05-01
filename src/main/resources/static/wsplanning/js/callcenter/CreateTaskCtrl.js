UserWebApp.controller('CreateTaskCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, $uibModalInstance, $timeout, call, vehicle) {

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

    $scope.ok = function () {
        $uibModalInstance.close($scope.data);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});