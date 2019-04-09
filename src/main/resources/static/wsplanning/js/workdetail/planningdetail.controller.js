UserWebApp.controller('PlanningDetailCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $uibModal, WorkOrderService, CommonServices, $stateParams, $state, $timeout) {
  var calendar = null;

  var EmployeeData = $("#EmployeeData").data("employee");
  $scope.DeptId = EmployeeData.DeptId;
  $scope.ShiftId = EmployeeData.ShiftId;

  function createCalendar(gotoDate, deptId) {
    var calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: ['dayGrid', 'timeGrid', 'interaction', 'resourceTimeline'],
      timeZone: 'UTC',
      defaultView: 'resourceTimelineDay',
      aspectRatio: 1.5,
      height: 600,
      scrollTime: '07:00',
      slotDuration: "00:15:00",
      header: {
        left: false,
        center: 'title',
        right: false
      },
      editable: true,
      resourceLabelText: $translate.instant('mechanic'),
      refetchResourcesOnNavigate: true,
      resourceAreaWidth: "15%",
      resources: {
        url: '/resources',
        method: 'GET',
        extraParams: function () {
          return {
            "DeptId": $scope.DeptId,
            "ShiftId": $scope.ShiftId,
          };
        },
      },
      resourceOrder: 'title,-id',
      resourceRender: function (renderInfo) {
        var info = renderInfo.resource._resource;
        if (info.breakHours) {
          console.log(info);
        }

        // renderInfo.el.style.display = 'none';
        // var info = renderInfo.resource._resource;
        // var display = true;
        // if ($scope.DeptId != "" && $scope.DeptId > 0) {
        //   if (info.extendedProps.deptId != $scope.DeptId) {
        //     display = false;
        //   }
        // }
        //
        // if(display) {
        //   if ($scope.ShiftId != "" && $scope.ShiftId > 0) {
        //     if (info.extendedProps.shiftId != $scope.ShiftId) {
        //       display = false;
        //     }
        //   }
        // }
        //
        // if(display){
        //   renderInfo.el.style.display = 'inherit';
        // }else{
        //   renderInfo.el.style.display = 'none';
        // }
      },
      // resources: callResource(deptId),
      selectable: true,
      select: function (selectionInfo) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/wsplanning/templates/pages/workdetail/tabs/planning/modal/save_resource.html',
          controller: 'SaveBookPoolResourceCtrl',
          controllerAs: '$ctrl',
          size: "lg",
          resolve: {
            data: function () {
              var start = dateFromStringWithTimeZone(selectionInfo.startStr);
              var end = dateFromStringWithTimeZone(selectionInfo.endStr);
              return {
                "RowId": 0,
                "StartTime": start,
                "EndTime": end,
                "Date": start,
                "sStart": formatToTimeHHmm(start),
                "sEnd": formatToTimeHHmm(end),
                "Duration": 0,
                "ResourceId": selectionInfo.resource.id,
                "ResourceType": selectionInfo.resource._resource.extendedProps.ResType,
              };
            },
            title: function () {
              return $translate.instant('addBookResource');
            }
          }
        });

        modalInstance.result.then(function (value) {
          if (value) {
            //Add event (starttime and endtime add timezone
            var timezone = 0 - new Date().getTimezoneOffset();
            var newEvent = new Object();
            newEvent.title = "test";
            newEvent.resourceId = selectionInfo.resource.id;
            newEvent.start = moment(value.StartTime).add(timezone, 'minutes').format();
            newEvent.end = moment(value.EndTime).add(timezone, 'minutes').format();
            newEvent.allDay = false;
            console.log(newEvent);
            calendar.addEvent(newEvent);

            //Add to Workorder
            var duration = moment.duration(moment(value.EndTime).diff(moment(value.StartTime)));
            var hours = duration.asHours();

            console.log("duration: " + hours);

            if(!$scope.WorkOrder.BookedResources){
              $scope.WorkOrder.BookedResources = [];
            }

            $scope.WorkOrder.BookedResources.push({
              "RowId": 0,
              "Duration": hours,
              "StartTime": value.StartTime,
              "EndTime": value.EndTime,
              "ResourceId": value.ResourceId,
              "ResourceType": value.ResourceType
            });

          }
        }, function () {
        });


        // var abc = prompt('Enter Title');
        // var newEvent = new Object();
        // newEvent.title = abc;
        // newEvent.resourceId = selectionInfo.resource.id;
        // newEvent.start = moment(selectionInfo.start).format(); //"2019-04-09T18:00:00+07:00"
        // newEvent.end = moment(selectionInfo.end).format();
        // newEvent.allDay = false;
        // console.log(newEvent);
        // calendar.addEvent(newEvent);
      },
      events: {
        url: '/events2',
        method: 'GET',
        headers: {"Content-type": "application/json"},
        contentType: 'application/json',
        dataType: "json",
        extraParams: function () {
          common.spinner(true);
          return {
            "DeptId": $scope.DeptId,
            "ShiftId": $scope.ShiftId,
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

  // function callResource(param) {
  //   WorkOrderService.resources().then(function (res) {
  //     var lst = [];
  //     console.log(res);
  //     if (param.toLowerCase() === "all") {
  //       lst = res.data;
  //       return lst;
  //     } else {
  //       lst = res.data.filter((x) = > {return x.deptId === param}
  //     )
  //       ;
  //       console.log(lst);
  //       return lst;
  //     }
  //   }, function (error) {
  //     console.log(error)
  //   });
  //
  // }

  $scope.init = function () {
  }


  $rootScope.$on('bookingClick', function (event, obj) {
    console.log(obj);
    $scope.DeptId = obj.DeptId;
    $scope.ShiftId = obj.ShiftId;

    if (calendar == null) {
      createCalendar(new Date(obj.date), $scope.DeptId);
    } else {
      var startDate = new Date(obj.date);
      var endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
      calendar.refetchResources();
      calendar.refetchEvents();
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