UserWebApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  console.log("------$urlRouterProvider-----");
  $stateProvider

  // HOME STATES AND NESTED VIEWS ========================================
    .state('main', {
      url: '/',
      // templateUrl: '/pages/index.html'
      templateUrl: '/wsplanning/templates/index.html'
    })

    // nested list with custom controller
    .state('main.workorder', {
      url: 'workorder',
      controller: "WorkOrderCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/workOrder/index.html'
    })

    .state('main.todaywork', {
      url: 'todaywork',
      controller: "TodayWorkOrderCtrl as $ctrl",
      templateUrl: '/wsplanning/templates/pages/todaywork/index.html'
    })

  //$locationProvider.html5Mode(true);
});