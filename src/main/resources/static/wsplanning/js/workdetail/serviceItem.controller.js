UserWebApp.controller('ServiceItemModalCtrl', function ($scope, $rootScope, WorkOrderService, $uibModalInstance, item, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  // $scope.WorkOrderId = $stateParams.id;
  // $scope.type = $stateParams.type;

  var $ctrl = this;
  
  var listItem = [];

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  
  $scope.checkItem = function (id, checked) {
	 if(listItem.length > 0) {
		 angular.forEach(listItem, function(v,i){
			 
		 })
	 }
  }

  $scope.skey = "";

  $scope.lstAllData = [];
  $scope.lstData = [];
  $scope.lstSearch = [];
  $scope.totalElements = 0;

  $scope.limit = 20;
  $scope.page = 1;


  function loadData(count) {
    common.spinner(true);

    var params = {
      itemType: item.itemType,
      skey: $scope.skey,
      vehiId: item.vehiId,
      custNo: item.custNo,
      page: $scope.page,
      pageCount: $scope.limit
    }

    if (count) {
      WorkOrderService.serviceItem(params).then(function (response) {
        $scope.lstData = response.data;
        console.log(response);
        $scope.pageGo = $scope.page;
        $scope.isShow = false;
        common.spinner(false);
      }, function error(response) {
        console.log(response);
        common.spinner(false);
      });

      WorkOrderService.countServiceItem(params).then(function (response) {
        $scope.totalElements = response.data;

        console.log(response);
        $scope.isNoData = ($scope.totalElements <= 0);
        common.spinner(false);
      }, function error(response) {
        console.log(response);
        common.spinner(false);
      });
    }
  }

  // loadData(true);


  //<editor-fold desc="Paging & Search Port">
  $scope.$watch("page", function (newValue, oldValue) {
    if (newValue != oldValue) {
      $scope.page = newValue;
      loadData();
    }
  });

  $scope.go = function () {
    $scope.page = $scope.pageGo;
  }

  $scope.changeLimit = function () {
    loadData(false);
  }
  $scope.doSearch = function () {
    $scope.page = 1;
    $scope.pageGo = 1;
    loadData(true);
  }
  //</editor-fold>

  $scope.doPick = function (data) {
    $uibModalInstance.close(data);
  }



});