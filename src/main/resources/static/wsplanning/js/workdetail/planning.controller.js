UserWebApp.controller('PlanningJobCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {
  $scope.test = "abc";
  var vm = this;

  //These variables MUST be set as a minimum for the calendar to work
  $scope.calendarView = 'month';
  $scope.viewDate = new Date();

  var actions = [{
    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    onClick: function (args) {
      console.log(args.calendarEvent);
    }
  }, {
    label: '<i class=\'glyphicon glyphicon-remove\'></i>',
    onClick: function (args) {
      console.log(args.calendarEvent);
    }
  }];
  $scope.events = [
    {
      title: 'An event',
      color: '#fdf1ba',
      startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
      endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
      draggable: true,
      resizable: true,
      actions: actions
    }, {
      title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
      color: '#fdf1ba',
      startsAt: moment().subtract(1, 'day').toDate(),
      endsAt: moment().add(5, 'days').toDate(),
      draggable: true,
      resizable: true,
      actions: actions
    }, {
      title: 'This is a really long event title that occurs on every year',
      color: '#fdf1ba',
      startsAt: moment().startOf('day').add(7, 'hours').toDate(),
      endsAt: moment().startOf('day').add(19, 'hours').toDate(),
      recursOn: 'year',
      draggable: true,
      resizable: true,
      actions: actions
    }
  ];

  $scope.cellIsOpen = true;

  $scope.addEvent = function () {
    $scope.events.push({
      title: 'New event',
      startsAt: moment().startOf('day').toDate(),
      endsAt: moment().endOf('day').toDate(),
      color: '#fdf1ba',
      draggable: true,
      resizable: true
    });
  };

  $scope.eventClicked = function (event) {
    console.log("----eventClicked-----");
    console.log(event);
    $rootScope.$broadcast("bookingClick", {"item": event});
  };

  $scope.eventEdited = function (event) {
    console.log(event);
  };

  $scope.eventDeleted = function (event) {
    console.log(event);
  };

  $scope.eventTimesChanged = function (event) {
    console.log(event);
  };
  $scope.viewChangeClick = function (event) {
    console.log("----viewChangeClick----");
    console.log(event);
  };

  $scope.toggle = function ($event, field, event) {
    $event.preventDefault();
    $event.stopPropagation();
    event[field] = !event[field];
  };

  $scope.timespanClicked = function (date, cell) {
    console.log("---timespanClicked---");
    $rootScope.$broadcast("bookingClick", {"date": date});
    if ($scope.calendarView === 'month') {
      if (($scope.cellIsOpen && moment(date).startOf('day').isSame(moment($scope.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
        $scope.cellIsOpen = false;
      } else {
        $scope.cellIsOpen = true;
        $scope.viewDate = date;
      }
    } else if ($scope.calendarView === 'year') {
      if (($scope.cellIsOpen && moment(date).startOf('month').isSame(moment($scope.viewDate).startOf('month'))) || cell.events.length === 0) {
        $scope.cellIsOpen = false;
      } else {
        $scope.cellIsOpen = true;
        $scope.viewDate = date;
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

  $scope.DeptId = {};
  $scope.ShiftId = {};


});