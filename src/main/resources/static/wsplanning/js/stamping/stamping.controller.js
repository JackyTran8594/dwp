UserWebApp.controller('StampingCtrl', function ($scope, $rootScope, $local, WorkOrderService, HttpService, $translate, $location, $state, $filter, $uibModal, CommonServices, typeWO) {

  $scope.typeWO = typeWO;
  $scope.stamping = {};

  loadData();

  function loadData() {
    WorkOrderService.getStamping().then(function (res) {
      console.log(res);
      res.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
      res.data = res.data.filter(x => { return x.Id !== "040" });
      $scope.stamping = res.data;
    }, function (err) {
      console.log(err);
    })
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


});


// Modal controller

UserWebApp.controller('StampingModalCtrl', function ($scope, $rootScope, HttpService, WorkOrderService, item, $translate, $location, $filter, $uibModal, $uibModalInstance, item) {

  var $ctrl = this;
  $scope.target = item;
  $ctrl.selected = item;

  $ctrl.save = function () {

    WorkOrderService.stamp(item).then(function (res) {
      console.log(res)

    }, function (err) {
      console.log(err)
      
    })

    $uibModalInstance.close($ctrl.selected);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

//end