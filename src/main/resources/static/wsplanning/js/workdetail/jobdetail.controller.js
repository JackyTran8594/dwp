UserWebApp.controller('JobDetailCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {

  var $ctrl = this;

  $ctrl.jobParams = $scope.$parent.jobObject;

  console.log($ctrl.jobParams);

  $scope.jobTabList = [];

  loadData($ctrl.jobParams);

  function loadData(params) {
    WorkOrderService.jobTab(params).then(function (res) {
      $scope.jobTabList = res.data;
      console.log(res);
    }, function (err) {
      console.log(err);
    })
  }

  $ctrl.animationsEnabled = true;
  $scope.addItem = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/workdetail/modal/job-new.html',
      controller: 'JobNewModalCtrl',
      backdrop: 'static',
      controllerAs: '$ctrl',
      size: "lg",
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

  $scope.recentSalesList = [];

  // call searchserviceitem
  $scope.recentSales = function (itemType, skey) {
    var params = {
      itemType: itemType,
      skey: skey
    };
    WorkOrderService.serviceItem(params).then(function (res) {
      $scope.recentSalesList = res.data;
      console.log(res);
    }, function (err) {
      console.log(err);
    });
  }




  console.log(item);

  $scope.jobTabList = [];

  loadData(item);

  function loadData(params) {
    common.spinner(true);
    WorkOrderService.jobTab(params).then(function (res) {
      var data = res.data;
      angular.forEach(data, function (value) {
        var objTree = {};
        objTree.id = value.Id;
        objTree.label = value.Name;
        objTree.children = [];
        var items = value.SubGroups;
        angular.forEach(items, function (item) {
          var objSub = {};
          objSub.id = item.Id;
          objSub.label = item.Name;
          objSub.jobType = item.JobType;
          objSub.children = [];
          var list = item.AdditionalData;
          angular.forEach(list, function (obj) {
            var objAdd = {};
            objAdd.id = obj.Id;
            objAdd.label = obj.Label;
            objSub.children.push(objAdd);
          });

          objTree.children.push(objSub);
        });
        $scope.jobTabList.push(objTree);
      }
      );

      console.log($scope.jobTabList);
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