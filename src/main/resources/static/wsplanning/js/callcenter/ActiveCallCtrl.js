UserWebApp.controller('ActiveCallCtrl', function ($scope, $rootScope, $locale, HttpService, $translate, $location, $state, $filter, $uibModal, CommonServices) {
  $scope.isShow = true;


  $rootScope.$on('toogleActiveCall', function () {
    $scope.isShow = !$scope.isShow;
  });

  //Paging
  $scope.params = {
  };

  $scope.limit = 20;
  $scope.page = 1;

  function reset() {
    $scope.params = {
    };
    $scope.limit = 20;
    $scope.page = 1;
  }

  function loadData(count) {
    common.spinner(true);
    var params = {
      "page": $scope.page,
      "limit": $scope.limit,
      "SmanId": $scope.SmanId,
      "CallType": "ActiveCall",
    };

    HttpService.postData('/phonecall/getdata', params).then(function (response) {
      $scope.lstData = [];
      angular.forEach(response, function (value) {
        if (value.CallerVehicles && value.CallerVehicles.length <= 0) {
          value.CallerVehicles = null;
        }
        $scope.lstData.push(value);
      });
      $scope.pageGo = $scope.page;
      common.spinner(false);
    }, function error(response) {
      console.log(response);
      common.spinner(false);
    });

    if (count) {
      HttpService.postData('/phonecall/count', params).then(function (response) {
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