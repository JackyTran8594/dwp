UserWebApp.controller('WorkOrderCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal) {

  $scope.lstAllData = [];
  $scope.lstData = [];
  $scope.lstSearch = [];
  $scope.totalElements = 0;

  $scope.params = [];
  $scope.searchValue = '';
  $scope.limit = 20;
  $scope.page = 1;

  $scope.checklistTable = {
    selected: [],
    checkAll: false
  };

  function reset() {
    $scope.params = [];
    $scope.searchValue = '';
    $scope.limit = 20;
    $scope.page = 1;

    $scope.checklistTable = {
      selected: [],
      checkAll: false
    };
  }

  function loadData() {
    common.spinner(true);

    var params = {
      "command": "getMechanics",
    };

    HttpService.postData('/mechanic/test', params).then(function (response) {
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

    $scope.checklistTable = {
      selected: [],
      checkAll: false
    };


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

  $scope.multi = false;
  $scope.onDeletes = function () {
    $scope.multi = true;
    $scope.deleteList = [];
    $scope.deleteList = $scope.checklistTable.selected;
    $('.modalDelete').modal('show');
  };

  $scope.onDelete = function (id) {
    $scope.multi = false;
    $scope.deleteList = [];
    $scope.deleteList.push(id);
    $('.modalDelete').modal('show');
  };

  $scope.onDeleteConfirm = function () {
    common.spinner(true);
    var param = {
      "ids": $scope.deleteList.join(",")
    };
    console.log($scope.param1);
    HttpService.postData('/mechanic/delete', param).then(function (data) {
      $('.modalDelete').modal('hide');
      $scope.checklistTable.selected = [];
      loadData();
      common.notifySuccess($translate.instant('deleteSuccessfully'));
      common.spinner(false);
    }, function error(response) {
      console.log(response);
      common.spinner(false);
      common.notifyError($translate.instant('deleteError'));
    });
  };

  $scope.onCheckbox = function () {
    if ($scope.checklistTable.checkAll) {
      $scope.checklistTable.selected = $scope.lstData.map(function (_item) {
        return _item.id;
      });
    } else {
      $scope.checklistTable.selected = [];
    }
  };

  $scope.$watch('checklistTable.selected', function (_newValue, _oldValue) {
    if (_newValue !== _oldValue) {
      // Update check box all status
      var element = $('.checkAllTable');
      var listChecked = $scope.checklistTable.selected;
      var list = $scope.lstData.map(function (_item) {
        return _item.id;
      });
      $scope.checklistTable.checkAll = common.updateCheckBoxAllStatus(element, listChecked, list);
    }
  }, true);

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


  //Modal
  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size, item) {
    console.log("----open--------");
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/workOrder/modal-form.html',
      controller: 'WorkOrderModalCtrl',
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
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});