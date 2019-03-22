UserWebApp.controller('PlanningJobCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  //JOB
  $scope.jobTabList = $scope.$parent.WOJobs;

  $scope.totalHours = 0;

  if ($scope.jobTabList) {
    for (var i = 0; i < $scope.jobTabList.length; i++) {
      $scope.totalHours += $scope.jobTabList[i].EstimatedTime;
    }
  }

  var EmployeeData = $("#EmployeeData").data("employee");
  $scope.DeptId = EmployeeData.DeptId;
  $scope.ShiftId = EmployeeData.ShiftId;

  var vm = this;

  //These variables MUST be set as a minimum for the calendar to work
  $scope.calendarView = 'month';
  // $scope.calendarView = 'week';
  $scope.viewDate = new Date();
  $scope.selectedDate = moment($scope.viewDate).add('days', 1).toDate();


  $scope.lstPlanning = [];
  $scope.loadData = function () {
    getCalendarWeek($scope.viewDate);
  }

  // $scope.loadData();

  function getCalendarWeek(date) {
    common.spinner(true);
    var startDate = moment(date).startOf('week').toDate();
    var endDate = moment(date).endOf('week').toDate();
    var params = {
      "DayFrom": formatDateToApi(startDate),
      "DayTo": formatDateToApi(endDate),
      "DeptId": $scope.DeptId,
      "ShiftId": $scope.ShiftId,
    };
    HttpService.postData('/planning', params).then(function (response) {
      $scope.lstPlanning = [];
      var date;
      var found = false;
      while (startDate < endDate) {
        found = false;
        for (var i = 0; i < response.length; i++) {
          date = new Date(response[i].WorkDay);
          if (date.getDate() == startDate.getDate()) {
            $scope.lstPlanning.push(response[i]);
            found = true;
            break;
          }
        }
        if (!found) {
          $scope.lstPlanning.push({
            "FreeCapacity": 0,
            "FreeHour": 0,
            "WorkDay": formatDateToYYYYMMDD(startDate),
          });
        }
        startDate = moment(startDate).add('days', 1).toDate();
      }
      console.log($scope.lstPlanning);
      common.spinner(false);
    }, function error(response) {
      $scope.lstPlanning = [];
      console.log(response);
      common.spinner(false);
    });
  }

  $scope.events = [];

  $scope.cellIsOpen = false;

  $scope.dayClicked = function ($event, field, event) {
    console.log("------dayClicked-------------");
  };

  $scope.timespanClicked = function (date, cell) {
    console.log(cell);
    cell.cssClass = 'cal-day-selected';
    console.log("---timespanClicked: " + date);
    $scope.viewDate = date;
    $rootScope.$broadcast("bookingClick", {"date": date});
    getCalendarWeek($scope.viewDate);
  };

  // $scope.$on('$destroy', function() {
  //   console.log("-$destroy-----");
  //   // calendarConfig.templates.calendarMonthCell = 'mwl/calendarMonthCell.html';
  // });

  //Gen CSS cho cell (day in month)
  $scope.cellModifier = function (cell) {
    console.log("----cellModifier----------" + $scope.viewDate.getMonth() + " - " + $scope.viewDate.getDate());
    if (cell.date._d.getMonth() == $scope.viewDate.getMonth() && cell.date._d.getDate() == $scope.viewDate.getDate()) {
      cell.cssClass = 'cal-day-selected';
      return;
    }

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
    getCalendarMonth();
  }
  $scope.changeShiftId = function () {
    getCalendarMonth();
  }

  function getCalendarMonth() {
    common.spinner(true);
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