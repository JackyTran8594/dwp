UserWebApp.controller('ContractCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  $scope.WorkOrderId = $stateParams.id;
  $scope.type = $stateParams.type;

  $scope.isShow = false;

  $scope.WOContact = {};

  if ($scope.WorkOrder) {
    $scope.WOContact = $scope.WorkOrder.WOContact;
  }

  $scope.toogleVehicle = function () {
    $scope.isShow = !$scope.isShow;
  }


  var $ctrl = this;
  $ctrl.animationsEnabled = true;


  $rootScope.$on('chooseContact', function (event, obj) {
    $scope.WOContact = obj.item;
    $scope.WorkOrder.WOContact = $scope.WOContact;
  });


  $rootScope.$on('chooseUserCustomer', function (event, obj) {
    $scope.WOContact = obj.item;
    $scope.WorkOrder.WOContact = $scope.WOContact;
  });

});