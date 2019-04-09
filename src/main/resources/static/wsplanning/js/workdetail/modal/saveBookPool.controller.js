UserWebApp.controller('SaveBookPoolModalCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, $uibModalInstance, data, title) {

  var $ctrl = this;

  $ctrl.title = title;

  $ctrl.obj = {
    "date": data.WorkDay,
    "start": "08:00",
    "end": "18:00",
    "duration": "0",
  }

  $ctrl.save = function () {
    $uibModalInstance.close($ctrl.obj);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});