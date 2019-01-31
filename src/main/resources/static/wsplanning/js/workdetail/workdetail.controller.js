UserWebApp.controller('WorkDetailCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state, WorkOrder, WorkOrderService) {
  $scope.WorkOrderId = $stateParams.id;
  $scope.type = $stateParams.type;


  console.log(WorkOrder);
  $scope.WorkOrder = WorkOrder.data;

  $scope.WorkOrder._ServiceDate = new Date($scope.WorkOrder.ServiceDate);
  if ($scope.WorkOrder.CheckOutDate == "" || $scope.WorkOrder.CheckOutDate == "0001-01-01T00:00:00") {
    $scope.WorkOrder._CheckOutDate = "";
  } else {
    $scope.WorkOrder._CheckOutDate = new Date($scope.WorkOrder.CheckOutDate);
  }
  if ($scope.WorkOrder.CheckInDate == "" || $scope.WorkOrder.CheckInDate == "0001-01-01T00:00:00") {
    $scope.WorkOrder._CheckInDate = "";
  } else {
    $scope.WorkOrder._CheckInDate = new Date($scope.WorkOrder.CheckInDate);
  }

  if ($scope.WorkOrder.ExecutionDate == "" || $scope.WorkOrder.ExecutionDate == "0001-01-01T00:00:00") {
    $scope.WorkOrder._ExecutionDate = "";
  } else {
    $scope.WorkOrder._ExecutionDate = new Date($scope.WorkOrder.ExecutionDate);
  }

  if ($scope.WorkOrder.BookMOTDate == "" || $scope.WorkOrder.BookMOTDate == "0001-01-01T00:00:00") {
    $scope.WorkOrder._BookMOTDate = "";
  } else {
    $scope.WorkOrder._BookMOTDate = new Date($scope.WorkOrder.BookMOTDate);
  }

  // $scope.$watch('WorkOrder.Mileage',function(){
  //   console.log($scope.WorkOrder.Mileage);
  //   $scope.WorkOrder.Mileage = $filter('number')($scope.WorkOrder.Mileage);
  //   console.log($scope.WorkOrder.Mileage);
  // });

  function loadData() {
  }

  loadData();

  $scope.tabActive = "header";
  $scope.changeTab = function (tabActive, abc) {
    $scope.tabActive = tabActive;
  }

});