UserWebApp.controller('HeaderDetailCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  $scope.WorkOrderId = $stateParams.id;
  $scope.type = $stateParams.type;

  // $scope.WorkOrder = $scope.$parent.WorkOrder
  console.log($scope.WorkOrder);

  console.log($scope.WorkOrderId);
  console.log($scope.type);


  //DATETIME PICKER
  var that = this;

  $scope.isOpenServiceDate = false;
  $scope.ServiceDate = new Date();

  $scope.openServiceDate = function (e) {
    e.preventDefault();
    e.stopPropagation();
    $scope.isOpenServiceDate = true;
  };


  $scope.isOpenCheckOutDate = false;
  $scope.openCheckOutDate = function (e) {
    e.preventDefault();
    e.stopPropagation();
    $scope.isOpenCheckOutDate = true;
  };

  $scope.isOpenCheckInDate = false;
  $scope.openCheckInDate = function (e) {
    e.preventDefault();
    e.stopPropagation();
    $scope.isOpenCheckInDate = true;
  };

  $scope.isOpenExecutionDate = false;
  $scope.openExecutionDate = function (e) {
    e.preventDefault();
    e.stopPropagation();
    $scope.isOpenExecutionDate = true;
  };

  // data for next tab
  WorkOrderService.shareData.postAction = "saveHeader";
  WorkOrderService.shareData.data = JSON.stringify($scope.WorkOrder);
  //


  $scope.checkSubmit = function (param) {
    // if(param)
  }

  $rootScope.isSubmitHeader = false;

  $scope.onSubmitForm = function () {
    $rootScope.isSubmitHeader = true;
    var data = JSON.stringify($scope.WorkOrder);
    console.log(data);
    var postAction = "saveHeader";
    WorkOrderService.postWorkOrder(data, postAction).then(function (res) {
      console.log(res);
      common.notifySuccess("Successfully!!!");
    }, function (err) {
      console.log(err);
      common.notifyError("Error!!!", err.status);
    })
  }

});