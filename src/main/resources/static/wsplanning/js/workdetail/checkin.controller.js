UserWebApp.controller('CheckInCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $timeout, $window, $element) {

  $scope.base64Encode = "";
  $scope.imgTemplate = "";


  $scope.template = "1";


  $scope.changeTemplate = function () {
    $scope.base64Encode = "";
    common.spinner(true);
    HttpService.postData('/checkin/template', {type: $scope.template}).then(function (response) {
      $scope.imgTemplate = response.base64;
      loadImg();
      common.spinner(false);
    }, function error(response) {
      $scope.imgTemplate = "";
      console.log(response);
      common.spinner(false);
    });
  }

  $scope.changeTemplate();

  function loadImg() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "data:image/png;base64," + $scope.imgTemplate;

    img.onload = function () {
      ctx.drawImage(img, 0, 0, img.width, img.height,
        0, 0, canvas.width, canvas.height);
    };
  }


  $scope.onSubmitForm = function () {
    $scope.base64Encode = document.getElementById('canvas').toDataURL();
  }


});