UserWebApp.controller('SaveBookPoolModalCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, $uibModalInstance, data, title) {

  var $ctrl = this;

  $ctrl.title = title;

  $ctrl.obj = {
    "WorkDay": data.WorkDay,
    "start": "08:00",
    "end": "18:00",
    "duration": "",
  }

  $rootScope.$on('addBookPool', function () {
    $("#durationPool").focus();
  });

  $ctrl.save = function () {
    $uibModalInstance.close($ctrl.obj);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});