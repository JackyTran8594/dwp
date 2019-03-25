UserWebApp.controller('WorkDetailCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state, WorkOrder, lstMonth, WorkOrderService) {
  $scope.WorkOrderId = $stateParams.id;
  $scope.type = $stateParams.type;
  $scope.WOJobs = WorkOrder.data.WOJobs;
  $scope.lstMonth = lstMonth.data;
  $scope.jobObject = {};
  $scope.actionType = "";


  loadCommon();
  $scope.lstTrans = [];
  $scope.lstDepartment = [];
  $scope.lstServ = [];
  $scope.lstVisitReason = [];
  $scope.jobTypes = [];
  $scope.jobCats = [];
  $scope.lstChargeCats = [];
  $scope.lstPayer = [];
  $scope.lstShifts = [];

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

    CommonServices.getShifts().then(function (data) {
      $scope.lstShifts = data;
    });
  }


  checkWorkOrder($stateParams)

  function checkWorkOrder(item) {
    // if (item.data.WOJobs === undefined) {
    // $scope.jobObject = {
    // SiteId: '',
    // CustNo: '',
    // VehiId: '',
    // WarrantyInfo: ''
    // }


    // }
    if (item.id === undefined) {
      $scope.jobObject = {
        SiteId: '',
        CustNo: '',
        VehiId: '',
        WarrantyInfo: ''
      }

      $scope.actionType = "new";
      // $scope.actionType.postAction = "createNew";

    }
    else {
      $scope.jobObject = {
        SiteId: WorkOrder.data.SiteId,
        CustNo: (WorkOrder.data.WOCustomer && WorkOrder.data.WOCustomer.CustNo) ? WorkOrder.data.WOCustomer.CustNo : "0",
        VehiId: (WorkOrder.data.WOVehicle && WorkOrder.data.WOVehicle.VehiId) ? WorkOrder.data.WOVehicle.VehiId : "0",
        WarrantyInfo: (WorkOrder.data.WOVehicle && WorkOrder.data.WOVehicle.WarrantyInfo) ? WorkOrder.data.WOVehicle.WarrantyInfo : "0",
        // WarrantyInfo: "153135"

      }

      $scope.actionType = "update";
      // $scope.actionType.postAction = "saveHeader";
    }
  }

  $scope.WOVehicle = "";
  $scope.WOCustomer = "";
  $scope.WOContact = "";

  $scope.WorkOrder = WorkOrder.data;

  $scope.isNew = angular.equals($scope.WorkOrder, {});

  if ($scope.isNew) {
    var EmployeeData = $("#EmployeeData").data("employee");
    $scope.WorkOrder.DeptId = EmployeeData.DeptId;
  }
  $scope.workOrderNo = WorkOrder.data.WorkOrderNo;

  if ($scope.WorkOrder.ServiceDate == "" || $scope.WorkOrder.ServiceDate == "0001-01-01T00:00:00") {
    $scope.WorkOrder.ServiceDate = "";
  } else {
    $scope.WorkOrder.ServiceDate = new Date($scope.WorkOrder.ServiceDate);
  }
  if ($scope.WorkOrder.CheckOutDate == "" || $scope.WorkOrder.CheckOutDate == "0001-01-01T00:00:00") {
    $scope.WorkOrder.CheckOutDate = "";
  } else {
    $scope.WorkOrder.CheckOutDate = new Date($scope.WorkOrder.CheckOutDate);
  }
  if ($scope.WorkOrder.CheckInDate == "" || $scope.WorkOrder.CheckInDate == "0001-01-01T00:00:00") {
    $scope.WorkOrder.CheckInDate = "";
  } else {
    $scope.WorkOrder.CheckInDate = new Date($scope.WorkOrder.CheckInDate);
  }

  if ($scope.WorkOrder.ExecutionDate == "" || $scope.WorkOrder.ExecutionDate == "0001-01-01T00:00:00") {
    $scope.WorkOrder.ExecutionDate = "";
  } else {
    $scope.WorkOrder.ExecutionDate = new Date($scope.WorkOrder.ExecutionDate);
  }

  if ($scope.WorkOrder.BookMOTDate == "" || $scope.WorkOrder.BookMOTDate == "0001-01-01T00:00:00") {
    $scope.WorkOrder.BookMOTDate = "";
  } else {
    $scope.WorkOrder.BookMOTDate = new Date($scope.WorkOrder.BookMOTDate);
  }

  // $scope.$watch('WorkOrder.Mileage',function(){
  //   console.log($scope.WorkOrder.Mileage);
  //   $scope.WorkOrder.Mileage = $filter('number')($scope.WorkOrder.Mileage);
  //   console.log($scope.WorkOrder.Mileage);
  // });

  $scope.tabActive = "header";

  loadTab($stateParams.id);

  // load job tab with workorderId
  function loadTab(id) {
    if (id == null) {
      return $scope.tabActive = "header";
    }
    return $scope.tabActive = "job";
  }


  $scope.changeTab = function (tabActive, abc) {
    $scope.tabActive = tabActive;
  }


  //Modal
  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  $ctrl.openSearchVehicle = function (size, item) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/common/vehicle-form.html',
      controller: 'VehicleModalCtrl',
      controllerAs: '$ctrl',
      size: size,
      backdrop: 'static',

    });

    modalInstance.result.then(function (selectedItem) {
      // $scope.WOVehicle = selectedItem;
      $scope.jobObject.VehiId = selectedItem.VehiId
      $scope.jobObject.WarrantyInfo = selectedItem.WarrantyInfo
      
      if (selectedItem.PayerCustomer != null) {
        $rootScope.$broadcast("choosePayerCustomer", { "item": selectedItem.PayerCustomer });
        $scope.jobObject.CustNo = selectedItem.PayerCustomer.CustNo;
      }
      console.log($scope.jobObject.VehiId);
      $rootScope.$broadcast("chooseVehicle", { "item": selectedItem });

    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  $ctrl.openSearchCustomer = function (size, item) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/common/customer-form.html',
      controller: 'CustomerModalCtrl',
      controllerAs: '$ctrl',
      size: size,
      backdrop: 'static',

    });

    modalInstance.result.then(function (selectedItem) {
      $scope.WOCustomer = selectedItem;
      $scope.jobObject.CustNo = selectedItem.CustNo

      $rootScope.$broadcast("chooseCustomer", { "item": selectedItem });
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  $ctrl.openSearchContact = function (size, item) {
    console.log("------contact-----");
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/common/customer-form.html',
      controller: 'ContactModalCtrl',
      controllerAs: '$ctrl',
      size: size,
      backdrop: 'static',
      resolve: {
        item: function () {
          return $scope.jobObject
        }
      }

    });

    modalInstance.result.then(function (selectedItem) {
      console.log(selectedItem);

      $scope.WOContact = selectedItem;
      $rootScope.$broadcast("chooseContact", { "item": selectedItem });
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };


});