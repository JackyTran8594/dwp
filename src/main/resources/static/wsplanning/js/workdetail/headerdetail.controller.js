UserWebApp.controller('HeaderDetailCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  $scope.WorkOrderId = $stateParams.id;
  $scope.type = $stateParams.type;


  console.log($scope.WorkOrderId);
  console.log($scope.type);

  loadCommon();
  $scope.lstTrans = [];
  $scope.lstDepartment = [];
  $scope.lstServ = [];
  $scope.lstVisitReason = [];
  $scope.jobTypes = [];
  $scope.jobCats = [];
  $scope.lstChargeCats = [];
  $scope.lstPayer = [];

  function loadCommon() {
    CommonServices.getTransactionTypes().then(function (data) {
      $scope.lstTrans = data;
    });
    CommonServices.getDepartments().then(function (data) {
      $scope.lstDepartment = data;
    });
    CommonServices.getVisitReasons().then(function (data) {
      $scope.lstVisitReason = data;
    });
    CommonServices.getServiceAdvisors().then(function (data) {
      $scope.lstServ = data;
    });

    CommonServices.getJobTypes().then(function (data) {
      $scope.jobTypes = data;
    });

    CommonServices.getJobCats().then(function (data) {
      $scope.jobCats = data;
    });
    CommonServices.getChargeCats().then(function (data) {
      $scope.lstChargeCats = data;
    });
    CommonServices.getPayers().then(function (data) {
      $scope.lstPayer = data;
    });

  }
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

  $scope.onSubmitFrm = function () {
    console.log($scope.WorkOrder);
    console.log(formatDateToString($scope.WorkOrder._ServiceDate));
    return;
  }


});