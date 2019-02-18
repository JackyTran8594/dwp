UserWebApp.controller('JobDetailCtrl', function ($scope, $rootScope, WorkOrderService ,HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  
  var $ctrl = this;

  $ctrl.jobParams = $scope.$parent.jobObject;

  console.log($ctrl.jobParams);

  $scope.jobTabList = [];

  loadData($ctrl.jobParams);

  function loadData(params) {
    WorkOrderService.jobTab(params).then(function(res){
      $scope.jobTabList = res;
      console.log(res);
    }, function(err){
      console.log(err);
    })
  }




});