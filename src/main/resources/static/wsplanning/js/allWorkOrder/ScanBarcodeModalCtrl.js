UserWebApp.controller('ScanBarcodeModalCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, $uibModalInstance, $timeout) {

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


  $rootScope.$on('modalOpen', function () {
    console.log("-modalOpen: " + isMobile);
    if (isMobile && !isIos) {
      $timeout(function () {
        var width = 250, height = 400;
        // console.log(document.getElementsByClassName("drawingBuffer")[0]);
        // document.getElementsByClassName("drawingBuffer")[0].width = width;
        // document.getElementsByClassName("drawingBuffer")[0].height = height;
        //
        // document.getElementsByTagName('video')[0].width = width;
        // document.getElementsByTagName('video')[0].height = height;
      }, 800);
    }

  });

});