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

  //Date picker
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };


  $scope.openServiceDate = function () {
    $rootScope.popupServiceDate.opened = true;
  };

  $rootScope.popupServiceDate = {
    opened: false
  };

  //CheckOutDate
  $scope.openCheckOutDate = function () {
    $rootScope.popupCheckOutDate.opened = true;
  };

  $rootScope.popupCheckOutDate = {
    opened: false
  };

  //CheckInDate
  $scope.openCheckInDate = function () {
    $rootScope.popupCheckInDate.opened = true;
  };

  $rootScope.popupCheckInDate = {
    opened: false
  };

  //ExecutionDate
  $scope.openExecutionDate = function () {
    $rootScope.popupExecutionDate.opened = true;
  };

  $rootScope.popupExecutionDate = {
    opened: false
  };
  //BookMOTDate
  $scope.openBookMOTDate = function () {
    $rootScope.popupBookMOTDate.opened = true;
  };

  $rootScope.popupBookMOTDate = {
    opened: false
  };

  //BookTireDate
  $scope.openBookTireDate = function () {
    $rootScope.popupBookTireDate.opened = true;
  };

  $rootScope.popupBookTireDate = {
    opened: false
  };

});