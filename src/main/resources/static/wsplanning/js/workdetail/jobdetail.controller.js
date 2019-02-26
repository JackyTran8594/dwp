UserWebApp.controller('JobDetailCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {

  var $ctrl = this;

  $ctrl.jobParams = $scope.$parent.jobObject;

  console.log($ctrl.jobParams);

  $scope.getClass = function (param) {
    switch (param) {
      case 1:
        return "icon-spare-part";
      case 2:
        return null;
      case 4:
        return null;
      case 7:
        return "icon-labour-operation";
      case 8:
        return "icon-text-rows";
      default:
        break;
    }
  }



  $scope.jobTabList = $scope.$parent.WOJobs;

  this.isShow = false;
  $scope.toggleJobRow = function (param) {
    console.log(param)
    this.isShow = !this.isShow;
  }

  console.log($scope.jobTabList)


  $ctrl.animationsEnabled = true;

  $scope.openServiceItem = function (item) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/common/serviceItem-form.html',
      controller: 'ServiceItemModalCtrl',
      backdrop: 'static',
      controllerAs: '$ctrl',
      size: "full",
      resolve: {
        item: function () {
          return {
            custNo: $ctrl.jobParams.CustNo,
            vehiId: $ctrl.jobParams.VehiId,
            itemType: item
          };
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.addJob = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/workdetail/modal/job-new.html',
      controller: 'JobNewModalCtrl',
      backdrop: 'static',
      controllerAs: '$ctrl',
      size: "full",
      resolve: {
        item: function () {
          return $ctrl.jobParams;
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


UserWebApp.controller('JobNewModalCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter,
  $uibModal, CommonServices, $stateParams, $state, item, $uibModalInstance) {


  var $ctrl = this;
  $scope.title = "Job Quick Selection";
  $scope.recentSaleTitle = "Recent sales from this job type";
  $scope.recentSalesList = [];
  $scope.additionalData = [];
  $scope.historicalData = [];

  $scope.totalElements = 0;

  $scope.limit = 10;
  $scope.page = 1;

  //<editor-fold desc="Paging & Search Port">
  $scope.$watch("page", function (newValue, oldValue) {
    if (newValue != oldValue) {
      $scope.page = newValue;
      // loadDataSales();
    }
  });

  $scope.go = function () {
    $scope.page = $scope.pageGo;
  }

  $scope.changeLimit = function () {
    loadDataSales(false);
  }

  // call searchserviceitem
  $scope.recentSales = function (sub) {
    console.log(sub);
    $scope.additionalData = sub.AdditionalData;
    loadDataSales(true, sub.Id, sub.JobType);
  }


  function loadDataSales(count, itemType, skey) {
    common.spinner(true);

    var params = {
      ItemType: itemType,
      skey: skey
    }

    WorkOrderService.serviceItem(params).then(function (res) {
      $scope.recentSalesList = res.data;
      console.log(res);
      $scope.pageGo = $scope.page;
      $scope.isShow = false;
      common.spinner(false);
    }, function (err) {
      common.spinner(false);
      console.log(err);
    });

    WorkOrderService.countServiceItem(params).then(function (res) {
      // $scope.recentSalesList = res.data;
      $scope.totalElements = res;
      $scope.isNoData = ($scope.totalElements <= 0);
      common.spinner(false);
      console.log(res);
    }, function (err) {
      console.log(err);
      common.spinner(false);
    });
  }

  $scope.addItem = function (item) {
    if ($scope.historicalData.length > 0) {
      var i = 0;
      angular.forEach($scope.historicalData, function (v, i) {
        if (item.ModelCode === v.ModelCode) {
          v.Quantity += item.Quantity;
          break;
        } else {
          i++;
        }
      });

      if (i === $scope.historicalData.length) {
        $scope.historicalData.push(item);
      }
    } else {
      $scope.historicalData.push(item);
    }

  }


  console.log(item);

  $scope.jobTreeList = [];

  loadData(item);


  // using ivh-tree angular
  // function loadData(params) {
  //   common.spinner(true);
  //   WorkOrderService.jobTab(params).then(function (res) {
  //     var data = res.data;
  //     angular.forEach(data, function (value) {
  //       var objTree = {};
  //       objTree.id = value.Id;
  //       objTree.label = value.Name;
  //       objTree.children = [];
  //       var items = value.SubGroups;
  //       angular.forEach(items, function (item) {
  //         var objSub = {};
  //         objSub.id = item.Id;
  //         objSub.label = item.Name;
  //         objSub.jobType = item.JobType;
  //         objSub.children = [];
  //         var list = item.AdditionalData;
  //         angular.forEach(list, function (obj) {
  //           var objAdd = {};
  //           objAdd.id = obj.Id;
  //           objAdd.label = obj.Label;
  //           objSub.children.push(objAdd);
  //         });

  //         objTree.children.push(objSub);
  //       });
  //       $scope.jobTreeList.push(objTree);
  //     }
  //     );

  //     console.log($scope.jobTreeList);
  //     common.spinner(false);
  //     console.log(res);
  //   }, function (err) {
  //     console.log(err);
  //   })
  // }


  function loadData(params) {
    common.spinner(true);
    WorkOrderService.jobTab(params).then(function (res) {
      $scope.jobTreeList = res.data;
      console.log(res);
      common.spinner(false);
    }, function (error) {
      console.log(error);
      common.spinner(false);
    })
  }

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})