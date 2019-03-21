UserWebApp.controller('PlanningDetailCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state,$timeout) {
  var calendar = null;

  function createCalendar(gotoDate) {
    var calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: ['interaction', 'resourceTimeline'],
      timeZone: 'UTC',
      defaultView: 'resourceTimelineDay',
      aspectRatio: 1.5,
      header: {
        left:   false,
        center: 'title',
        right: false
      },
      editable: true,
      resourceLabelText: 'Rooms',
      refetchResourcesOnNavigate: true,
      resources: 'https://fullcalendar.io/demo-resources.json?with-nesting&with-colors',
      events: 'https://fullcalendar.io/demo-events.json?single-day&for-resource-timeline'
    });

    calendar.render();

    $(".fc-left").hide();
    $(".fc-right").hide();

    if(gotoDate){
      calendar.gotoDate(new Date(gotoDate.getTime() + 24 * 60 * 60 * 1000));
    }
  }

  $scope.init = function() {
  }


  $rootScope.$on('bookingClick', function (event, obj) {
    if(calendar == null){
      createCalendar(new Date(obj.date));
    }else{
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