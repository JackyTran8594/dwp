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
                console.log(selectionInfo);
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
                        newEvent.title = "";
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

                        if (!$scope.WorkOrder.BookedResources) {
                            $scope.WorkOrder.BookedResources = [];
                        }

                        $scope.WorkOrder.BookedResources.push({
                            "RowId": 0,
                            "Duration": hours,
                            // "StartTime": value.StartTime,
                            // "EndTime": value.EndTime,
                            "StartTime": moment(value.StartTime).format("YYYY-MM-DDTHH:mm:ss.000"),
                            "EndTime": moment(value.EndTime).format("YYYY-MM-DDTHH:mm:ss.000"),
                            "ResourceId": value.ResourceId,
                            "ResourceType": value.ResourceType
                        });

                    }
                }, function () {
                });
            },
            eventClick: function (info) {
                evenClick(info);
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
            // calendar.refetchResources();
            // calendar.refetchEvents();
            calendar.gotoDate(endDate);
        }

    });


    function evenClick(info) {

        console.log(info.event);
        //Remove type T,P
        if (info.event._def.extendedProps.Type != 'Booking') {
            return;

        }

        // change the border color just for fun
        info.el.style.borderColor = 'red';


        var start = dateToUTC2(info.event.start);
        var end = dateToUTC2(info.event.end);

        console.log(start);
        console.log(end);
        console.log(formatToTimeHHmm(start));
        console.log(formatToTimeHHmm(end));


        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/wsplanning/templates/pages/workdetail/tabs/planning/modal/save_resource.html',
            controller: 'SaveBookPoolResourceCtrl',
            controllerAs: '$ctrl',
            size: "lg",
            resolve: {
                data: function () {
                    var start = dateToUTC(info.event.start);
                    var end = dateToUTC(info.event.end);
                    return {
                        "RowId": info.event._def.extendedProps.RowId,
                        "StartTime": start,
                        "EndTime": end,
                        "Date": start,
                        "sStart": formatToTimeHHmm(start),
                        "sEnd": formatToTimeHHmm(end),
                        "Duration": 0,
                        "ResourceId": info.event._def.resourceIds[0],
                        "ResourceType": "",
                    };
                },
                title: function () {
                    return $translate.instant('editBookResource');
                }
            }
        });

        modalInstance.result.then(function (value) {
            if (value) {
                //Add event (starttime and endtime add timezone
                var timezone = 0 - new Date().getTimezoneOffset();
                var newEvent = new Object();
                newEvent.title = "";
                newEvent.resourceId = value.ResourceId;
                newEvent.start = moment(value.StartTime).add(timezone, 'minutes').format();
                newEvent.end = moment(value.EndTime).add(timezone, 'minutes').format();
                newEvent.allDay = false;
                console.log(newEvent);
                calendar.addEvent(newEvent);

                //Add to Workorder
                var duration = moment.duration(moment(value.EndTime).diff(moment(value.StartTime)));
                var hours = duration.asHours();

                console.log("duration: " + hours);

                if (!$scope.WorkOrder.BookedResources) {
                    $scope.WorkOrder.BookedResources = [];
                }

                $scope.WorkOrder.BookedResources.push({
                    "RowId": 0,
                    "Duration": hours,
                    // "StartTime": value.StartTime,
                    // "EndTime": value.EndTime,
                    "StartTime": moment(value.StartTime).format("YYYY-MM-DDTHH:mm:ss.000"),
                    "EndTime": moment(value.EndTime).format("YYYY-MM-DDTHH:mm:ss.000"),
                    "ResourceId": value.ResourceId,
                    "ResourceType": value.ResourceType
                });

            }
        }, function () {
        });


    }


});