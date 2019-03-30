UserWebApp.controller('PlanningDetailCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, WorkOrderService, CommonServices, $stateParams, $state, $timeout) {
  var calendar = null;

  var EmployeeData = $("#EmployeeData").data("employee");
  $scope.DeptId = EmployeeData.DeptId;
  $scope.ShiftId = EmployeeData.ShiftId;

  function createCalendar(gotoDate, deptId) {
    var calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: ['interaction', 'resourceTimeline'],
      timeZone: 'UTC',
      defaultView: 'resourceTimelineDay',
      aspectRatio: 1.5,
      header: {
        left: false,
        center: 'title',
        right: false
      },
      editable: true,
      resourceLabelText: $translate.instant('mechanic'),
      refetchResourcesOnNavigate: true,
      minTime: "05:00:00",
      maxTime: "20:00:00",
      // resources: 'https://fullcalendar.io/demo-resources.json?with-nesting&with-colors',
      // events: 'https://fullcalendar.io/demo-events.json?single-day&for-resource-timeline'
      resourceAreaWidth: "15%",
      // resources: {
      //   url: '/resources'
      // },
      resources: callResource(deptId),
      selectable: true,
      select: function (selectionInfo) {
        console.log(selectionInfo);
        var abc = prompt('Enter Title');
        // var allDay = !start.hasTime && !end.hasTime;
        var newEvent = new Object();
        newEvent.title = abc;
        newEvent.resourceId = selectionInfo.resource.id;
        newEvent.start = moment(selectionInfo.start).format();
        newEvent.end = moment(selectionInfo.end).format();
        newEvent.allDay = false;
        calendar.addEvent(newEvent);
        // $('#calendar').fullCalendar('renderEvent', newEvent);
      },
      events: {
        url: '/events2',
        method: 'GET',
        headers: { "Content-type": "application/json" },
        contentType: 'application/json',
        dataType: "json",
        extraParams: function () {
          common.spinner(true);
          return {
            "DeptId": "",
            "ShiftId": "",
          };
        },
        success: function () {
          common.spinner(false);
        },
        failure: function () {
          common.spinner(false);
        }
      }
    });

    calendar.render();

    $(".fc-left").hide();
    $(".fc-right").hide();

    if (gotoDate) {
      calendar.gotoDate(new Date(gotoDate.getTime() + 24 * 60 * 60 * 1000));
    }
  }

  function callResource(param) {
    WorkOrderService.resources().then(function (res) {
      var lst = [];
      console.log(res);
      if (param.toLowerCase() === "all") {
        lst = res.data;
        return lst;
      } else {
        lst = res.data.filter((x) => { return x.deptId === param });
        console.log(lst);
        return lst;
      }
    }, function (error) {
      console.log(error)
    });

  }

  $scope.init = function () {
  }


  $rootScope.$on('bookingClick', function (event, obj) {
    if (calendar == null) {
      createCalendar(new Date(obj.date), $scope.DeptId);
    } else {
      var startDate = new Date(obj.date);
      var endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
      calendar.gotoDate(endDate);
      // calendar.defaultDate = startDate;

      // calendar.getEventSources()[0].internalEventSource.fetchRange.start = startDate;
      // calendar.getEventSources()[0].internalEventSource.fetchRange.end = endDate;

      // calendar.getEventSources()[0].internalEventSource.fetchRange.end = new Date("2019-03-21T00:00:00");
      // calendar.getEventSources()[0].internalEventSource.fetchRange.start = new Date("2019-03-20T00:00:00");

      // calendar.removeAllEvents();
      // // calendar.refetchEvents();
      // if (obj.events) {
      //   // calendar.refetchEvents();
      //   // calendar.addEventSource(obj.events);
      //   calendar.rerenderEvents();
      //   console.log(obj.events);
      // } else {
      // }
    }

  });



});