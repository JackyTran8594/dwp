UserWebApp.controller('appCtrl', function ($scope, $rootScope, HttpService, $translate, $location, $filter, $state, CommonServices, tmhDynamicLocale) {

  CommonServices.loadData();

  $rootScope.stamping = "";
  CommonServices.getStamping().then(function (data) {
    if (data && data.StampText) {
      $rootScope.stamping = data.StampText;
    } else {
      $rootScope.stamping = "";
    }
  });

  $rootScope.lang = $("#currentLang").attr('data-currentLang');
  $rootScope.currLang = $rootScope.lang;
  $rootScope.currFlag = "/assets/images/flags/eng.png";
  $rootScope.currName = "English";


  $scope.workorders = function () {
    $(".toggleSitebar").click();
    $state.go('app.main.workorder', { locale: $rootScope.lang });
  }

  $scope.todayWork = function () {
    $(".toggleSitebar").click();
    $state.go('app.main.todaywork', { locale: $rootScope.lang });
  }

  $scope.changeLang = function (lang) {

    //vutt
    var array = $rootScope.cultureInfoArray
    var cultureInfo = '';
    angular.forEach(array, function (value) {
      var temp = value.CultureInfo.split("-");
      if (temp[0] === lang) {
        cultureInfo = value.CultureInfo;
        tmhDynamicLocale.set(cultureInfo.toLowerCase());
      }
    });
    //
    
    var params = $state.params;
    params.locale = lang;
    $state.transitionTo($state.current, params, {
      reload: true, inherit: false, notify: true
    });
  }

  $scope.lstLang = [];

  loadData();

  function loadData() {
    common.spinner(true);
    HttpService.getData('/language/getAll', {}).then(function (response) {
      $scope.lstLang = [];
      angular.forEach(response, function (item) {
        var CultureInfo = item.CultureInfo;
        var tmp = CultureInfo.split("-");
        item.Flag = item.Flag.toLowerCase();
        item.lang = tmp[0];
        if (item.lang == $rootScope.lang) {
          item.class = "active";
          $rootScope.currFlag = "/assets/images/flags/" + item.Flag;
          $rootScope.currName = item.Name;
          $rootScope.currLang = item.lang;
        } else {
          item.class = "";
        }
        $scope.lstLang.push(item);
      });
      common.spinner(false);
    }, function error(response) {
      console.log(response);
      common.spinner(false);
    });
  }

  //
  $rootScope.$on("changeLanguage", function (event, data) {
    var newLang = data.lang;
    console.log("-------On changeLanguage: " + newLang);

    angular.forEach($scope.lstLang, function (item) {
      var CultureInfo = item.CultureInfo;
      var tmp = CultureInfo.split("-");
      item.Flag = item.Flag.toLowerCase();
      item.lang = tmp[0];
      if (item.lang == newLang) {
        item.class = "active";
        $("#currentLang").data('data-currentLang', newLang);
        $rootScope.lang = newLang;
        $rootScope.currFlag = "/assets/images/flags/" + item.Flag;
        $rootScope.currName = item.Name;
        $rootScope.currLang = item.lang;
      } else {
        item.class = "";
      }

    });

  });


});