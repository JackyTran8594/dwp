UserWebApp.controller('ServiceItemModalCtrl', function ($scope, $rootScope, WorkOrderService, $uibModalInstance, item, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  // $scope.WorkOrderId = $stateParams.id;
  // $scope.type = $stateParams.type;

  var $ctrl = this;

  $scope.jobTreeList = [];

  checkTitle(item.itemType);

  function checkTitle(itemType) {
    switch (itemType) {
      case 1:
        $translate('Spare').then(function (spare) {
          $scope.title = spare;
        }, function (translationId) {
          $scope.title = translationId;
        })
        return $scope.title;
      case 2:
        $translate('NonStockItems').then(function (nonStockItems) {
          $scope.title = nonStockItems;
        }, function (translationId) {
          $scope.title = translationId;
        })
        return $scope.title;
      case 4:
        $translate('SubContractors').then(function (subContractors) {
          $scope.title = subContractors;
        }, function (translationId) {
          $scope.title = translationId;
        })
        return $scope.title;
      case 7:
        $translate('Labour').then(function (labour) {
          $scope.title = labour;
        }, function (translationId) {
          $scope.title = translationId;
        })
        return $scope.title;

      case 8:
        $translate('TextRows').then(function (textRows) {
          $scope.title = textRows;
        }, function (translationId) {
          $scope.title = translationId;
        })
        return $scope.title;

    }
  }


  $scope.hide = item.itemType;

  $scope.listItem = [];


  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.isChecked = function (item, checked) {
    console.log(checked);
    var index = 0;
    var lengthList = $scope.listItem.length;
    if ($scope.listItem.length > 0) {
      angular.forEach($scope.listItem, function (v, i) {
        if (item.ItemNo === v.ItemNo && checked === false) {
          $scope.listItem.splice(i, 1);
        } else {
          index = index + 1;
          console.log(index);
        }
      })

      if (index === lengthList) {
        $scope.listItem.push(item);
      }
    }
    else {
      $scope.listItem.push(item);
    }
    console.log($scope.listItem);
  }

  $ctrl.save = function () {
    if ($scope.hide === 8) {
      $uibModalInstance.close($scope.listItem.toString());
    } else {
      $uibModalInstance.close($scope.listItem);
    }
  }

  $scope.skey = "";

  $scope.lstAllData = [];
  $scope.lstData = [];
  $scope.lstSearch = [];
  $scope.totalElements = 0;

  $scope.limit = 20;
  $scope.page = 1;


  function loadData(count) {
    common.spinner(true);

    var params = {
      itemType: item.itemType,
      skey: $scope.skey,
      vehiId: item.vehiId,
      custNo: item.custNo,
      page: $scope.page,
      pageCount: $scope.limit
    }

    if (count) {
      WorkOrderService.serviceItem(params).then(function (response) {
        $scope.lstData = response.data;
        console.log(response);
        $scope.pageGo = $scope.page;
        $scope.isShow = false;
        common.spinner(false);
      }, function error(response) {
        console.log(response);
        common.spinner(false);
      });

      WorkOrderService.countServiceItem(params).then(function (response) {
        $scope.totalElements = response.data;
        console.log(response);
        $scope.isNoData = ($scope.totalElements <= 0);
        common.spinner(false);
      }, function error(response) {
        console.log(response);
        common.spinner(false);
      });
    } else {
      WorkOrderService.serviceItem(params).then(function (response) {
        $scope.lstData = response.data;
        console.log(response);
        $scope.pageGo = $scope.page;
        $scope.isShow = false;
        common.spinner(false);
      }, function error(response) {
        console.log(response);
        common.spinner(false);
      });
    }
  }

  // loadData(true);


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



  //tree menu for the text line
  $scope.collapseMenu = function (item) {
    item.selected = !item.selected;
    // console.log($scope.jobTreeList);
  }


  $scope.jobChecked = {
    MainGroup: '',
    SubGroup: ''
  };

  loadDataTree(item);

  function loadDataTree(params) {
    common.spinner(true);
    WorkOrderService.getTextLine(params).then(function (res) {
      var data = res.data;
      angular.forEach(data, function (value) {
        var objTree = {};
        objTree.id = value.Id;
        objTree.label = value.Name;
        objTree.selected = false;
        objTree.children = [];
        objTree.SubGroups = value.SubGroups;
        $scope.jobTreeList.push(objTree);
      }
      );

      // console.log($scope.jobTreeList);
      common.spinner(false);
      // console.log(res);
    }, function (err) {
      console.log(err);
      common.spinner(false);
    })
  }

  $scope.strItem = "";
  // var lstTextLine = [];
  $scope.addTextLine = function (sub, mainGroup) {
    // var textLine = sub.Name;
    $scope.jobChecked.SubGroup = sub.Name;
    $scope.jobChecked.MainGroup = mainGroup;
    $scope.strItem = $scope.strItem + " " + sub.Name;
    console.log($scope.listItem);
  }

  //

});