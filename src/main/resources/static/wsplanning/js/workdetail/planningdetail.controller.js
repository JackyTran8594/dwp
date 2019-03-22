UserWebApp.controller('PlanningDetailCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state, $timeout) {
  var calendar = null;

  var EmployeeData = $("#EmployeeData").data( "employee");
  $scope.DeptId = EmployeeData.DeptId;
  $scope.ShiftId = EmployeeData.ShiftId;

  function createCalendar(gotoDate) {
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
      resources: {
        url: '/resources'
      },
      events: {
        url: '/events2',
        method: 'GET',
        headers: { "Content-type": "application/json" },
        contentType: 'application/json',
        dataType: "json",
        extraParams: function() {
          common.spinner(true);
          return {
            "DeptId": $scope.DeptId,
            "ShiftId": $scope.ShiftId,
          };
        },
        success: function () {
          common.spinner(false);
        },
        failure: function() {
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

  $scope.init = function () {
  }


  $rootScope.$on('bookingClick', function (event, obj) {
    if (calendar == null) {
      createCalendar(new Date(obj.date));
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