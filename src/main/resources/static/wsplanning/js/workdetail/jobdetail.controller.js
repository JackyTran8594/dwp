UserWebApp.controller('JobDetailCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {

  var $ctrl = this;
  var stampingCode = {};
  $scope.jobParams = $scope.$parent.jobObject;
  $scope.actTypeJob = $scope.$parent.actionType;
  $scope.jobTabList = $scope.$parent.WOJobs;



  loadCommon();
  $scope.lstDepartment = [];
  $scope.lstPayers = [];
  $scope.lstChargeCats = [];
  $scope.lstJobCats = [];
  $scope.lstJobTypes = [];


  function clearObject() {
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
      RowId: 0,
      SmanId: "",
      SubGroupId: "",
    }
    return jobObjectFirst;
  }

  function createItem() {
    var item = {
      BUYPR: 0,
      ChargeCategoryId: 0,
      FactTime: 0,
      IGROUPID: 0,
      ItemNo: "",
      ItemType: 0,
      MechanicId: "",
      ModelCode: "",
      Name: "",
      Quantity: 0,
      RecmTime: 0,
      RowId: 0,
      SaleTime: 0,
      StockId: "",
      StockQty: 0,
      SuplNo: "",
      UNITPR: 0,
      VATCD: null,
      WorkGroupId: null,
      WorkType: ""
    }
    return item;
  }




  function loadCommon() {

    CommonServices.getChargeCats().then(function (data) {
      $scope.lstChargeCats = data;
    });
    CommonServices.getPayers().then(function (data) {
      $scope.lstPayers = data;
    })
    CommonServices.getDepartments().then(function (data) {
      $scope.lstDepartment = data;
    });
    CommonServices.getJobCats().then(function (data) {
      $scope.lstJobCats = data;

    });

    CommonServices.getJobTypes().then(function (data) {
      $scope.lstJobTypes = data;
    });

    WorkOrderService.getStamping().then(function (res) {

      stampingCode = res.data[0];
    }, function (err) {
      console.log(err);
    });
  }

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
            custNo: $scope.jobParams.CustNo,
            vehiId: $scope.jobParams.VehiId,
            itemType: item
          };
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {

      if (typeof (selectedItem) === "string") {
        if ($scope.jobTabList[id].Items == null) {
          var charactersObject = createItem();
          charactersObject.Name = selectedItem;
          charactersObject.ItemType = item;
          $scope.jobTabList[id].Items = [];
          $scope.jobTabList[id].Items.push(charactersObject);
        }
        else {
          // var newArray = $scope.jobTabList[id].Items.filter(function (v, i) {
          //   return (v.ItemType !== 8);
          // })
          // $scope.jobTabList[id].Items = newArray;
          var charactersObject = createItem();
          charactersObject.Name = selectedItem;
          charactersObject.ItemType = item;
          $scope.jobTabList[id].Items.push(charactersObject);
        }

      } else {
        if ($scope.jobTabList[id].Items == null) {
          $scope.jobTabList[id].Items = [];
          angular.forEach(selectedItem, function (v) {
            $scope.jobTabList[id].Items.push(v);
          })
        }
        else {
          angular.forEach(selectedItem, function (v) {
            $scope.jobTabList[id].Items.push(v);
          })
        }

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
          return $scope.jobParams;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log(selectedItem);

      //add in new WO
      if ($scope.jobTabList === undefined) {
        var jobObj = clearObject();
        $scope.jobTabList = [];
        $scope.jobTabList.push(jobObj);
        $scope.jobTabList[0].AdditionalData = selectedItem.sub.AdditionalData;
        $scope.jobTabList[0].EstimatedTime = selectedItem.sub.EstimatedTime;
        $scope.jobTabList[0].JobType = selectedItem.sub.JobType;
        $scope.jobTabList[0].Note = selectedItem.sub.JobTitle;
        $scope.jobTabList[0].Name = selectedItem.sub.Name;
        $scope.jobTabList[0].Items = selectedItem.Items;
        $scope.jobTabList[0].MainGroupId = selectedItem.id;
        $scope.jobTabList[0].SubGroupId = selectedItem.sub.Id;
        $scope.jobTabList[0].Complaint = selectedItem.sub.JobComplaint
        $scope.jobTabList[0].DeptId = $scope.WorkOrder.DeptId;
      } else {

        var jobObj = clearObject();
        // add in detail WO
        jobObj.Note = selectedItem.sub.JobTitle;
        jobObj.JobType = selectedItem.sub.JobType;
        jobObj.Name = selectedItem.sub.Name;
        jobObj.EstimatedTime = selectedItem.sub.EstimatedTime;
        jobObj.AdditionalData = selectedItem.sub.AdditionalData;
        jobObj.Items = selectedItem.Items;
        jobObj.MainGroupId = selectedItem.id;
        jobObj.SubGroupId = selectedItem.sub.Id;
        jobObj.Complaint = selectedItem.sub.JobComplaint;
        // console.log(jobObj);
        $scope.jobTabList.push(jobObj);
        // console.log($scope.jobTabList);
      }
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };


  $scope.addStamping = function (item) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/common/confirm-form.html',
      controller: 'StampingModalCtrl',
      backdrop: 'static',
      controllerAs: '$ctrl',
      size: "sm",
      resolve: {
        item: {
          WorkOrderId: $scope.WorkOrder.WorkOrderId,
          WorkOrderNo: $scope.WorkOrder.WorkOrderNo,
          RowId: item.RowId,
          StampingCode: stampingCode.Id,
          JobNo: item.JobNo
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log(selectedItem);
      if (selectedItem.status === 200) {
        common.notifySuccess("Success!!!");

        //Load Stamp
        // $rootScope.$on('routestateChangeSuccess', function (event, data) {
        $("body").addClass("sidebar-xs");
        CommonServices.getStamping().then(function (data) {
          if (data && data.StampText) {
            $rootScope.stamping = data.StampText;
          } else {
            $rootScope.stamping = "";
          }
        });
        // });

        //reload state
        $state.reload();

      } else {
        common.notifyError("Error!!!");
      }

    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };


  $scope.openImage = function (item) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/common/photo-form.html',
      controller: 'PhotoModalCtrl',
      backdrop: 'static',
      controllerAs: '$ctrl',
      size: "full",
      resolve: {
        item: item
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log(selectedItem);

    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };


  var headerData = {};
  // get headerData
  $rootScope.$on("headerData", function (evt, obj) {
    headerData = obj;
    console.log(obj);
  });

  $scope.pristine = false;


  function emitData(params) {
    $scope.$emit("jobData", {
      data: $scope.WorkOrder,
      modified: params,
    }
    );
  }

  $scope.$watch('jobTabList', function (newValue, oldValue) {
    // if (!newValue) {
    //   $scope.pristine = false;
    // } else {
    if ($scope.actTypeJob === "new") {
      $scope.pristine = true;
      $scope.jobTabList = newValue;
      $scope.WorkOrder.WOJobs = $scope.jobTabList;
      emitData($scope.pristine);

      //if the form is modified => using $emit to send data
      $scope.$on('inputModified.formChanged', function (event, modified, formCtrl) {
        console.log(formCtrl.$name);
        emitData(modified);
      });
    } else {
      if (newValue.length > oldValue.length) {
        $scope.pristine = true;
        $scope.jobTabList = newValue;
        $scope.WorkOrder.WOJobs = $scope.jobTabList;
        emitData($scope.pristine);

        //if the form is modified => using $emit to send data
        $scope.$on('inputModified.formChanged', function (event, modified, formCtrl) {
          console.log(formCtrl.$name);
          emitData(modified);
        });
      } else {
        $scope.pristine = false;
      }

    }
  });



  $scope.onSubmitForm = function () {

    if ($scope.actTypeJob === "new") {

      var postAction = "createNew";

      //save job - after save header
      $scope.WorkOrder.WOJobs = $scope.jobTabList;

      var data = JSON.stringify($scope.WorkOrder)

      WorkOrderService.postWorkOrder(data, postAction).then(function (res) {
        console.log(res);
        common.notifySuccess("Success!!!");
        $state.go('app.main.workdetail', { 'id': res.data.WorkOrderId, 'type': $stateParams.type });
      }, function (err) {
        console.log(err);
        common.notifyError("Error!!!", err.status);
      })

    } else {
      var postAction = "saveRows";

      if (headerData.modified == true) {
        WorkOrderService.postWorkOrder(headerData.data, "saveHeader").then(function (res) {
        }, function (err) {
          common.notifyError("Error!!!", err.status);
        })
      }

      // save job - after save header
      $scope.WorkOrder.WOJobs = $scope.jobTabList;
      var data = JSON.stringify($scope.WorkOrder)
      WorkOrderService.postWorkOrder(data, postAction).then(function (res) {
        common.notifySuccess("Success!!!");
        $state.reload();
      }, function (err) {
        console.log(err);
        common.notifyError("Error!!!", err.status);
      });
    }
  }

  //Save from button header
  $rootScope.$on('saveJob', function (event, obj) {
    $scope.onSubmitForm();
  });






});


UserWebApp.controller('JobNewModalCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter,
  $uibModal, CommonServices, $stateParams, $state, item, $uibModalInstance, ivhTreeviewMgr) {


  var $ctrl = this;
  $scope.recentSalesList = [];
  $scope.additionalData = [];
  $scope.historicalData = [];
  console.log(item);


  $scope.isOpenDateInput = false;
  $scope.openDateInput = function (e) {
    e.preventDefault();
    e.stopPropagation();
    $scope.isOpenDateInput = true;
  };



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

  $scope.jobChecked = {
    MainGroup: '',
    SubGroup: ''
  };
  $scope.disabledButton = true;
  $scope.newJobObject = {};
  console.log($scope.newJobObject);
  console.log($scope.jobChecked);

  $scope.go = function () {
    $scope.page = $scope.pageGo;
  }

  $scope.changeLimit = function () {
    loadDataSales(false);
  }


  // call searchserviceitem
  $scope.recentSales = function (sub, mainGroup, id) {
    console.log(sub);
    $scope.additionalData = sub.AdditionalData;
    loadDataSales(sub.JobType);
    $scope.jobChecked.SubGroup = sub.Name;
    $scope.jobChecked.MainGroup = mainGroup;
    $scope.newJobObject = {
      sub: sub,
      id: id,
      name: mainGroup
    };
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
    $scope.newJobObject.Items = [];
    $scope.newJobObject.Items = $scope.historicalData
    $uibModalInstance.close($scope.newJobObject);
    $scope.newJobObject = {};
  }


  $scope.jobTreeList = [];

  // loadData(item);

  // function loadData(params) {
  //   common.spinner(true);
  //   WorkOrderService.jobTab(params).then(function (res) {
  //     $scope.jobTreeList = res.data;
  //     console.log(res);
  //     common.spinner(false);
  //   }, function (error) {
  //     console.log(error);
  //     common.spinner(false);
  //   })
  // }


  $scope.collapseMenu = function (item) {
    item.selected = !item.selected;
    console.log($scope.jobTreeList);
  }


  // loadDataTree(item);

  // using ivh-tree angular
  loadDataTree(item);
  function loadDataTree(params) {
    common.spinner(true);
    WorkOrderService.jobTab(params).then(function (res) {
      var data = res.data;
      console.log(res.data);
      angular.forEach(data, function (value) {
        var objTree = {};
        objTree.id = value.Id;
        objTree.label = value.Name;
        objTree.selected = false;
        objTree.children = [];
        objTree.SubGroups = value.SubGroups;
        // angular.forEach(items, function (item) {
        //   var objSub = {};
        //   objSub.id = item.Id;
        //   objSub.label = item.Name;
        //   objSub.jobType = item.JobType;
        //   objSub.children = [];
        //   objSub.AdditionalData = item.AdditionalData;
        //   objTree.children.push(objSub);
        // });
        $scope.jobTreeList.push(objTree);
      }
      );

      console.log($scope.jobTreeList);
      common.spinner(false);
      console.log(res);
    }, function (err) {
      console.log(err);
    })
  }

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})

UserWebApp.controller('PhotoModalCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter,
  $uibModal, CommonServices, $stateParams, $state, item, $uibModalInstance) {

  $scope.myChannel = {
    // the fields below are all optional
    videoHeight: 800,
    videoWidth: 600,
    video: null // Will reference the video element on success
  };

  var $ctrl = this;

  console.log(item);

  $scope.isGrid = true;


  $scope.getClass = function (param) {
    if (param === 1) {
      $scope.isGrid = false;
    } else {
      $scope.isGrid = true;
    }
  }

  $scope.takeScreenshot = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/taking_screenshot.html',
      controller: 'TakeScreenshotCtrl',
      backdrop: 'static',
      controllerAs: '$ctrl',
      size: "full",
    });

    modalInstance.result.then(function (selectedItem) {
      console.log(selectedItem);
      $scope.lstphoto = $scope.lstphoto.concat(selectedItem)
      // angular.forEach(selectedItem, function (v, k) {
      //   $scope.lstphoto.push(v);
      // });
      
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };


  $scope.openPhoto = function (index) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/open_Photo.html',
      controller: 'openPhotoCtrl',
      backdrop: 'static',
      controllerAs: '$ctrl',
      size: "lg",
      resolve: {
        item: function () {
          console.log(index);
          return $scope.lstphoto[index];
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log(selectedItem);

      // var dataUrl = selectedItem.dataUrl.split(',');
      // var byteString = atob(dataUrl[1]);
      // var arrayBuffer = new ArrayBuffer(byteString.length);
      // var uint8Array = new Uint8Array(arrayBuffer);
      // for (var i = 0; i < byteString.length; i++) {
      //   uint8Array[i] = byteString.charCodeAt(i);
      // }
  
      // var blob = new Blob([uint8Array], { type: 'image/jpeg' });
      // var file = new File([blob], "image.jpg");
      $scope.lstphoto[index] = selectedItem.dataUrl;

    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };


  $scope.lstfiles = [];
  $scope.lstphoto = [];
  // $scope.progress = 
  var formData = new FormData();
  $scope.getTheFiles = function ($files) {
    if ($scope.lstphoto.length > 0) {
      $scope.lstphoto = [];
    }
    $scope.lstfiles = $files;
    // console.log($files);
    angular.forEach($files, function (v, k) {
      var file = v;
      var reader = new FileReader();
      reader.onload = $scope.photoLoaded;
      reader.readAsDataURL(file)
      formData.append("files", v)
      // console.log(formData);
    });


    // check value in FormData
    for (var value of formData.values()) {
      console.log(value);
    }
  }

  $scope.photoLoaded = function (evt) {
    $scope.$apply(function () {
      $scope.lstphoto.push(evt.target.result);
      console.log($scope.lstphoto);
    });
  }

  $ctrl.selectPhoto = function () {

  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})


UserWebApp.controller('TakeScreenshotCtrl', function ($scope, $rootScope, $translate, $location, $filter,
  $uibModal, cameraService, $stateParams, $state, $uibModalInstance) {

  var $ctrl = this;

  $scope.photo = {}
  $scope.lstphoto = []
  


  $scope.takeScreenshot = function () {
    var strImg = angular.element(document.querySelector('img'));
    var dataUrl = strImg.context.currentSrc.split(',');
    // var byteString = atob(dataUrl[1]);
    // var arrayBuffer = new ArrayBuffer(byteString.length);
    // var uint8Array = new Uint8Array(arrayBuffer);
    // for (var i = 0; i < byteString.length; i++) {
    //   uint8Array[i] = byteString.charCodeAt(i);
    // }

    // var blob = new Blob([uint8Array], { type: 'image/jpeg' });
    // var file = new File([blob], "image.jpg");
    // $scope.lstphoto.push(file);

    $scope.lstphoto.push(strImg.context.currentSrc);
    console.log($scope.lstphoto);

  }


  $ctrl.save = function () {
    $uibModalInstance.close($scope.lstphoto);
  }

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})

UserWebApp.controller('openPhotoCtrl', function ($scope, $rootScope, $translate, $location, $filter,
  $uibModal, item, $uibModalInstance) {

  var $ctrl = this;
  console.log(item);

  $scope.photo = item;

  $scope.dataUrlOriginal = item;
  
  $scope.save = function () {
    console.log($scope.dataurl);
    // $scope.accept(); 
  }

  $scope.$on("acceptPhoto", function (evt, obj) {
    $uibModalInstance.close(obj);
  })

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})