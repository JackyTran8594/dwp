UserWebApp.controller('JobDetailCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {

  var $ctrl = this;

  $ctrl.jobParams = $scope.$parent.jobObject;

  $scope.jobTabList = $scope.$parent.WOJobs;
  console.log($scope.jobTabList);

  loadCommon();
  $scope.lstDepartment = [];
  $scope.lstPayers = [];
  $scope.lstChargeCats = [];
  $scope.lstJobCats = [];
  $scope.lstJobTypes = [];

  var jobObjectFirst = {
    AdditionalData: null,
    ChargeCategoryId: 0,
    Complaint: null,
    DeptId: "",
    EstimatedTime: 0,
    Items: [],
    JobAttachments: null,
    JobCategory: "",
    JobNo: "",
    JobType: "",
    MainGroupId: " ",
    Note: "",
    Payer: "",
    RowId: 1,
    SmanId: "",
    SubGroupId: "",
  }

  function loadCommon() {

    CommonServices.getChargeCats().then(function (data) {
      $scope.lstChargeCats = data;
      console.log(data);
    });
    CommonServices.getPayers().then(function (data) {
      $scope.lstPayers = data;
      console.log(data);
    })
    CommonServices.getDepartments().then(function (data) {
      $scope.lstDepartment = data;
      console.log(data);
    });
    CommonServices.getJobCats().then(function (data) {
      $scope.lstJobCats = data;
      console.log(data);

    });

    CommonServices.getJobTypes().then(function (data) {
      $scope.lstJobTypes = data;
      console.log(data);
    });

  }

  console.log($ctrl.jobParams);

  $scope.getClass = function (param, mechanicId) {
    switch (param) {
      case 1:
        return "icon-spare-part";
      case 2:
        return "icon-non-stock-item";
      case 3:
        return null;
      case 4:
        return "icon-sub-contractors";
      case 7:
        return "icon-labour-operation";
      case 8:
        return "icon-text-rows";
      default:
        break;
    }
  }

  $scope.getCheckRow = function (mechanicId) {
    if (mechanicId != null) {
      return "icon-checked-rows";
    } else {
      return "icon-unchecked-rows";
    }
  }



  // paging
  // $scope.totalElements = $scope.$parent.WOJobs.length;

  $scope.limit = 5;
  $scope.page = 1;

  $scope.removeItem = function (parentId, childrenId) {
    $scope.jobTabList[parentId].Items.splice(childrenId, 1);
    console.log($scope.jobTabList[parentId].Items);
  }

  // pagingData($scope.page);

  // function pagingData(currentPage) {
  // var begin = (currentPage - 1) * $scope.limit;
  // var end = begin + $scope.limit
  // $scope.jobTabList = data.slice(begin, end);
  // console.log($scope.jobTabList);
  // }


  // $scope.go = function () {
  // $scope.page = $scope.pageGo;
  // pagingData($scope.page);
  // }

  // $scope.changeLimit = function () {
  // pagingData($scope.page);
  // }

  //<editor-fold desc="Paging & Search Port">
  $scope.$watch("page", function (newValue, oldValue) {
    if (newValue != oldValue) {
      $scope.page = newValue;
      pagingData($scope.page)
    }
  });

  // end

  // toggle for single row
  this.isShow = false;
  $scope.toggleJobRow = function (param) {
    console.log(param)
    this.isShow = !this.isShow;
  }


  // modal
  $ctrl.animationsEnabled = true;

  $scope.openServiceItem = function (item, id) {
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

      if (typeof (selectedItem) === "string") {
        console.log(typeof (selectedItem))
        var charactersObject = Object.assign($scope.jobTabList[id].Items[0], charactersObject);
        var arrayObject = Object.keys(charactersObject);
        angular.forEach(arrayObject, function (v, i) {
          if (v === "Note") {
            charactersObject[v] = selectedItem;
          } else if (v === "ItemType") {
            charactersObject[v] = item
          } else {
            charactersObject[v] = "";
          }
        })
        console.log(charactersObject);

        $scope.jobTabList[id].Items.filter(function (v, i) {
            return (v.ItemType !== 8)
        })
        console.log($scope.jobTabList[id].Items);

        $scope.jobTabList[id].Items.push(charactersObject);

        console.log($scope.jobTabList[id]);
      } else {
        angular.forEach(selectedItem, function (v) {
          $scope.jobTabList[id].Items.push(v);
        })
        console.log($scope.jobTabList[id].Items);
      }
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
      console.log(selectedItem);
      //add in new WO
      if ($scope.jobTabList === undefined) {
        $scope.jobTabList = [];
        $scope.jobTabList.push(jobObjectFirst);
        $scope.jobTabList[0].AdditionalData = selectedItem.AdditionalData;
        $scope.jobTabList[0].EstimatedTime = selectedItem.EstimatedTime;
        $scope.jobTabList[0].JobType = selectedItem.JobType;
        $scope.jobTabList[0].Note = selectedItem.JobTitle;
        $scope.jobTabList[0].Name = selectedItem.Name;
        // $scope.jobTabList[0].Id = selectedItem.Id;

      } else {
        // add in detail WO
        jobObjectFirst.Note = selectedItem.JobTitle;
        // jobObjectFirst.ItemType = item;
        jobObjectFirst.JobType = selectedItem.JobType;
        jobObjectFirst.Name = selectedItem.Name;
        jobObjectFirst.EstimatedTime = selectedItem.EstimatedTime;
        jobObjectFirst.AdditionalData = selectedItem.AdditionalData;

        console.log(jobObjectFirst);
        $scope.jobTabList.push(jobObjectFirst);
        console.log($scope.jobTabList);
      }
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

});


UserWebApp.controller('JobNewModalCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter,
  $uibModal, CommonServices, $stateParams, $state, item, $uibModalInstance) {


  var $ctrl = this;
  $scope.recentSalesList = [];
  $scope.additionalData = [];
  $scope.historicalData = [];
  console.log(item);

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

  $scope.jobChecked = "";
  $scope.disabledButton = true;
  $scope.newJobObject = {};
  console.log($scope.newJobObject);

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
    loadDataSales(sub.JobType);
    $scope.jobChecked = sub.Name;
    $scope.newJobObject = sub;
    $scope.disabledButton = false;
  }


  function loadDataSales(jobType) {
    common.spinner(true);

    var params = {
      itemType: 502,
      skey: jobType,
      vehiId: item.VehiId,
      custNo: "",
      page: $scope.page,
      pageCount: $scope.limit
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
      // console.log(res)
      $scope.totalElements = res.data;
      $scope.isNoData = ($scope.totalElements <= 0);
      common.spinner(false);
      console.log(res);
    }, function (err) {
      console.log(err);
      common.spinner(false);
    });
  }

  $scope.addItem = function (value) {
    $scope.historicalData.push(value);
  }

  $scope.save = function () {
    $uibModalInstance.close($scope.newJobObject);
    $scope.newJobObject = {};
  }


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