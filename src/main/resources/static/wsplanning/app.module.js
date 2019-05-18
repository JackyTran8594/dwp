var UserWebApp = angular.module('UserWebApp', [
    'ngSanitize',
    'oc.lazyLoad',
    'tmh.dynamicLocale',
    'mwl.calendar',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'checklist-model',
    'ui.select2',
    'pascalprecht.translate',
    'treeGrid',
    'ivh.treeview',
    'ui.select',
    'ui.router',
    'ngCookies',
    'ngInputModified',
    'shContextMenu',
    'iosDblclick',
    'bmSignaturePad',
    'angucomplete-alt',
    'colorpicker.module',
]);


angular.module('UserWebApp').config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: [{
            name: 'callCenter',
            files:
                [
                    '/wsplanning/js/callcenter/CreateTaskCtrl.js',
                    '/wsplanning/js/callcenter/ActiveCallCtrl.js',
                    '/wsplanning/js/callcenter/RecentCallCtrl.js',
                    '/wsplanning/js/callcenter/CallCenterCtrl.js',
                ]
        },
            {
                name: 'tasklist',
                files:
                    [
                        '/wsplanning/js/tasklist/CreateTaskModalCtrl.js',
                        '/wsplanning/js/tasklist/OpenTaskCtrl.js',
                        '/wsplanning/js/tasklist/CloseTaskCtrl.js',
                        '/wsplanning/js/tasklist/TaskListCtrl.js',
                    ]
            },{
                name: 'workorderDetail',
                files:
                    [
                        '/assets/js/core/libraries/angularjs/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
                    ]
            }]
    });

    $ocLazyLoadProvider.config({
        debug: true
    });
}]);

UserWebApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

UserWebApp.config(['calendarConfig', function (calendarConfig) {

    // Change the month view template globally to a custom template
    // calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html';

    // Use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
    calendarConfig.dateFormatter = 'moment';

    // This will configure times on the day view to display in 24 hour format rather than the default of 12 hour
    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';

    // This will configure the day view title to be shorter
    calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';

    // This will set the week number hover label on the month view
    calendarConfig.i18nStrings.weekNumber = 'Week {week}';

    // This will display all events on a month view even if they're not in the current month. Default false.
    calendarConfig.displayAllMonthEvents = true;

    // Make the week view more like the day view, ***with the caveat that event end times are ignored***.
    calendarConfig.showTimesOnWeekView = true;

}]);

UserWebApp.run(['$rootScope', 'uiSelect2Config', '$translate', 'tmhDynamicLocale', '$cookies', 'CommonServices', '$window', function ($rootScope, uiSelect2Config, $translate, tmhDynamicLocale, $cookies, CommonServices, $window) {


    // vutt
    var langId = $("#currentLang").attr('data-currentLang');
    $rootScope.cultureInfoArray = JSON.parse(localStorage.getItem('cultureInfo'));
    var cultureInfo = '';
    angular.forEach($rootScope.cultureInfoArray, function (value) {
        var temp = value.CultureInfo.split("-");
        if (temp[0] === langId) {
            cultureInfo = value.CultureInfo.toLowerCase();
            tmhDynamicLocale.set(cultureInfo);
        }
    });
    //

    $rootScope.$on('stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        console.log("root change stateChangeStart");
    });

    $rootScope.$on('stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
        console.log("root change stateChangeSuccess");
        if (toParams.lang && $translate.use() !== toParams.lang) {
            $translate.use(toParams.lang);
            console.log(toParams.lang);
        }
    });

    uiSelect2Config.placeholder = $translate.instant('placeholderSelect');

    $('.select2').select2({
        placeholder: $translate.instant('placeholderSelect')
    });

    $('.select2clear').select2({
        placeholder: $translate.instant('placeholderSelect'),
        allowClear: true
    });

    // Config message validate form
    jQuery.extend(jQuery.validator.messages, {
        notExisted: $translate.instant('validatorExisted'),
        required: $translate.instant('validatorRequired'),
        email: $translate.instant('validatorEmail'),
        url: $translate.instant('validatorUrl'),
        date: $translate.instant('validatorDate'),
        dateISO: $translate.instant('validatorDateISO'),
        number: $translate.instant('validatorNumber'),
        digits: $translate.instant('validatorDigits'),
        equalTo: $translate.instant('validatorEqualTo'),
        accept: $translate.instant('validatorAccept'),
        maxlength: jQuery.validator.format($translate.instant('validatorMaxlength')),
        minlength: jQuery.validator.format($translate.instant('validatorMinlength')),
        rangelength: jQuery.validator.format($translate.instant('validatorRangelength')),
        range: jQuery.validator.format($translate.instant('validatorRange')),
        max: jQuery.validator.format($translate.instant('validatorMax')),
        min: jQuery.validator.format($translate.instant('validatorMin')),
    });
}])
    .run(function ($rootScope, $window, $location, $state, $stateParams, $transitions, $translate, HttpService) {

        // $transitions.onStart({}, function (trans) {
        //   console.log("statechange start " + trans._targetState._params.locale);
        // });


        $transitions.onSuccess({}, function (trans) {
            var newToState = trans.$to();

            $rootScope.currentState = newToState.name;

            var newLange = trans._targetState._params.locale;
            //Set language
            if (newLange && $translate.use() !== newLange) {
                console.log("statechange onSuccess " + newLange);

                //Set Lang
                HttpService.postData('/language', {"lang": newLange}).then(function (response) {
                    console.log(response);
                    $translate.use(newLange);

                    $rootScope.$broadcast("changeLanguage", {
                        lang: newLange
                    });
                    common.spinner(false);
                }, function error(response) {
                    console.error(response);
                    common.spinner(false);
                });
            }

            //Add load
            $rootScope.$broadcast('routestateChangeSuccess', {});

        });

    })
;