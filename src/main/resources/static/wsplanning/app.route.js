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

  //$locationProvider.html5Mode(true);
});

// UserWebApp.config(function ($provide) {
  // $provide.decorator('datepickerDirective', function($delegate) {
    // angular.forEach($delegate, function (directive) {
      // var originalCompile = directive.compile; 
      // var originalLink = directive.link; 
      // console.log($delegate);
      // if (originalCompile) {
        // directive.compile = function () {
          // return function (scope) {
            // scope.$on('$localeChangeSuccess', function () {
              // scope.move(0);
            // });
            // originalLink.apply(this, arguments);
          // };
        // }
      // }
    // });
    // return $delegate;
  // });  
// });
  

