UserWebApp.controller('PlanningJobCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $timeout) {
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
  $scope.calendarViewNext = 'day';
  // $scope.calendarView = 'week';
  $scope.viewDate = new Date();

  $scope.lstPlanning = [];
  $scope.loadData = function () {
    getCalendarWeek($scope.viewDate);
  }

  function getCalendarWeek(date) {
    common.spinner(true);
    $rootScope.$broadcast("bookingClick", {"date": date});
    var startDate = date;
    var endDate = moment(startDate).add('days', 7).toDate();
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
    console.log("---timespanClicked: " + date + " " + $scope.viewDate.getMonth() + " - " + date.getMonth());
    if($scope.viewDate.getMonth() != date.getMonth()){
      $scope.viewDate = date;
      getCalendarMonth();
    }else{
      $scope.viewDate = date;
      getCalendarWeek($scope.viewDate);
    }
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
    var preDate = moment(item.WorkDay).add('days', -1).toDate();
    console.log(preDate);
    $rootScope.$broadcast("bookingClick", {"date": preDate});
  }


  $scope.changeDeptId = function () {
    getCalendarMonth();
  }
  $scope.changeShiftId = function () {
    getCalendarMonth();
  }

  function getCalendarMonth() {
    common.spinner(true);
    var startDate = $scope.viewDate;
    var endDate = moment(startDate).add(1, 'M');

    var params = {
      "DayFrom": formatDateToApi(moment(startDate).startOf('month').toDate()),
      "DayTo": formatDateToApi(moment(endDate).startOf('month').toDate()),
      "DeptId": $scope.DeptId,
      "ShiftId": $scope.ShiftId,
    };
    $scope.lstMonth = [];
    HttpService.postData('/planning', params).then(function (response) {
      $scope.lstMonth = response;
      common.spinner(false);

      getCalendarWeek($scope.viewDate);
    }, function error(response) {
      $scope.lstMonth = [];
      console.log(response);
      common.spinner(false);
    });
  }

  //Action
  $scope.previous = function () {
    if ($scope.viewDate.getDate() == 1) {
      var preDate = moment($scope.viewDate).add('days', -1).toDate();
      var lastDateOfMonth = moment(preDate).endOf('month').toDate().getDate();
      $timeout(function () {
        $(".day_" + lastDateOfMonth).first().click();
      }, 1);
    } else {
      var preDate = moment($scope.viewDate).add('days', -1).toDate();
      if (preDate.getDate() <= 8) {
        $timeout(function () {
          $(".day_" + preDate.getDate()).first().click();
        }, 100);
      } else {
        $timeout(function () {
          $(".day_" + preDate.getDate()).last().click();
        }, 100);
      }
    }
  }

  $scope.today = function () {
    $scope.viewDate = new Date();
    $scope.viewDate.setHours(0,0,0,0);
    getCalendarMonth();
  }

  $scope.next = function () {
    // var oldMonth = $scope.viewDate.getMonth();
    var lastDateOfMonth = moment($scope.viewDate).endOf('month').toDate().getDate();

    console.log("$scope.viewDate.getDate(): " + $scope.viewDate.getDate());
    console.log("lastDateOfMonth: " + lastDateOfMonth);

    if ($scope.viewDate.getDate() == lastDateOfMonth) {
      $timeout(function () {
        $(".day_1").last().click();
      }, 1);
    } else {
      var nextDate = moment($scope.viewDate).add('days', 1).toDate();
      if (nextDate.getDate() <= 8) {
        $timeout(function () {
          $(".day_" + nextDate.getDate()).first().click();
        }, 100);
      } else {
        $timeout(function () {
          $(".day_" + nextDate.getDate()).last().click();
        }, 100);
      }
    }
    // getCalendarMonth();
    // if($scope.viewDate.getMonth() != oldMonth){
    //   getCalendarMonth();
    // }else{
    //   getCalendarWeek($scope.viewDate);
    // }
  }

  $scope.previousMonth = function () {
    var preDate = moment($scope.viewDate).add('month', -1).toDate();
    preDate.setDate(1);
    $scope.viewDate = preDate;
    $timeout(function () {
      $(".day_1").first().click();
    }, 100);
  }

  $scope.nextMonth = function () {
    var nextDate = moment($scope.viewDate).add('month', 1).toDate();
    nextDate.setDate(1);
    $scope.viewDate = nextDate;
    $timeout(function () {
      $(".day_1").first().click();
    }, 100);
  }


  // $timeout(function () {
  //   $(".cal-day-today").click();
  // }, 1000);


  //Right click
  $scope.items = [
    {
      name: 'item 1',
      data: 'the data !'
    },
    {
      name: 'item 2',
      data: 'the data !'
    },
    {
      name: 'item 3',
      data: 'the data !'
    },
    {
      name: 'item 4',
      data: 'the data !'
    },
  ]

  $scope.menuOptions =
    [
      {
        label: 'Save',      // menu option label
        onClick: menuSave   // on click handler
      },
      {
        label: 'Edit',
        onClick: menuEdit,
        disabled: function (dataContext) {
          return dataContext.name === "item 2";
        }
      },
      {
        label: 'Details',
        onClick: menuEdit
      },
      {
        divider: true       // will render a divider
      },
      {
        label: 'Remove',
        onClick: menuRemove
      }
    ]


  function menuSave($event) {
    console.log($event);
  }
  function menuRemove($event) {
    console.log($event);
  }
  function menuEdit($event) {
    console.log($event);
  }
});