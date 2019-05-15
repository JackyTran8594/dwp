UserWebApp.controller('EditBookPoolModalCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, $uibModalInstance, data, title,listData) {

  var $ctrl = this;

  $ctrl.title = title;
  $ctrl.lstData = [];

  angular.copy(listData,$ctrl.lstData);
  console.log($ctrl.lstData);

  $ctrl.isNoData = (!listData || listData.length <= 0);

  $ctrl.deleteItem = function(item){
    item.RowId = 0 - parseInt(item.RowId);
  };

  $rootScope.$on('editBookPool', function () {
  });

  $ctrl.save = function () {
    $uibModalInstance.close($ctrl.lstData);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});