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


  $rootScope.$on('chooseContact', function (event, obj) {
    $scope.WOContact = obj.item;
    $scope.WorkOrder.WOContact = $scope.WOContact;
  });


});