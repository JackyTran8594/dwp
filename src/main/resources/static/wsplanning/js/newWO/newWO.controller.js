UserWebApp.controller('newWOCtrl', function ($scope, $rootScope, $locale, HttpService, $translate, $location, $state, $filter, $uibModal, CommonServices) {

  $scope.lstDepartment = [];
  $scope.lstVisitReason = [];
  $scope.lstChargeCats = [];
  $scope.lstJobCats = [];
  $scope.lstPayers = [];
  $scope.lstJobTypes = [];

  $scope.target = {};

  // datepicker-vutt

  console.log($locale);

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };


  $scope.openFromDate = function () {
    $rootScope.popupFromDate.opened = true;
  };

  $scope.openToDate = function () {
    $rootScope.popupToDate.opened = true;
  };


  $rootScope.popupFromDate = {
    opened: false
  };

  $rootScope.popupToDate = {
    opened: false
  };

  loadCombo();

  function loadCombo() {
    CommonServices.getDepartments().then(function (data) {
      $scope.lstDepartment = data
    });
    CommonServices.getVisitReasons().then(function (data) {
      $scope.lstVisitReason = data
    });
    CommonServices.getChargeCats().then(function (data) {
      $scope.lstChargeCats = data
    });
    CommonServices.getPayers().then(function (data) {
      $scope.lstPayers = data
    });
    CommonServices.getJobCats().then(function (data) {
      $scope.lstJobCats = data
    });
    CommonServices.getJobTypes().then(function (data) {
      $scope.lstJobTypes = data
    });

  }

  //

  //Modal
  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  $ctrl.vehicle = function (size, item) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/newWO/modal-form.html',
      controller: 'AllWorkOrderModalCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {
        item: function () {
          return item;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };


  $ctrl.customer = function (size, item) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/newWO/modal-form.html',
      controller: 'AllWorkOrderModalCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {
        item: function () {
          return item;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  $ctrl.contact = function (size, item) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/newWO/modal-form.html',
      controller: 'AllWorkOrderModalCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {
        item: function () {
          return item;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };




});
