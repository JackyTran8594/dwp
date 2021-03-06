UserWebApp.controller('AllWorkOrdersCtrl', function ($scope, $rootScope, $locale, HttpService, $translate, $timeout,$location, $state, $filter, $uibModal, CommonServices, typeWO) {
  $scope.typeWO = typeWO;

  $scope.lstAllData = [];
  $scope.lstData = [];
  $scope.lstSearch = [];
  $scope.totalElements = 0;
  $scope.lstbtnCommon = JSON.parse(localStorage.getItem('info_common'));
  // $scope.params = {
  //   "department": "300",
  //   "trans": "W",
  //   "visitReason": "03",
  //   "serv": "",
  // };

  $scope.buttonType = function (name) {
    var string = "app.main." + name;
    $state.go(string, { 'type': typeWO, 'action': name });
  }

  $scope.params = {
    "department": "",
    "trans": "",
    "visitReason": "",
    "receiver": "",
    "from": "",
    "to": "",
    "myWo": false,
    "shiftId": "",
    "skey": "",
  };

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
      "shiftId": "",
      "skey": "",
    };
    $scope.limit = 20;
    $scope.page = 1;
  }

  // datepicker-vutt

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
  $scope.lstShift = [];

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
    CommonServices.getShifts().then(function (data) {
      $scope.lstShift = data;
    });
  }

  function loadData(count) {
    common.spinner(true);
    //unScheduledWO, withSubcontractor, todayWO, allWO, withMOT, withTire, withBO, postponedWO, offers

    var params = {
      "ViewName": typeWO,
      "skey": $scope.params.skey,
      "page": $scope.page,
      "limit": $scope.limit,
      "DeptId": $scope.params.department,
      "TransactionType": $scope.params.trans,
      "VisitReasonCode": $scope.params.visitReason,
      "shiftId": $scope.params.shiftId,
      "Receiver": $scope.params.receiver,
      "MyWO": $scope.params.myWo,
      "FromDate": $scope.params.from,
      "ToDate": $scope.params.to,
    };

    HttpService.postData('/wo/getWO', params).then(function (response) {
      $scope.lstData = response;
      $scope.pageGo = $scope.page;
      $scope.isShow = false;
      common.spinner(false);
    }, function error(response) {
      console.log(response);
      common.spinner(false);
    });

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

  //Modal
  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size, item) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/modal-form.html',
      controller: 'AllWorkOrderModalCtrl',
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
    $timeout(function() {
      $state.go('app.main.workdetail', {
        'locale': $rootScope.lang,
        'id': item.WorkOrderId,
        'type': typeWO,
        'tab': 'job'
      });
    });
  }

  // $scope.newWorkorder = function () {
  //   $state.go('app.main.newwo', { 'type': typeWO, 'action': "wo" });
  // }

  // $scope.newOffer = function () {
  //   $state.go('app.main.newoffer', { 'type': typeWO, 'action': "offer" });
  // }

  // $scope.newBooking = function () {
  //   $state.go('app.main.booking', { 'type': typeWO, 'action': "booking" });
  // }

  $scope.onRefresh = function () {
    $state.reload();
  }

  $scope.isShow = false;
  $scope.toogleSearch = function () {
    $scope.isShow = !$scope.isShow;
  }

  //openCamera
  $scope.openCamera = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/scan_barcode.html',
      controller: 'ScanBarcodeModalCtrl',
      controllerAs: '$ctrl',
      size: "full",
      resolve: {

      }
    });

    modalInstance.rendered.then(function () {
      $rootScope.$broadcast("modalOpen", {});
    });

    modalInstance.result.then(function (value) {
      if (value) {
        $scope.params.skey = value;
        $scope.doSearch();
      }
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

});


// Modal controller

UserWebApp.controller('AllWorkOrderModalCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, $uibModalInstance, item) {

  var $ctrl = this;
  $ctrl.item = item;
  $ctrl.selected = item;

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

//end