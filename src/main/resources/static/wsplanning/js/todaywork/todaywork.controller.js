UserWebApp.controller('TodayWorkOrderCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal) {
  $scope.lstAllData = [];
  $scope.lstData = [];
  $scope.lstSearch = [];
  $scope.totalElements = 0;

  $scope.params = {
    "department": "300",
    "trans": "W",
    "visitReason": "03",
    "serv":"",
  };
  $scope.searchValue = '';
  $scope.limit = 20;
  $scope.page = 1;

  function reset() {
    $scope.params = {
      "department": "300",
      "trans": "W",
      "visitReason": "03",
      "serv":"",
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
  function loadCommon(){
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

  function loadData() {
    common.spinner(true);

    //unScheduledWO, withSubcontractor, todayWO, allWO, withMOT, withTire, withBO, postponedWO, offers
    var params = {
      // "ViewName": "todayWO",
      "ViewName": "allWO",
      "skey": "",
    };

    HttpService.postData('/wo/getWO', params).then(function (response) {
      $scope.lstAllData = response;
      $scope.doSearch();
      common.spinner(false);
    }, function error(response) {
      console.log(response);
      common.spinner(false);
    });
  }

  loadData();


  //<editor-fold desc="Paging & Search Port">
  $scope.$watch("page", function (newValue, oldValue) {
    if (newValue != oldValue) {
      $scope.page = newValue;
      searchData();
    }
  });

  $scope.go = function () {
    $scope.page = $scope.pageGo;
  }

  $scope.changeLimit = function () {
    console.log($scope.limit);
    //Check limit vuot page thi reset ve page 1
    if ($scope.lstSearch && $scope.lstSearch.length > 0) {
      if ((($scope.page - 1) * $scope.limit) > $scope.lstSearch.length) {
        $scope.doSearch();
      } else {
        searchData();
      }
    } else {
      searchData();
    }
  }

  // Search data
  function searchData() {
    $scope.lstData = [];
    $scope.totalElements = $scope.lstSearch.length;
    if (!$scope.lstSearch || $scope.lstSearch.length <= 0) {
      $scope.isNoData = true;
    } else {
      var begin = ($scope.page - 1) * $scope.limit;
      var end = ($scope.page) * $scope.limit;

      end = (end > $scope.lstSearch.length) ? $scope.lstSearch.length : end;

      for (var i = begin; i < end; i++) {
        $scope.lstData.push($scope.lstSearch[i]);
      }

      $scope.isNoData = (!$scope.lstData || $scope.lstData.length <= 0);
      $scope.pageGo = $scope.page;
    }
  }

  $scope.doSearch = function () {
    console.log("---doSearch-----");
    common.spinner(true);
    $scope.lstSearch = [];
    if ($scope.searchValue) {
      angular.forEach($scope.lstAllData, function (value) {
        if (("" + value.DeptId).toLowerCase().includes($scope.searchValue)
          || ("" + value.Email).toLowerCase().includes($scope.searchValue.toLowerCase())
          || ("" + value.Name).toLowerCase().includes($scope.searchValue.toLowerCase())
          || ("" + value.Phone).toLowerCase().includes($scope.searchValue.toLowerCase())
          || ("" + value.ShiftId).toLowerCase().includes($scope.searchValue.toLowerCase())
          || ("" + value.ShortName).toLowerCase().includes($scope.searchValue.toLowerCase())
          || ("" + value.SiteId).toLowerCase().includes($scope.searchValue.toLowerCase())
          || ("" + value.SmanId).toLowerCase().includes($scope.searchValue.toLowerCase())
          || ("" + value.SubSys).toLowerCase().includes($scope.searchValue.toLowerCase())
        ) {
          $scope.lstSearch.push(value);
        }
      });
    } else {
      angular.forEach($scope.lstAllData, function (value) {
        $scope.lstSearch.push(value);
      });
    }

    $scope.page = 1;
    $scope.pageGo = 1;
    searchData();
    common.spinner(false);
  }
  //</editor-fold>

  $scope.onRefresh = function () {
    $scope.limit = '20';
    $scope.page = '1';
    $scope.name = '';

    loadData();
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

  $scope.$watch('params.page', function (_newValue, _oldValue) {
    // console.log('_oldValue : '+_oldValue);
    // console.log('_newValue : '+_newValue);
    if (_newValue !== _oldValue) {
      // console.log('params.page is change');
      //common.updateUrlRequestParam('page', _newValue);
      loadData();
    }
  }, true);

  $scope.$watch('params.limit', function (_newValue, _oldValue) {
    // console.log('params.limit : ');
    if (_newValue !== _oldValue) {
      // console.log('params.limit is change');
      //common.updateUrlRequestParam('limit', _newValue);
      loadData();
    }
  }, true);

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