UserWebApp.controller('SaveBookPoolResourceCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, $uibModalInstance, data, title) {

  var $ctrl = this;
  $ctrl.data = data;
  $ctrl.title = title;


  console.log($ctrl.data);

  $ctrl.save = function () {
    var dateStart = new Date($ctrl.data.Date.getTime());
    var dateEnd = new Date($ctrl.data.Date.getTime());

    var tmp = $ctrl.data.sStart.split(":");
    dateStart.setHours(parseInt(tmp[0]));
    dateStart.setMinutes(parseInt(tmp[1]));
    $ctrl.data.StartTime = dateStart;

    tmp = $ctrl.data.sEnd.split(":");
    dateEnd.setHours(parseInt(tmp[0]));
    dateEnd.setMinutes(parseInt(tmp[1]));
    $ctrl.data.EndTime = dateEnd;

    $uibModalInstance.close($ctrl.data);
  };

  $rootScope.$on('addBookResource', function () {
    $("#startTimeBookPool").focus();
  });

  $ctrl.delete = function () {
    $ctrl.data.RowId = 0 - $ctrl.data.RowId;
    $uibModalInstance.close($ctrl.data);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});