UserWebApp.controller('PlanningJobCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  //JOB
  $scope.jobTabList = $scope.$parent.WOJobs;

  $scope.totalHours = 0;

  if($scope.jobTabList) {
    for (var i = 0; i < $scope.jobTabList.length; i++) {
      $scope.totalHours += $scope.jobTabList[i].EstimatedTime;
    }
  }

  var EmployeeData = $("#EmployeeData").data( "employee");
  $scope.DeptId = EmployeeData.DeptId;
  $scope.ShiftId = EmployeeData.ShiftId;

  var vm = this;

  //These variables MUST be set as a minimum for the calendar to work
  $scope.calendarView = 'month';
  // $scope.calendarView = 'week';
  $scope.viewDate = new Date();


  $scope.lstPlanning = [];
  $scope.loadData = function () {
    getCalendarWeek($scope.viewDate);
  }

  // $scope.loadData();

  function getCalendarWeek(date) {
    var params = {
      "DayFrom": formatDateToApi(moment(date).startOf('week').toDate()),
      "DayTo": formatDateToApi(moment(date).endOf('week').toDate()),
      "DeptId": $scope.DeptId,
      "ShiftId": $scope.ShiftId,
    };
    HttpService.postData('/planning', params).then(function (response) {
      $scope.lstPlanning = response;
      common.spinner(false);
    }, function error(response) {
      $scope.lstPlanning = [];
      console.log(response);
      common.spinner(false);
    });
  }

  $scope.events = [];

  $scope.cellIsOpen = false;

  $scope.toggle = function ($event, field, event) {
    $event.preventDefault();
    $event.stopPropagation();
    event[field] = !event[field];
  };

  $scope.timespanClicked = function (date, cell) {
    console.log("---timespanClicked: " + date);
    $scope.viewDate = date;
    // $rootScope.$broadcast("bookingClick", {"date": date});
    getCalendarWeek($scope.viewDate);
    return;
  };

  $scope.cellModifier = function (cell) {
    var length = $scope.lstMonth.length;
    var WorkDay = null;
    var date = new Date();
    for (var i = 0; i < length; i++) {
      WorkDay = $scope.lstMonth[i];
      date = new Date(WorkDay.WorkDay);
      if (date.getMonth() == cell.date._d.getMonth() && date.getDate() == cell.date._d.getDate()) {
        if (WorkDay.FreeCapacity > 100) {
          cell.cssClass = 'booked';
        } else if (WorkDay.FreeCapacity == 100) {
          cell.cssClass = 'free';
        } else if (WorkDay.FreeCapacity >= 75) {
          cell.cssClass = 'cap75';
        } else if (WorkDay.FreeCapacity >= 50) {
          cell.cssClass = 'cap50';
        } else if (WorkDay.FreeCapacity >= 25) {
          cell.cssClass = 'cap25';
        }
        // cell.label = '-' + cell.label + '-' + WorkDay.FreeCapacity;
        return;
      }
    }
  };


  $scope.onClickCal = function (item) {
    console.log("---onClickCal---");
    console.log(item);
  }

  $scope.dateClicked = function (item) {
    console.log("---dateClicked---");
    console.log(item);
  }

  $scope.detailBooking = function (item) {
    console.log(item);
    $rootScope.$broadcast("bookingClick", {"date": item.WorkDay});
  }



  $scope.changeDeptId = function () {

  }
  $scope.changeShiftId = function () {

  }

  function changeData() {
    var startDate = new Date();
    var endDate = moment(startDate).add(1, 'M');

    var params = {
      "DayFrom": formatDateToApi(moment(startDate).startOf('month').toDate()),
      "DayTo": formatDateToApi(moment(endDate).endOf('month').toDate()),
      "DeptId": $scope.DeptId,
      "ShiftId": $scope.ShiftId,
    };
    HttpService.postData('/planning', params).then(function (response) {
      $scope.lstMonth = response;
      common.spinner(false);

      getCalendarWeek($scope.viewDate);
    }, function error(response) {
      $scope.lstPlanning = [];
      console.log(response);
      common.spinner(false);
    });
  }


});