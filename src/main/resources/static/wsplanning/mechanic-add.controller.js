UserWebApp.controller('MechanicAddController', function ($http, $scope, $rootScope, HttpService, CommonService, $translate, $filter) {
  $scope.item = {};

  function renderEdit() {
    $scope.id = $('.dataResponse').attr('data-id');
    if ($scope.id != null && $scope.id != '') {
      $scope.title = $translate.instant('editMechanic');
      $scope.item.id = $('.dataResponse').attr('data-id');
    }else{
      $scope.title = $translate.instant('addMechanic');
    }
    $scope.item.code = $('.dataResponse').attr('data-code');
    $scope.item.name = $('.dataResponse').attr('data-name');
    $scope.item.taxCode = $('.dataResponse').attr('data-taxCode');
    $scope.item.taxAddress = $('.dataResponse').attr('data-taxAddress');
    $scope.item.address = $('.dataResponse').attr('data-address');
    $scope.item.mobile = $('.dataResponse').attr('data-mobile');
    $scope.item.email = $('.dataResponse').attr('data-email');
    $scope.item.note = $('.dataResponse').attr('data-note');
    $scope.item.userId = $('.dataResponse').attr('data-userId');
  }

  renderEdit();


  function onBeforeSubmit(formElement) {
    // $scope.customerForm.name.$setValidity("ipInvalid", true);

    if (formElement.valid()) {
      var isValid = true;
      common.notifyRemoveAll();
      var message = [];

      // if (!$scope.item.name || !validateIPAddress($scope.item.name)) {
      //   message.push("Invalid IP Address");
      //   $scope.customerForm.name.$setValidity("ipInvalid", false);
      //   $scope.customerForm.name.$valid= false;
      // }

      if (message.length > 0) {
        message.unshift($translate.instant('formInvalid'));
        common.notifyWarning(message.join('</br>'));
        isValid = false;
      }
      return isValid;
    }
    return false;
  }

  $scope.onSubmitFrm = function () {
    var formElement = $('#customerForm');
    var btnSubmitElement = $('#btnSubmit');

    if (!onBeforeSubmit(formElement)) {
      return false;
    }

    var params = {};
    if ($scope.item.id) {
      params.id = $scope.item.id;
    }
    params.code = $scope.item.code;
    params.name = $scope.item.name;
    params.address = $scope.item.address;
    params.taxCode = $scope.item.taxCode;
    params.taxAddress = $scope.item.taxAddress;
    params.mobile = $scope.item.mobile;
    params.email = $scope.item.email;
    params.note = $scope.item.note;
    params.userId = $scope.item.userId;

    if ($scope.id != null && $scope.id != '') {
      HttpService.postData('/mechanic/save', params, btnSubmitElement).then(function (response) {
        common.notifySuccess($translate.instant('saveSuccessfully'));
        location.replace('/mechanic');
      }, function error(response) {
        common.notifyError($translate.instant('saveError'));
        console.log(response);
      });

    } else {
      HttpService.postData('/mechanic/save', params, btnSubmitElement).then(function (response) {
        common.notifySuccess($translate.instant('saveSuccessfully'));
        location.replace('/mechanic');
      }, function error(response) {
        common.notifyError($translate.instant('saveError'));
        console.log(response);
      });
    }
  };


  //Typehead
  // Any function returning a promise object can be used to load values asynchronously
  $scope.getLocation = function (val) {
    return $http.get('https://restcountries.eu/rest/v2/name/' + val, {
      params: {
        address: val,
      }
    }).then(function (response) {
      // var data = $filter('limitTo')(response.data, 10, 0);
      // return data.map(function(item){
      //   return item.name;
      // });

      return response.data.map(function (item) {
        return item.name;
      });

    });
  };

  $rootScope.$on('modalFrm', function (event, obj) {
    console.log(obj); // 10
    $scope.item = obj.item;
    if ($scope.item != null && $scope.item.Name != null && $scope.item.Name != '') {
      $scope.title = $translate.instant('editMechanic');
    }else{
      $scope.title = $translate.instant('addMechanic');
    }
  });


});