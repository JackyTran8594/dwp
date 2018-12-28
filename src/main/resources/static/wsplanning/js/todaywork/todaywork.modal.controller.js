UserWebApp.controller('TodayWorkModalCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, $uibModalInstance, item) {

  var $ctrl = this;
  $ctrl.item = item;
  $ctrl.selected = item;

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});