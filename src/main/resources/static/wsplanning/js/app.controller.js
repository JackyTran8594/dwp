UserWebApp.controller('appCtrl', function ($scope, $timeout, $interval, $state, WorkOrderService, $rootScope, $uibModal, HttpService, CommonServices, tmhDynamicLocale) {

  CommonServices.loadData();

  $rootScope.stamping = "";
  CommonServices.getStamping().then(function (data) {
    if (data && data.StampText) {
      $rootScope.stamping = data.StampText;
    } else {
      $rootScope.stamping = "";
    }
  });

  $scope.count = "";
  var EmployeeData = "";
  var SmanId = "";



  $rootScope.lang = $("#currentLang").attr('data-currentLang');
  $rootScope.currLang = $rootScope.lang;
  $rootScope.currFlag = "/assets/images/flags/eng.png";
  $rootScope.currName = "English";

  $scope.lstmenu = JSON.parse(localStorage.getItem('info_menu'));
  var timeout = JSON.parse(localStorage.getItem('info_timeout'));

  $scope.getRouter = function (param) {
    $state.go(param, { locale: $rootScope.lang });
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

  function loadNotification(SmanId) {
    WorkOrderService.getCountNotification(SmanId).then(function (res) {
      $scope.count = res.data;
      console.log($scope.count);
    }, function (err) {
      console.log(err);
    });

    WorkOrderService.getNotification(SmanId).then(function (res) {
      $scope.lstNotification = res.data;
      // console.log($scope.lstNotification);
    }, function (err) {
      console.log(err);
    })
  }

  $interval(function () {
    if (EmployeeData) {
      SmanId = EmployeeData.SmanId;
    }
    loadNotification(SmanId);
    console.log("---timeout---")
    console.log(timeout);

  }, 1000 * 60 * timeout.value);



  // $scope.checked =  false;

  $scope.markRead = function (item, index) {
    // $scope.lstNotification.splice(index, 1);
    WorkOrderService.markNotification(item).then(function (res) {
      if (EmployeeData) {
        SmanId = EmployeeData.SmanId;
      }
      loadNotification(SmanId);
      console.log(res);
    }, function (err) {
      console.log(err);
    });
  };

  function loadData() {
    common.spinner(true);
    EmployeeData = $("#EmployeeData").data("employee");
    if (EmployeeData) {
      SmanId = EmployeeData.SmanId;
    }

    loadNotification(SmanId);
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
        console.log(response);
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
  // var EmployeeData = $("#EmployeeData").data("employee");

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

  $rootScope.$on('message', function (event, data) {
    if (EmployeeData) {
      SmanId = EmployeeData.SmanId;
    }
    loadNotification(SmanId)
  })


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