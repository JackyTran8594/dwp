UserWebApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider, ivhTreeviewOptionsProvider, tmhDynamicLocaleProvider, inputModifiedConfigProvider) {

  tmhDynamicLocaleProvider.localeLocationPattern('/assets/js/core/libraries/angularjs/angular-locale/i18n/angular-locale_{{locale}}.js')
  // $urlRouterProvider.otherwise('/');

  //input Modified 
  inputModifiedConfigProvider
    .enableGlobally()
    // // .setModifiedClassName('my-changed')
    // // .setNotModifiedClassName('my-clear')
    ;

  $urlRouterProvider.otherwise(function ($rootScope, $injector, $location) {
    var lang = $("#currentLang").attr('data-currentLang');
    return "/" + lang + "/todaywork";
  });

  $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
    .state('app', {
      abstract: true,
      url: '/{locale}'
    })

    .state('app.main', {
      url: '/',
      // templateUrl: '/pages/index.html'
      templateUrl: '/wsplanning/templates/index.html'
    })

    // nested list with custom controller
    .state('app.main.workorder', {
      url: 'workorder',
      controller: "WorkOrderCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/workOrder/index.html'
    })

    .state('app.main.todaywork', {
      url: 'todaywork',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "todayWO";
        }
      }
    })


    .state('app.main.unscheduledwork', {
      url: 'unscheduledwork',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "unScheduledWO";
        }
      }
    })

    .state('app.main.allwork', {
      url: 'allwork',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "allWO";
        }
      }
    })

    .state('app.main.workmot', {
      url: 'workmot',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "withMOT";
        }
      }
    })

    .state('app.main.worksub', {
      url: 'worksub',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "withSubcontractor";
        }
      }
    })
    .state('app.main.worktire', {
      url: 'worktire',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "withTire";
        }
      }
    })
    .state('app.main.workbo', {
      url: 'workbo',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "withBO";
        }
      }
    })

    .state('app.main.postponedwork', {
      url: 'postponedwork',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "postponedWO";
        }
      }
    })

    .state('app.main.tasklist', {
      url: 'tasklist',
      controller: "TaskListCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/taskList/index.html',
    })

    
    .state('app.main.stamping', {
      url: 'stamping',
      controller: "StampingCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/stamping/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "stamping";
        }
      }
    })


    .state('app.main.calendarview', {
      url: 'calendarview',
      controller: "CalendarViewCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/calendarView/index.html',
    })

    .state('app.main.offer', {
      url: 'offer',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "offers";
        }
      }
    })


    .state('app.main.replacementvehicle', {
      url: 'replacementvehicle',
      controller: "ReplacementVehicleCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/replacementVehicle/index.html',
    })

    .state('app.main.newwo', {
      url: 'workdetail/newwo/:type/:action/',
      controller: "WorkDetailCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/workdetail/index.html',
      resolve: {
        WorkOrder: function (WorkOrderService, $stateParams) {
          return { data: {} };
        },
        lstMonth: function (WorkOrderService, $stateParams) {
          var EmployeeData = $("#EmployeeData").data("employee");
          var startDate = new Date();
          var endDate = moment(startDate).add(1, 'M');
          var params = {
            "DayFrom": formatDateToApi(moment(startDate).startOf('month').toDate()),
            "DayTo": formatDateToApi(moment(endDate).startOf('month').toDate()),
            "DeptId": EmployeeData.DeptId,
            "ShiftId": EmployeeData.ShiftId,
          };
          return WorkOrderService.calendarMonth(params);
        }
      }
    })

    .state('app.main.workdetail', {
      url: 'workdetail/:type/:id/',
      controller: "WorkDetailCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/workdetail/index.html',
      resolve: {
        WorkOrder: function (WorkOrderService, $stateParams) {
          return WorkOrderService.detail($stateParams.id);
        },
        lstMonth: function (WorkOrderService, $stateParams) {
          var EmployeeData = $("#EmployeeData").data("employee");
          var startDate = new Date();
          var endDate = moment(startDate).add(1, 'M');
          var params = {
            "DayFrom": formatDateToApi(moment(startDate).startOf('month').toDate()),
            "DayTo": formatDateToApi(moment(endDate).startOf('month').toDate()),
            "DeptId": EmployeeData.DeptId,
            "ShiftId": EmployeeData.ShiftId,
          };
          return WorkOrderService.calendarMonth(params);
        }
      }
    })

    .state('app.main.newoffer', {
      url: 'workdetail/offer/:type/:action/',
      controller: "WorkDetailCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/workdetail/index.html',
      resolve: {      
        WorkOrder: function (WorkOrderService, $stateParams) {
          return { data: {} };
        },
        lstMonth: function (WorkOrderService, $stateParams) {
          var EmployeeData = $("#EmployeeData").data("employee");
          var startDate = new Date();
          var endDate = moment(startDate).add(1, 'M');
          var params = {
            "DayFrom": formatDateToApi(moment(startDate).startOf('month').toDate()),
            "DayTo": formatDateToApi(moment(endDate).startOf('month').toDate()),
            "DeptId": EmployeeData.DeptId,
            "ShiftId": EmployeeData.ShiftId,
          };
          return WorkOrderService.calendarMonth(params);
        }
      }
    })

    .state('app.main.booking', {
      url: 'workdetail/:type/:action/',
      controller: "WorkDetailCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/workdetail/index.html',
      resolve: {
        WorkOrder: function (WorkOrderService, $stateParams) {
          return { data: {} };
        },
        lstMonth: function (WorkOrderService, $stateParams) {
          var EmployeeData = $("#EmployeeData").data("employee");
          var startDate = new Date();
          var endDate = moment(startDate).add(1, 'M');
          var params = {
            "DayFrom": formatDateToApi(moment(startDate).startOf('month').toDate()),
            "DayTo": formatDateToApi(moment(endDate).startOf('month').toDate()),
            "DeptId": EmployeeData.DeptId,
            "ShiftId": EmployeeData.ShiftId,
          };
          return WorkOrderService.calendarMonth(params);
        }
      }
    })

  //Callcenter
    .state('app.main.callcenter', {
      url: 'callcenter',
      controller: "CallCenterCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/callcenter/index.html',
      resolve: {
      }
    })

  //$locationProvider.html5Mode(true);
});



