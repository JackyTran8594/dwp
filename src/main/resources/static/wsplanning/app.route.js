UserWebApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider, ivhTreeviewOptionsProvider ,tmhDynamicLocaleProvider) {

  tmhDynamicLocaleProvider.localeLocationPattern('/assets/js/core/libraries/angularjs/angular-locale/i18n/angular-locale_{{locale}}.js')
  // $urlRouterProvider.otherwise('/');

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

    
    .state('app.main.unscheduledwork',{
      url:'unscheduledwork',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "unScheduledWO";
        }
      }
    })

    .state('app.main.allwork',{
      url:'allwork',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "allWO";
        }
      }
    })

    .state('app.main.workmot',{
      url:'workmot',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "withMOT";
        }
      }
    })

    .state('app.main.worksub',{
      url:'worksub',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "withSubcontractor";
        }
      }
    })
    .state('app.main.worktire',{
      url:'worktire',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "withTire";
        }
      }
    })
    .state('app.main.workbo',{
      url:'workbo',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "withBO";
        }
      }
    })

    .state('app.main.postponedwork',{
      url:'postponedwork',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "postponedWO";
        }
      }
    })

    .state('app.main.tasklist',{
      url:'tasklist',
      controller: "TaskListCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/taskList/index.html',
    })

    .state('app.main.calendarview',{
      url:'calendarview',
      controller: "CalendarViewCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/calendarView/index.html',
    })

    .state('app.main.offer',{
      url:'offer',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
      resolve: {
        typeWO: function ($stateParams) {
          return "offers";
        }
      }
    })

    .state('app.main.replacementvehicle',{
      url:'replacementvehicle',
      controller: "ReplacementVehicleCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/replacementVehicle/index.html',
    })

    .state('app.main.newwo', {
      url: 'workdetail/:type',
      controller: "WorkDetailCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/workdetail/index.html',
      resolve: {
        WorkOrder: function (WorkOrderService, $stateParams) {
          return {data: {}};
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
        }
      }
    })

    .state('app.main.newoffer',{
      url:'newoffer',
      controller: "newOfferCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/newWO/index.html',
    })

    .state('app.main.booking',{
      url:'booking',
      controller: "newBookingCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/newWO/index.html',
    })

  //$locationProvider.html5Mode(true);
});

  

