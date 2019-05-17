UserWebApp.factory('CommonFactory', function ($http, HttpService, $translate, $q) {
  var transactionTypes = [];
  var departments = [];
  var visitReasons = [];
  var serviceAdvisors = [];
  var jobTypes = [];
  var jobCats = [];
  var lstPayer = [];
  var lstShifts = [];
  var lstChargeCats = [];
  var customers = [];
  var vehicles = [];
  var sites = [];

  var siteId = "";
  var stamping = "";

  function getSite() {
    if (!sites || sites.length <= 0) {
      var deferred = $q.defer();
      $http.get('/site/getAll', {}).then(function successCallback(response) {
        sites = response.data;
        deferred.resolve(sites);
      }, function errorCallback(response) {
        console.error(response);
        deferred.reject(sites);
      });
    }
    return sites;
  };

  function getStamping() {
    if (!stamping || stamping.length <= 0) {
      var deferred = $q.defer();
      $http.get('/site/getStamping', {}).then(function successCallback(response) {
        stamping = response.data;
        deferred.resolve(stamping);
      }, function errorCallback(response) {
        console.error(response);
        deferred.reject(stamping);
      });
    }
    return stamping;
  };

  function getJobTypes() {
    if (!jobTypes || jobTypes.length <= 0) {
      var deferred = $q.defer();
      $http.get('/site/getJobTypes', {}).then(function successCallback(response) {
        response.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
        jobTypes = response.data;
        deferred.resolve(jobTypes);
      }, function errorCallback(response) {
        console.error(response);
        deferred.reject(jobTypes);
      });
    }
    return jobTypes;
  };

  function getJobCats() {
    if (!jobCats || jobCats.length <= 0) {
      var deferred = $q.defer();
      $http.get('/site/getJobCats', {}).then(function successCallback(response) {
        response.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
        jobCats = response.data;
        deferred.resolve(jobCats);
      }, function errorCallback(response) {
        console.error(response);
        deferred.reject(jobCats);
      });
    }
    return jobCats;
  };

  function getPayers() {
    if (!lstPayer || lstPayer.length <= 0) {
      var deferred = $q.defer();
      $http.get('/site/getPayers', {}).then(function successCallback(response) {
        response.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
        lstPayer = response.data;
        deferred.resolve(lstPayer);
      }, function errorCallback(response) {
        console.error(response);
        deferred.reject(lstPayer);
      });
    }
    return lstPayer;
  };

  function getShifts() {
    if (!lstShifts || lstShifts.length <= 0) {
      var deferred = $q.defer();
      $http.get('/site/getShifts', {}).then(function successCallback(response) {
        response.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
        lstShifts = response.data;
        deferred.resolve(lstShifts);
      }, function errorCallback(response) {
        console.error(response);
        deferred.reject(lstShifts);
      });
    }
    return lstShifts;
  };

  function getChargeCats() {
    if (!lstChargeCats || lstChargeCats.length <= 0) {
      var deferred = $q.defer();
      $http.get('/site/getChargeCats', {}).then(function successCallback(response) {
        response.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
        lstChargeCats = response.data;
        deferred.resolve(lstChargeCats);
      }, function errorCallback(response) {
        console.error(response);
        deferred.reject(lstChargeCats);
      });
    }
    return lstChargeCats;
  };

  function getVisitReasons() {
    if (!visitReasons || visitReasons.length <= 0) {
      var deferred = $q.defer();
      $http.get('/site/getVisitReasons', {}).then(function successCallback(response) {
        response.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
        visitReasons = response.data;
        deferred.resolve(visitReasons);
      }, function errorCallback(response) {
        console.error(response);
        deferred.reject(visitReasons);
      });
    }
    return visitReasons;
  };

  function getServiceAdvisors() {
    if (!serviceAdvisors || serviceAdvisors.length <= 0) {
      var deferred = $q.defer();
      $http.get('/site/getServiceAdvisors', {}).then(function successCallback(response) {
        response.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
        serviceAdvisors = response.data;
        deferred.resolve(serviceAdvisors);
      }, function errorCallback(response) {
        console.error(response);
        deferred.reject(serviceAdvisors);
      });
    }
    return serviceAdvisors;
  };

  function getTransactionTypes() {
    console.log("-------getTransactionTypes: " + transactionTypes.length);
    var deferred = $q.defer();
    if (!transactionTypes || transactionTypes.length <= 0) {
      console.log("-------getTransactionTypes https-----");
      $http.get('/site/getTransactionTypes', {}).then(function successCallback(response) {
        response.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
        transactionTypes = response.data;
        console.log("-------getTransactionTypes http: " + transactionTypes.length);
        deferred.resolve(transactionTypes);
      }, function errorCallback(response) {
        console.error(response);
        deferred.reject(transactionTypes);
      });
    }
    deferred.resolve(transactionTypes);
    return deferred.promise;
  };

  function getDepartments() {
    var deferred = $q.defer();
    if (!departments || departments.length <= 0) {
      $http.get('/site/getDepartments', {}).then(function successCallback(response) {
        response.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
        departments = response.data;
        deferred.resolve(departments);
      }, function errorCallback(response) {
        console.error(response);
        deferred.reject(departments);
      });
    }
    deferred.resolve(departments);
    return deferred.promise;
  };


  getSite();
  getStamping();
  getJobTypes();
  getJobCats();
  getPayers();
  getShifts();
  getChargeCats();
  getVisitReasons();
  getServiceAdvisors();
  getTransactionTypes();
  getDepartments();

  return {
    getSite: getSite,
    getStamping: getStamping,
    getJobTypes: getJobTypes,
    getJobCats: getJobCats,
    getPayers: getPayers,
    getShifts: getShifts,
    getChargeCats: getChargeCats,
    getVisitReasons: getVisitReasons,
    getServiceAdvisors: getServiceAdvisors,
    getTransactionTypes: getTransactionTypes,
    getDepartments: getDepartments
  };
});

UserWebApp.factory('AutoCompleteService', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
  var AutoComplete = new Object();

  AutoComplete.getTextPredict = function (data) {
    var textData = $q.defer();
    var text = [];

    getTextPredict(data);

    function getTextPredict(data) {
      $http.post('/site/getTextPredict', data).then(function (res) {
        text = res.data;
      }, function (err) {
        console.log(err);
      })
    }

    $timeout(function () {
      textData.resolve(text)
    }, 1000)

    return textData.promise;

  }

  return AutoComplete;
}])