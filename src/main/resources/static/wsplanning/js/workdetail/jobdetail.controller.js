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

  $scope.title = "Job Quick Selection";


  var $ctrl = this;



  console.log(item);

  $scope.jobTabList = [];



  loadData(item);

  function loadData(params) {
    common.spinner(true);
    WorkOrderService.jobTab(params).then(function (res) {
      $scope.jobTabList = res.data;
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