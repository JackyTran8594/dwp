UserWebApp.controller('WorkMOTCtrl', function ($scope, $rootScope, $locale, HttpService, $translate, $location, $state, $filter, $uibModal, CommonServices) {
  $scope.lstAllData = [];
  $scope.lstData = [];
  $scope.lstSearch = [];
  $scope.totalElements = 0;

  $scope.params = {
    "department": "",
    "trans": "",
    "visitReason": "",
    "receiver": "",
    "from": "",
    "to": "",
    "myWo": false,
  };

  $scope.searchValue = '';
  $scope.limit = 20;
  $scope.page = 1;

  function reset() {
    $scope.params = {
      "department": "",
      "trans": "",
      "visitReason": "",
      "receiver": "",
      "from": "",
      "to": "",
      "myWo": false,
    };
    $scope.searchValue = '';
    $scope.limit = 20;
    $scope.page = 1;
  }

  // datepicker-vutt

  console.log($locale);

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };


  $scope.openFromDate = function () {
    $rootScope.popupFromDate.opened = true;
  };

  $scope.openToDate = function () {
    $rootScope.popupToDate.opened = true;
  };


  $rootScope.popupFromDate = {
    opened: false
  };

  $rootScope.popupToDate = {
    opened: false
  };


  //


  loadCommon();
  $scope.lstTrans = [];
  $scope.lstDepartment = [];
  $scope.lstServ = [];
  $scope.lstVisitReason = [];

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

  }

  function loadData(count) {
    common.spinner(true);
    //unScheduledWO, withSubcontractor, todayWO, allWO, withMOT, withTire, withBO, postponedWO, offers


    console.log($scope.params);
    var params = {
      // "ViewName": "todayWO",
      "ViewName": "withMOT",
      "skey": $scope.searchValue,
      "page": $scope.page,
      "limit": $scope.limit,
      "DeptId": $scope.params.department,
      "TransactionType": $scope.params.trans,
      "VisitReasonCode": $scope.params.visitReason,
      "Receiver": $scope.params.receiver,
      "MyWO": $scope.params.myWo,
      "FromDate": $scope.params.from,
      "ToDate": $scope.params.to,
    };

    if (count) {
      HttpService.postData('/wo/countWO', params).then(function (response) {
        $scope.totalElements = response;
        $scope.isNoData = ($scope.totalElements <= 0);
        common.spinner(false);
      }, function error(response) {
        console.log(response);
        common.spinner(false);
      });
    }

    HttpService.postData('/wo/getWO', params).then(function (response) {
      $scope.lstData = response;
      $scope.pageGo = $scope.page;
      common.spinner(false);
    }, function error(response) {
      console.log(response);
      common.spinner(false);
    });
  }

  loadData(true);


  //<editor-fold desc="Paging & Search Port">
  $scope.$watch("page", function (newValue, oldValue) {
    if (newValue != oldValue) {
      $scope.page = newValue;
      loadData();
    }
  });

  $scope.go = function () {
    $scope.page = $scope.pageGo;
  }

  $scope.changeLimit = function () {
    loadData(false);
  }
  $scope.doSearch = function () {
    $scope.page = 1;
    $scope.pageGo = 1;
    loadData(true);
  }
  //</editor-fold>

  $scope.onRefresh = function () {
    $scope.limit = '20';
    $scope.page = '1';
    $scope.name = '';

    loadData(true);
    common.btnLoading($('.btnRefresh'), true);
    setTimeout(function () {
      common.btnLoading($('.btnRefresh'), false);
    }, 1000);
  };

  $scope.addItem = function () {
    $('#modalFrm').modal('show');
    $rootScope.$broadcast("modalFrm", { "item": {} });
  }

  $scope.editItem = function (item) {
    $('#modalFrm').modal('show');
    $rootScope.$broadcast("modalFrm", { "item": angular.copy(item, {}) });
  }

  function findAndReplace(string, target, replacement) {

    var i = 0, length = string.length;

    for (i; i < length; i++) {

      string = string.replace(target, replacement);

    }

    return string;

  }

  $scope.showLeftCol = function (item) {
    var html = "";
    var WOVehicle = item.WOVehicle;
    var HolderCustomer = null;
    var WOCustomer = item.WOCustomer;
    if (WOVehicle) {
      html += WOVehicle.LicenseNo + ", " + WOVehicle.Make + " " + WOVehicle.Model + " " + WOVehicle.SubModel + " <br />";
      //HolderCustomer
      HolderCustomer = WOVehicle.HolderCustomer;
    }

    if (HolderCustomer) {
      // html += HolderCustomer.CustomerName + ", " + HolderCustomer.Tel1 + " " + HolderCustomer.Email + " <br />";
      html += HolderCustomer.LName + " " + HolderCustomer.FName + ", " + HolderCustomer.Tel1 + " " + HolderCustomer.Email + " <br />";
    } else {
      // html += WOCustomer.CustomerName + ", " + WOCustomer.Tel1 + " " + WOCustomer.Email + " <br />";
      html += WOCustomer.LName + " " + WOCustomer.FName + ", " + WOCustomer.Tel1 + " " + WOCustomer.Email + " <br />";
    }

    html += findAndReplace(item.JobTitle, "\r\n", "<br />");
    return html;
  }

  //Modal
  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size, item) {
    console.log("----open--------");
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/workOrder/modal-form.html',
      controller: 'TodayWorkModalCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {
        item: function () {
          return item;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };


  //function viewDetail
  $scope.viewDetail = function (item) {
    $state.go('app.main.workdetail', { 'id': item.WorkOrderId, 'type': "todayWO" });
  }

});