UserWebApp.controller('NotificationCtrl', function ($scope, $rootScope, $locale, WorkOrderService, HttpService, $translate, $location, $state, $filter, $uibModal, CommonServices, typeWO) {

  console.log(typeWO);
  var $ctrl = this;
  $scope.typeWO = typeWO;
  $scope.CountUnRead = "";
  $scope.UnRead = [];


  $scope.isShow = true;

  $scope.toogleUnRead = function () {
    $scope.isShow = !$scope.isShow;
  };


  $scope.EmployeeData = $("#EmployeeData").data("employee");

  $scope.reload = function () {
    $state.reload();
    $scope.$broadcast("reloadNotification", { "item": {} });
  };

});

UserWebApp.controller('NotificationUnReadCtrl', function ($scope, WorkOrderService,
  $uibModal, HttpService) {

  var typeWO = $scope.$parent.typeWO;
  console.log(typeWO);
  $scope.CountUnRead = "";
  $scope.UnRead = [];
  var EmployeeData = $scope.$parent.EmployeeData;
  // console.log(EmployeeData);

  $scope.isShow = true;

  $scope.toogleUnRead = function () {
    $scope.isShow = !$scope.isShow;
  };

  $scope.$on('reloadNotification', function () {
    loadData(true);
  });

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

  //Paging
  $scope.params = {
  };

  $scope.limit = 20;
  $scope.page = 1;

  function reset() {
    $scope.params = {
    };
    $scope.limit = 20;
    $scope.page = 1;
  }

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


  loadData(true);

  function loadData(count) {
    common.spinner(true);
    var dataUnRead = {
      smanId: EmployeeData.SmanId,
      notificationType: "UnRead"
    }
    if (count) {
      WorkOrderService.getCountNotificationType(dataUnRead).then(function (res) {
        console.log(res);
        $scope.CountRead = res.data;
        $scope.totalElements = res.data;
        $scope.isNoData = ($scope.totalElements <= 0);
        common.spinner(false);
      }, function (err) {
        common.spinner(false);
        console.log(err);
      });

    }

    WorkOrderService.getNotificationType(dataUnRead).then(function (res) {
      console.log(res);
      $scope.UnRead = res.data;
      common.spinner(false);
    }, function (err) {
      console.log(err);
      common.spinner(false);
    });
  }

  $scope.markRead = function (item, index) {
    WorkOrderService.markNotification(item).then(function (res) {
      if (EmployeeData) {
        SmanId = EmployeeData.SmanId;
      }
      loadData(true);
      $state.reload();
    }, function (err) {
      console.log(err);
    });
  };

  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  $scope.openReplyNotification = function (item, id) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/common/notification-form.html',
      controller: 'ReplyNotificationCtrl',
      backdrop: 'static',
      controllerAs: '$ctrl',
      size: "lg",
      resolve: {
        item: item
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log(selectedItem);
      $scope.UnRead[id].Note = $scope.UnRead[id].Note + "\n" + selectedItem.text;

      var obj = object();
      obj.Note = $scope.UnRead[id].Note;
      obj.SmanId = item.SmanId;
      obj.WorkOrderId = $scope.UnRead[id].WorkOrderId;
      obj.WorkOrderRowId = item.WorkOrderRowId;

      HttpService.postData('/site/postNotification', obj).then(function (response) {
        console.log(response);
        common.spinner(false);
      }, function error(response) {
        console.log(response);
        common.spinner(false);
      });

      $rootScope.$emit('message', { "item": "" })

    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

});

UserWebApp.controller('NotificatioRecentReadCtrl', function ($scope, WorkOrderService, $state, $uibModal) {

  var typeWO = $scope.$parent.typeWO;
  $scope.CountRead = "";
  $scope.Read = [];
  var EmployeeData = $scope.$parent.EmployeeData;

  $scope.isShow = true;

  $scope.toogleRead = function () {
    $scope.isShow = !$scope.isShow;
  };

  $scope.$on('reloadNotification', function () {
    loadData(true);
  });

  //Paging
  $scope.params = {
  };

  $scope.limit = 20;
  $scope.page = 1;

  function reset() {
    $scope.params = {
    };
    $scope.limit = 20;
    $scope.page = 1;
  }

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

  loadData(true);

  function loadData(count) {
    common.spinner(true);
    var dataRead = {
      smanId: EmployeeData.SmanId,
      notificationType: "Read"
    }
    if (count) {
      WorkOrderService.getCountNotificationType(dataRead).then(function (res) {
        console.log(res);
        $scope.CountRead = res.data;
        $scope.totalElements = res.data;
        $scope.isNoData = ($scope.totalElements <= 0);
        common.spinner(false);
      }, function (err) {
        common.spinner(false);
        console.log(err);
      });
    }

    WorkOrderService.getNotificationType(dataRead).then(function (res) {
      console.log(res);
      $scope.Read = res.data;
      common.spinner(false);
    }, function (err) {
      console.log(err);
      common.spinner(false);
    });
  }
});

UserWebApp.controller('ReplyNotificationCtrl', function ($scope,
  $uibModalInstance, item, CommonServices, $rootScope, HttpService) {

  $scope.type = "notification";
  var $ctrl = this;
  // console.log(item);

  $scope.target = {
    'employee': item.CreatedBy,
    'smanId': item.SmanId
  }

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $ctrl.save = function () {
    $uibModalInstance.close($scope.target);
  }


});
