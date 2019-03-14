UserWebApp.controller('HeaderDetailCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  $scope.WorkOrderId = $stateParams.id;
  $scope.type = $stateParams.type;

  // $scope.WorkOrder = $scope.$parent.WorkOrder
  console.log($scope.WorkOrder);

  // console.log($scope.WorkOrderId);
  // console.log($scope.type);


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

  // $rootScope.$emit("headerData", { "headerData": $scope.WorkOrder });
  $scope.pristine = false;


  var firstVehicle = {};
  var firstCustomer = {};
  var firstContact = {};

  firstVehicle = Object.assign(firstVehicle, $scope.WorkOrder.WOVehicle);
  console.log(firstVehicle);
  var firstCustomer = Object.assign(firstCustomer, $scope.WorkOrder.WOCustomer);
  var firstContact = Object.assign(firstContact, $scope.WorkOrder.WOContact);

  $scope.$watch('WorkOrder.WOVehicle', function (newValue, oldValue) {
    if (newValue.LicenseNo !== firstVehicle.LicenseNo) {
      $scope.pristine = true;
      // console.log($scope.pristine);
      // console.log(firstVehicle);
    } else {
      $scope.pristine = false;
      console.log($scope.pristine);
    }
  });
 
  $scope.$watch('WorkOrder.WOCustomer', function (newValue, oldValue) {
    if (newValue.CustNo !== firstCustomer.CustNo) {
      $scope.pristine = true;
    }
  });

  $scope.$watch('WorkOrder.WOContact', function (newValue, oldValue) {
    if (newValue.CustNo !== firstContact.CustNo) {
      $scope.pristine = true;
    } else {
      $scope.pristine = false;
    }
  });


  $scope.$on('inputModified.formChanged', function (event, modified, formCtrl) {
    // WorkOrderService.shareData.modified = modified;
    $scope.$emit("headerData", {
      data: $scope.WorkOrder,
      modified: modified
    }
    );
    // pristine = modified;
    console.log(formCtrl.$name);
  });

  $rootScope.isSubmitHeader = false;

  $scope.onSubmitForm = function () {
    $rootScope.isSubmitHeader = true;
    var data = JSON.stringify($scope.WorkOrder);
    console.log(data);
    var postAction = "saveHeader";
    WorkOrderService.postWorkOrder(data, postAction).then(function (res) {
      console.log(res);
      common.notifySuccess("Success!!!");
    }, function (err) {
      console.log(err);
      common.notifyError("Error!!!", err.status);
    })
  }

});