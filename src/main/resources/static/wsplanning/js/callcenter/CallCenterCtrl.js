UserWebApp.controller('CallCenterCtrl', function ($scope, $rootScope, $locale, HttpService, $translate, $location, $state, $filter, $uibModal, CommonServices) {
  $scope.code = "";

  $scope.toogleActiveCall = function () {
    $rootScope.$broadcast("toogleActiveCall", { "item": {} });
  }

  $scope.toogleRecentCall = function () {
    $rootScope.$broadcast("toogleRecentCall", { "item": {} });
  }

});