UserWebApp.controller('ServiceItemModalCtrl', function ($scope, $rootScope, HttpService, item, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  $scope.WorkOrderId = $stateParams.id;
  $scope.type = $stateParams.type;
  var $ctrl = this;


  $scope.skey = "";

  $scope.lstAllData = [];
  $scope.lstData = [];
  $scope.lstSearch = [];
  $scope.totalElements = 0;

  $scope.limit = 10;
  $scope.page = 1;

  console.log($scope.WorkOrderId);
  console.log($scope.type);

  function loadData(count) {
    common.spinner(true);

    var params = {
      ItemType: item,
      skey: $scope.skey
    }

    if (count) {
      HttpService.postData('/wo/getServiceItem', { params }).then(function (response) {
        $scope.lstData = response;
        console.log(response);
        $scope.pageGo = $scope.page;
        $scope.isShow = false;
        common.spinner(false);
      }, function error(response) {
        console.log(response);
        common.spinner(false);
      });

      HttpService.postData('/wo/getCountServiceItem', { params }).then(function (response) {
        $scope.totalElements = response;
        $scope.isNoData = ($scope.totalElements <= 0);
        common.spinner(false);
      }, function error(response) {
        console.log(response);
        common.spinner(false);
      });
    }
  }

  loadData(true);


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




});