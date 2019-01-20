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

    .state('app.main.allwork',{
      url:'allwork',
      controller: "AllWorkOrdersCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/allWorkOrder/index.html',
    })

    .state('app.main.workmot',{
      url:'workmot',
      controller: "WorkMOTCtrl",
      templateUrl: '/wsplanning/templates/pages/workMOT/index.html',
    })

    .state('app.main.worktire',{
      url:'worktire',
      controller: "WorkTireCtrl",
      templateUrl: '/wsplanning/templates/pages/workTire/index.html',
    })
    .state('app.main.workbo',{
      url:'workbo',
      controller: "WorkBOCtrl",
      templateUrl: '/wsplanning/templates/pages/workBO/index.html',
    })

    .state('app.main.postponedwork',{
      url:'postponedwork',
      controller: "PostponedWorkCtrl",
      templateUrl: '/wsplanning/templates/pages/postponedWork/index.html',
    })

    .state('app.main.tasklist',{
      url:'tasklist',
      controller: "TaskListCtrl",
      templateUrl: '/wsplanning/templates/pages/taskList/index.html',
    })

    .state('app.main.calendarview',{
      url:'calendarview',
      controller: "CalendarViewCtrl",
      templateUrl: '/wsplanning/templates/pages/calendarView/index.html',
    })

  //$locationProvider.html5Mode(true);
});

  

