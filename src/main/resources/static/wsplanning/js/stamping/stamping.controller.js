UserWebApp.controller('StampingCtrl', function ($scope, $rootScope, $locale, WorkOrderService, HttpService, $translate, $location, $state, $filter, $uibModal, CommonServices, typeWO) {

  $scope.typeWO = typeWO;
  $scope.stamping = {};
  $scope.stampingCodes = [];

  console.log($scope.stamping);

  loadData();

  function loadData() {
    WorkOrderService.getStamping().then(function (res) {
      console.log(res);
      res.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
      res.data = res.data.filter(x => { return x.Id !== "040" });
      $scope.stampingCodes = res.data;
    }, function (err) {
      console.log(err);
    })
  }

  $scope.onRefresh = function () {
    $state.reload();
  }


  //function viewDetail
  $scope.viewDetail = function (item) {
    $state.go('app.main.workdetail', { 'id': item.WorkOrderId, 'type': typeWO });
  }

  $scope.newWorkorder = function () {
    $state.go('app.main.newwo', { 'type': typeWO, 'action': "wo" });
  }

  $scope.newOffer = function () {
    $state.go('app.main.newoffer', { 'type': typeWO, 'action': "offer" });
  }

  $scope.newBooking = function () {
    $state.go('app.main.booking', { 'type': typeWO, 'action': "booking" });
  }

  $scope.save = function (stampingCode) {
    var item = {
      StampingCode: stampingCode
    }
    WorkOrderService.stamp(item).then(function (res) {
      if (res.status === 200) {
        common.notifySuccess("Success!!!");
      } else {
        common.notifyError("Error!!!");
      }
      $state.reload();
    }, function (err) {
      common.notifyError("Error!!!" + err.status);
    })
  };

});


// Modal controller

UserWebApp.controller('StampingModalCtrl', function ($scope, $rootScope, HttpService, WorkOrderService, item, $translate, $location, $filter, $uibModal, $uibModalInstance, item) {

  var $ctrl = this;
  $scope.target = item;
  $ctrl.selected = item;
  console.log(item)


  $ctrl.save = function () {
    WorkOrderService.stamp(item).then(function (res) {
      // console.log(res)
      $uibModalInstance.close(res);
    }, function (err) {
      // console.log(err)
      $uibModalInstance.close(err);
    })
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

//end