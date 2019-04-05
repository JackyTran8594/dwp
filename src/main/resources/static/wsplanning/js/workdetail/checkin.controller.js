UserWebApp.controller('CheckInCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $timeout, $window, $element) {

  $scope.imgTemplate = "";


  $scope.template = "1";


  $scope.changeTemplate = function () {
    $scope.base64Encode = "";
    common.spinner(true);
    HttpService.postData('/checkin/template', {type: $scope.template}).then(function (response) {
      $scope.imgTemplate = "data:image/png;base64," + response.base64;
      common.spinner(false);
    }, function error(response) {
      $scope.imgTemplate = "";
      console.log(response);
      common.spinner(false);
    });
  }

  $scope.changeTemplate();



  $scope.onSubmitForm = function () {
    console.log($scope.imgTemplate);
    console.log($scope.dataurl);
  }


  //Save from button header
  $rootScope.$on('saveCheckin', function (event, obj) {
    $scope.onSubmitForm();
  });


});