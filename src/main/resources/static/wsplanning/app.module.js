var UserWebApp = angular.module('UserWebApp', [
  'ngSanitize',
  'ui.bootstrap',
  'checklist-model',
  'ui.select2',
  'pascalprecht.translate',
  'treeGrid',
  'ivh.treeview',
  'ui.bootstrap.datetimepicker',
  'ui.select',
  'ui.router',
  'ngCookies'
]);


UserWebApp.run(['$rootScope', 'uiSelect2Config', '$translate', function ($rootScope, uiSelect2Config, $translate) {


  $rootScope.$on('stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
    console.log("root change stateChangeStart");
  });

  $rootScope.$on('stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
    console.log("root change stateChangeSuccess");
    if (toParams.lang && $translate.use() !== toParams.lang) {
      $translate.use(toParams.lang);
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
  .run(function ($rootScope, $location, $state, $stateParams, $transitions, $translate, HttpService) {

    $transitions.onStart({}, function (trans) {
      console.log("statechange start " + trans._targetState._params.locale);
    });

    $transitions.onSuccess({}, function (trans) {
      console.log("statechange onSuccess " + trans._targetState._params.locale);
      var newLange = trans._targetState._params.locale;
      //Set language
      if ($translate.use() !== newLange) {

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
    });

  })
;