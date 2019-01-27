UserWebApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider, tmhDynamicLocaleProvider) {

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
      controller: "TodayWorkOrderCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/todaywork/index.html'
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

    
    .state('app.main.unscheduledwork',{
      url:'unscheduledwork',
      controller: "UnscheduledWorkCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/unscheduledWork/index.html',
    })

    .state('app.main.allwork',{
      url:'allwork',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
    })

    .state('app.main.workmot',{
      url:'workmot',
      controller: "WorkMOTCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/workMOT/index.html',
    })

    .state('app.main.worksub',{
      url:'worksub',
      controller: "WorkSubcontractorCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/workSub/index.html',
    })

    .state('app.main.worktire',{
      url:'worktire',
      controller: "WorkTireCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/workTire/index.html',
    })
    .state('app.main.workbo',{
      url:'workbo',
      controller: "WorkBOCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/workBO/index.html',
    })

    .state('app.main.postponedwork',{
      url:'postponedwork',
      controller: "PostponedWorkCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/postponedWork/index.html',
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
      controller: "OffersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/offer/index.html',
    })

    .state('app.main.replacementvehicle',{
      url:'replacementvehicle',
      controller: "ReplacementVehicleCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/replacementVehicle/index.html',
    })

    .state('app.main.newwo',{
      url:'newwo',
      controller: "newWOCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/newWO/index.html',
    })

  //$locationProvider.html5Mode(true);
});

  

