UserWebApp.controller('appCtrl', function ($scope, $rootScope, $locale, $uibModal, HttpService, $translate, $location, $filter, $state, CommonServices, tmhDynamicLocale) {

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
    $state.go('app.main.workorder', {locale: $rootScope.lang});
  }

  $scope.unscheduledwork = function () {
    $state.go('app.main.unscheduledwork', {locale: $rootScope.lang});
  }

  $scope.todayWork = function () {
    $state.go('app.main.todaywork', {locale: $rootScope.lang});
  }

  $scope.worksub = function () {
    $state.go('app.main.worksub', {locale: $rootScope.lang});
  }

  $scope.allwork = function () {
    $state.go('app.main.allwork', {locale: $rootScope.lang});
  }

  $scope.workmot = function () {
    $state.go('app.main.workmot', {locale: $rootScope.lang});
  }

  $scope.worktire = function () {
    $state.go('app.main.worktire', {locale: $rootScope.lang});
  }

  $scope.workbo = function () {
    $state.go('app.main.workbo', {locale: $rootScope.lang});
  }

  $scope.postponedwork = function () {
    $state.go('app.main.postponedwork', {locale: $rootScope.lang});
  }

  $scope.tasklist = function () {
    $state.go('app.main.tasklist', {locale: $rootScope.lang});
  }

  $scope.stampingMenu = function () {
    $state.go('app.main.stamping', {locale: $rootScope.lang});
  }


  $scope.calendarview = function () {
    $state.go('app.main.calendarview', {locale: $rootScope.lang});
  }

  $scope.offer = function () {
    $state.go('app.main.offer', {locale: $rootScope.lang});
  }

  $scope.replacementvehicle = function () {
    $state.go('app.main.calendarview', {locale: $rootScope.lang});

  }

  $scope.gotoCallCenter = function () {
    $state.go('app.main.callcenter', {locale: $rootScope.lang});
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

    try {
      $rootScope.popupFromDate.opened = false;
      $rootScope.popupToDate.opened = false;
    } catch (c) {
      console.error(c);
    }

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

  //info user
  var $ctrl = this;
  $ctrl.animationsEnabled = true;
  var EmployeeData = $("#EmployeeData").data("employee");

  $scope.openInfoUser = function (size, item) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      templateUrl: '/wsplanning/templates/pages/infoUser-form.html',
      controller: 'InfoUserModalCtrl',
      controllerAs: '$ctrl',
      size: size,
      backdrop: 'static',
      resolve: {
        item: EmployeeData
      }
    });

    modalInstance.result.then(function (selectedItem) {
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };


  //


  //Load Stamp
  $rootScope.$on('routestateChangeSuccess', function (event, data) {
    $("body").addClass("sidebar-xs");
    CommonServices.getStamping().then(function (data) {
      if (data && data.StampText) {
        $rootScope.stamping = data.StampText;
      } else {
        $rootScope.stamping = "";
      }
    });
  });


});


UserWebApp.controller('InfoUserModalCtrl', function ($scope, $rootScope, $uibModalInstance, item, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $state) {

  var $ctrl = this;

  loadCommon();
  $scope.lstDepartment = [];
  $scope.lstShift = [];
  $scope.lstSite = [];
  $scope.lstServ = [];

  function loadCommon() {

    CommonServices.getDepartments().then(function (data) {
      // console.log(data);
      $scope.lstDepartment = data;
    });

    CommonServices.getServiceAdvisors().then(function (data) {
      // console.log(data);
      $scope.lstServ = data;
    });

    CommonServices.getShifts().then(function (data) {
      // console.log(data);

      $scope.lstShift = data;
    });

    CommonServices.getSite().then(function (data) {
      // console.log(data);
      $scope.lstSite = data;
    });
  }

  $scope.target = item;
  console.log(item);

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


});