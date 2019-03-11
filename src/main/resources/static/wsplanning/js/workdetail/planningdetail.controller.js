UserWebApp.controller('PlanningDetailCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  //These variables MUST be set as a minimum for the calendar to work
  $scope.calendarView = 'day';
  $scope.viewDate = new Date();

  $scope.cellIsOpen = true;
  $rootScope.$on('bookingClick', function (event, obj) {
    console.log(obj.date);
    $scope.cellIsOpen = true;
    $scope.viewDate = obj.date;
  });


});