UserWebApp.controller('WorkDetailCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state, WorkOrder,WorkOrderService) {
  $scope.WorkOrderId = $stateParams.id;
  $scope.type = $stateParams.type;


  console.log(WorkOrder);
  $scope.WorkOrder = WorkOrder.data;

  function loadData() {
  }

  loadData();

  $scope.tabActive = "header";
  $scope.changeTab = function (tabActive, abc) {
    $scope.tabActive = tabActive;
  }

});