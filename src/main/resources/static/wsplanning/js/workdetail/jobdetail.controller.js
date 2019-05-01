UserWebApp.controller('JobDetailCtrl', function ($scope, $rootScope, $window, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {

  var $ctrl = this;
  var stampingCode = {};
  $scope.jobParams = $scope.$parent.jobObject;
  $scope.actTypeJob = $scope.$parent.actionType;
  $scope.jobTabList = $scope.$parent.WOJobs;
  var jobsList = []


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

  function saveData(initData) {
    return initData;
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


  $scope.getCheckRow = function (parentId, id, checked) {
    if (checked == false) {
      $scope.jobTabList[parentId].Items[id].MechanicId = null;
      console.log("--done--");
    } else {
      $scope.jobTabList[parentId].Items[id].MechanicId = $scope.WorkOrder.Token.EmployeeData.SmanId;
      console.log($scope.jobTabList[parentId].Items[id]);
      console.log("--done--");
    }
  }

  $scope.limit = 5;
  $scope.page = 1;

  $scope.removeItem = function (parentId, childrenId) {
    var rowId = $scope.jobTabList[parentId].Items[childrenId].RowId;
    var itemNo = $scope.jobTabList[parentId].Items[childrenId].ItemNo;
    if (rowId == 0 && itemNo == "") {
      $scope.jobTabList[parentId].Items.splice(childrenId, 1);
    } else {
      $scope.jobTabList[parentId].Items[childrenId].RowId = $scope.jobTabList[parentId].Items[childrenId].RowId * (-1);
    }

    console.log($scope.jobTabList[parentId].Items);
  }

  $scope.markAll = function (jobId) {
    var data = $scope.jobTabList[jobId].Items;
    angular.forEach(data, function (v, k) {
      v.checked = true;
      $scope.getCheckRow(jobId, k, true);
    });
  }

  $scope.changeValueCheckBox = function (mechanicId, checked) {
    if (mechanicId) {
      checked = true;
      return checked;
    }
  }

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


  $scope.openNewTab = function (params) {
    $window.open($scope.jobParams.VHCLink);
    // $window.open('https://www.google.com', '_blank');
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
      // console.log(selectedItem);
      if (typeof (selectedItem) === "string") {
        if ($scope.jobTabList[id].Items == null) {
          var charactersObject = createItem();
          charactersObject.Name = selectedItem;
          charactersObject.ItemType = item;
          charactersObject.MechanicId = "";
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
          charactersObject.MechanicId = "";
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
      // console.log(selectedItem);

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


  $scope.openImage = function (item, id) {
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
      // console.log(selectedItem);
      $scope.jobTabList[id].JobAttachments = selectedItem
      // console.log( $scope.jobTabList[id]);
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };


  $scope.openNotify = function (item) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/common/notification-form.html',
      controller: 'NotificationModalCtrl',
      backdrop: 'static',
      controllerAs: '$ctrl',
      size: "lg",
      resolve: {
        data: {
          item: item,
          WorkOrderId: $scope.WorkOrder.WorkOrderId,
        }
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

      common.btnLoading($(".btnSubmit"), true);
      WorkOrderService.postWorkOrder(data, postAction).then(function (res) {
        common.btnLoading($(".btnSubmit"), false);
        console.log(res);
        if (res.data.Token.ErrorDesc) {
          common.notifyWithMessage("Warning!!!", res.status, res.data.Token.ErrorDesc)
        } else {
          common.notifySuccess("Success!!!");
        }
        $state.go('app.main.workdetail', { 'id': res.data.WorkOrderId, 'type': $stateParams.type });
      }, function (err) {
        common.btnLoading($(".btnSubmit"), false);
        console.log(err);
        common.notifyError("Error!!!", err.status);
      })

    } else {
      var postAction = "saveRows";

      if (headerData.modified == true) {
        common.btnLoading($(".btnSubmit"), true);
        WorkOrderService.postWorkOrder(headerData.data, "saveHeader").then(function (res) {
          common.btnLoading($(".btnSubmit"), false);
        }, function (err) {
          common.btnLoading($(".btnSubmit"), false);
          common.notifyError("Error!!!", err.status);
        })
      }

      // save job - after save header
      $scope.WorkOrder.WOJobs = $scope.jobTabList;
      var data = JSON.stringify($scope.WorkOrder)
      common.btnLoading($(".btnSubmit"), true);
      WorkOrderService.postWorkOrder(data, postAction).then(function (res) {
        common.btnLoading($(".btnSubmit"), false);
        if (res.data.Token.ErrorDesc) {
          common.notifyWithMessage("Warning!!!", res.status, res.data.Token.ErrorDesc)
        } else {
          common.notifySuccess("Success!!!");
        }
        $state.reload();
      }, function (err) {
        common.btnLoading($(".btnSubmit"), false);
        console.log(err);
        common.notifyError("Error!!!", err.status);
      });
    }
  }

  //Save from button header
  $scope.$on('saveJob', function (event, obj) {
    $scope.onSubmitForm();
  });


});


UserWebApp.controller('JobNewModalCtrl', function ($scope, WorkOrderService, item, $uibModalInstance) {


  var $ctrl = this;
  $scope.recentSalesList = [];
  $scope.additionalData = [];
  $scope.historicalData = [];
  // console.log(item);


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
  // console.log($scope.newJobObject);
  // console.log($scope.jobChecked);

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
      custNo: item.CustNo,
      page: $scope.page,
      pageCount: $scope.limit
    }

    WorkOrderService.serviceItem(params).then(function (res) {
      $scope.recentSalesList = res.data;
      $scope.pageGo = $scope.page;
      $scope.isShow = false;
      common.spinner(false);
    }, function (err) {
      common.spinner(false);
      console.log(err);
    });

    WorkOrderService.countServiceItem(params).then(function (res) {
      $scope.totalElements = res.data;
      $scope.isNoData = ($scope.totalElements <= 0);
      common.spinner(false);
      // console.log(res);
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


  $scope.collapseMenu = function (item) {
    item.selected = !item.selected;
    // console.log($scope.jobTreeList);
  }


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
        $scope.jobTreeList.push(objTree);
      }
      );

      // console.log($scope.jobTreeList);
      common.spinner(false);
      // console.log(res);
    }, function (err) {
      console.log(err);
    })
  }

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})

UserWebApp.controller('PhotoModalCtrl', function ($scope, $uibModal, item, $uibModalInstance) {

  var $ctrl = this;

  // console.log(item);

  $scope.isGrid = true;


  $scope.getClass = function (param) {
    if (param === 1) {
      $scope.isGrid = false;
    } else {
      $scope.isGrid = true;
    }
  }

  function jobAttachments() {
    var jobObj = {
      AttachType: "",
      AttachTypeDescription: "",
      FileDescription: "",
      FileId: "",
      FileName: "",
      ImageData: "",
      dataUrl: ""
    }
    return jobObj
  }

  $scope.lstfiles = [];
  $scope.lstphoto = [];
  $scope.lstAttachment = [];

  loadPhoto(item)

  function loadPhoto(job) {
    if (job.JobAttachments) {
      angular.forEach(job.JobAttachments, function (v, k) {
        var obj = jobAttachments();
        obj.AttachType = v.AttachType;
        obj.AttachTypeDescription = v.AttachTypeDescription;
        obj.FileDescription = v.AttacFileDescriptionhType;
        obj.FileId = v.FileId;
        obj.FileName = v.FileName;
        obj.ImageData = v.ImageData;
        obj.dataUrl = "data:image/webp;base64," + v.ImageData;
        $scope.lstphoto.push(obj.dataUrl);
        $scope.lstAttachment.push(obj);
      })
    }

    return $scope.lstphoto;
  }


  // var formData = new FormData();
  $scope.getTheFiles = function ($files) {

    $scope.lstfiles = $files;

    angular.forEach($files, function (v, k) {
      var file = v;
      var reader = new FileReader();

      reader.onload = function (e) {
        $scope.$apply(function () {
          var obj = jobAttachments();
          var dataUrl = ""
          obj.AttachType = "PIC";
          obj.AttachTypeDescription = "";
          obj.FileDescription = "";
          obj.FileId = "",
            obj.FileName = file.name;
          dataUrl = e.target.result.split(',');
          obj.ImageData = dataUrl[1];
          obj.dataUrl = e.target.result;
          $scope.lstphoto.push(obj.dataUrl);
          $scope.lstAttachment.push(obj)
          console.log($scope.lstphoto);
        });
      }
      reader.readAsDataURL(file)
      // formData.append("files", v)

    });


    // check value in FormData
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
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

      // $scope.lstphoto = $scope.lstphoto.concat(selectedItem)
      angular.forEach(selectedItem, function (v, k) {
        var obj = jobAttachments();
        obj.AttachType = "PIC";
        obj.dataUrl = v;
        var dataUrl = v.split(',');
        obj.ImageData = dataUrl[1];
        $scope.lstAttachment.push(obj)
        $scope.lstphoto.push(obj.dataUrl);
      });

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

  $ctrl.save = function () {
    $uibModalInstance.close($scope.lstAttachment);
  }

  $scope.removePhoto = function (id) {
    $scope.lstphoto.splice(id, 1);
  }


  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})


UserWebApp.controller('TakeScreenshotCtrl', function ($scope, $uibModalInstance) {

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

UserWebApp.controller('openPhotoCtrl', function ($scope, item, $uibModalInstance) {

  var $ctrl = this;
  console.log(item);

  $scope.photo = item;

  $scope.dataUrlOriginal = item;

  $scope.$on("acceptPhoto", function (evt, obj) {
    $uibModalInstance.close(obj);
  })

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})


UserWebApp.controller('NotificationModalCtrl', function ($scope, data,
  $uibModalInstance, CommonServices, $rootScope, HttpService) {

  var $ctrl = this;
  console.log(data);

  $scope.employees = [];

  function loadCombo() {
    CommonServices.getEmployees().then(function (data) {
      $scope.employees = data;
    });
  }

  loadCombo();

  $scope.target = {}


  function object() {
    var notiObject = {
      Id: "",
      SmanId: "",
      CreatedBy: "",
      Note: "",
      SiteId: "",
      IsNotified: "",
      Created: "",
      NotifiedTime: "",
      WorkOrderId: "",
      WorkOrderRowId: ""
    }
    return notiObject;
  }


  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $ctrl.send = function (param) {
    var obj = object();

    obj.Note = param.text;
    obj.SmanId = param.employee;
    obj.WorkOrderId = data.WorkOrderId;
    obj.WorkOrderRowId = data.item.RowId;

    HttpService.postData('/site/postNotification', obj).then(function (response) {
      console.log(response);
      common.spinner(false);
    }, function error(response) {
      console.log(response);
      common.spinner(false);
    });

    $rootScope.$emit('message', { "item": "" })

    $uibModalInstance.close($scope.target);
  };


})
