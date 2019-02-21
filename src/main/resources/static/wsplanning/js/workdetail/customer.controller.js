UserWebApp.controller('CustomerCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  $scope.WorkOrderId = $stateParams.id;
  $scope.type = $stateParams.type;


  console.log($scope.WorkOrderId);
  console.log($scope.type);


  $scope.isShow = false;

  $scope.WOCustomer = {};

  if ($scope.WorkOrder) {
    $scope.WOCustomer = $scope.WorkOrder.WOCustomer;
  }

  $scope.toogleVehicle = function () {
    $scope.isShow = !$scope.isShow;
    console.log($scope.WOCustomer);
  }


  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  $scope.searchVehicle = function (item) {
    console.log("----open--------");
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/workdetail/modal/search_vehicle.html',
      controller: 'SearchVehicleModalCtrl',
      controllerAs: '$ctrl',
      size: "full",
      resolve: {
        item: function () {
          return item;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  $rootScope.$on('chooseCustomer', function (event, obj) {
    $scope.WOCustomer = obj.item;
    $scope.WorkOrder.WOCustomer = $scope.WOCustomer;
  });

});