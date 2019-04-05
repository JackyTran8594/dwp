UserWebApp.controller('ScanBarcodeModalCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, $uibModalInstance) {

  $scope.code = "";

  $scope.$watch("code", function (newValue, oldValue) {
    if (newValue != oldValue) {
      console.log("$watch: " + newValue);
    }
  });

  $scope.ok = function () {
    $uibModalInstance.close($("#resultScan").val());
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


});