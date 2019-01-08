UserWebApp.controller('TodayWorkOrderCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal) {
  $scope.lstAllData = [];
  $scope.lstData = [];
  $scope.lstSearch = [];
  $scope.totalElements = 0;

  // $scope.params = {
  //   "department": "300",
  //   "trans": "W",
  //   "visitReason": "03",
  //   "serv": "",
  // };

  $scope.params = {
    "department": "",
    "trans": "",
    "visitReason": "",
    "serv": "",
  };

  $scope.searchValue = '';
  $scope.limit = 20;
  $scope.page = 1;

  function reset() {
    $scope.params = {
      "department": "",
      "trans": "",
      "visitReason": "",
      "serv": "",
    };
    $scope.searchValue = '';
    $scope.limit = 20;
    $scope.page = 1;
  }

  loadCommon();
  $scope.lstTrans = [];
  $scope.lstDepartment = [];
  $scope.lstServ = [];
  $scope.lstVisitReason = [];

  function loadCommon() {
    $scope.lstTrans = [];
    $scope.lstDepartment = [];
    $scope.lstServ = [];
    $scope.lstVisitReason = [];
    common.spinner(true);

    HttpService.getData('/site/getTransactionTypes', {}).then(function (response) {
      console.log(response);
      $scope.lstTrans = response;
      common.spinner(false);
    }, function error(response) {
      console.log(response);
      common.spinner(false);
    });

    HttpService.getData('/site/getDepartments', {}).then(function (response) {
      console.log(response);
      $scope.lstDepartment = response;
      common.spinner(false);
    }, function error(response) {
      console.log(response);
      common.spinner(false);
    });

    HttpService.getData('/site/getPayers', {}).then(function (response) {
      console.log(response);
      common.spinner(false);
    }, function error(response) {
      console.log(response);
      common.spinner(false);
    });

    HttpService.getData('/site/getVisitReasons', {}).then(function (response) {
      console.log(response);
      $scope.lstVisitReason = response;
      common.spinner(false);
    }, function error(response) {
      console.log(response);
      common.spinner(false);
    });
  }

  function loadData(count) {
    common.spinner(true);

    //unScheduledWO, withSubcontractor, todayWO, allWO, withMOT, withTire, withBO, postponedWO, offers
    var params = {
      // "ViewName": "todayWO",
      "ViewName": "allWO",
      "skey": $scope.searchValue,
      "page": $scope.page,
      "limit": $scope.limit,
      "DeptId": $scope.params.department,
      "TransactionType": $scope.params.trans,
      "VisitReasonCode": $scope.params.visitReason,
      "Receiver": $scope.params.serv,
    };

    if(count) {
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
    $rootScope.$broadcast("modalFrm", {"item": {}});
  }

  $scope.editItem = function (item) {
    $('#modalFrm').modal('show');
    $rootScope.$broadcast("modalFrm", {"item": angular.copy(item, {})});
  }

  $scope.testModal = function () {
    $("#modal_default").modal("show");
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

    html += item.JobTitle;
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

});