UserWebApp.controller('ScanBarcodeModalCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, $uibModalInstance, $timeout) {


  // console.log($scope.barcode_default);
  $scope.code = "";
  $scope.barcode = {};
  $scope.lstCodes = [];

  loadBarcode();
  function loadBarcode() {
    $scope.lstCodes = [
      {
        name: "code_128",
        text: "Code 128",
        value: "code_128_reader"
      },
      {
        name: "code_39",
        text: "Code 39",
        value: "code_39_reader"
      },
      {
        name: "code_39_vin",
        text: "Code 39 VIN",
        value: "code_39_vin_reader"
      },
      {
        name: "ean",
        text: "EAN",
        value: "ean_reader"
      },
      {
        name: "ean_extended",
        text: "EAN-extended",
        value: "ean_extended"
      },
      {
        name: "ean_8",
        text: "EAN-8",
        value: "ean_8_reader"
      },
      {
        name: "upc",
        text: "UPC",
        value: "upc_reader"
      },
      {
        name: "upc_e",
        text: "UPC-E",
        value: "upc_e_reader"
      },
      {
        name: "codabar",
        text: "Codabar",
        value: "codabar_reader"
      },
      {
        name: "i2of5",
        text: "Interleaved 2 of 5",
        value: "i2of5_reader"
      },
      {
        name: "2of5",
        text: "Standard 2 of 5",
        value: "2of5_reader"
      },
      {
        name: "code_93",
        text: "Code 93",
        value: "code_93_reader"
      },
    ]

    var barcode_default = JSON.parse(localStorage.getItem("info_barcode"));
    var barcode = $filter('filter')($scope.lstCodes, { value: barcode_default.value.trim() });
    $scope.barcode = barcode[0];
    console.log($scope.barcode);

  }

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