UserWebApp
  .service('CommonServices', function (HttpService, $http, $q, $translate) {
    this.siteId = "";
    this.transactionTypes = [];
    this.departments = [];
    this.visitReasons = [];
    this.serviceAdvisors = [];
    this.jobTypes = [];
    this.jobCats = [];
    this.lstPayer = [];
    this.lstShifts = [];
    this.lstChargeCats = [];
    this.stamping = "";
    this.customers = [];
    this.vehicles = [];
    this.sites = [];
    this.menuAuth = [];
    this.lstNotification = [];
    this.countNotification = "";
    this.lstEmployees = "";
    this.lstTeams = [];

    this.lstCallCenterDb = [];
    this.lstCallCenterTaskType = [];

    this.taskType = [];
    this.taskSeries = [];

    this.getTaskTypes = function () {
      var d = $q.defer();
      if (!this.taskType || this.taskType.length <= 0) {
        HttpService.getData('/site/getTaskTypes', {}).then(function (response) {
          this.taskType = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.taskType);
      }
      return d.promise;
    };

    this.getTaskSeries = function () {
      var d = $q.defer();
      if (!this.taskSeries || this.taskSeries.length <= 0) {
        HttpService.getData('/site/getTaskSeries', {}).then(function (response) {
          this.taskSeries = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.taskSeries);
      }
      return d.promise;
    };

    this.getCallCenterDB = function () {
      var d = $q.defer();
      if (!this.lstCallCenterDb || this.lstCallCenterDb.length <= 0) {
        HttpService.getData('/site/getCallCenterDB', {}).then(function (response) {
          this.lstCallCenterDb = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.lstCallCenterDb);
      }
      return d.promise;
    };
    this.getCallCenterTaskType = function () {
      var d = $q.defer();
      if (!this.lstCallCenterTaskType || this.lstCallCenterTaskType.length <= 0) {
        HttpService.getData('/site/getCallCenterTaskType', {}).then(function (response) {
          this.lstCallCenterTaskType = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.lstCallCenterTaskType);
      }
      return d.promise;
    };

    this.getEmployees = function () {
      var d = $q.defer();
      if (!this.lstEmployees || this.lstEmployees.length <= 0) {
        HttpService.getData('/site/getEmployees', {}).then(function (response) {
          response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
          this.lstEmployees = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.lstEmployees);
      }
      return d.promise;
    };

    this.getTeams = function () {
        var d = $q.defer();
        if (!this.lstTeams || this.lstTeams.length <= 0) {
          HttpService.getData('/site/getTeams', {}).then(function (response) {
            response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
            this.lstTeams = response;
            d.resolve(response);
          }, function error(response) {
            d.reject();
          });
        } else {
          d.resolve(this.lstTeams);
        }
        return d.promise;
    }

    // getMenuAuth
    this.getMenuAuth = function () {
      var d = $q.defer();
      HttpService.getData('/site/getMenuAuth', {}).then(function (response) {
        this.menuAuth = response;
        d.resolve(response);
      }, function error(response) {
        d.reject();
      });
      return d.promise;
    };

    // getSite
    this.getSite = function () {
      var d = $q.defer();
      HttpService.getData('/site/getAll', {}).then(function (response) {
        response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') })
        this.sites = response;
        d.resolve(response);
      }, function error(response) {
        d.reject();
      });
      return d.promise;
    };


    // getStamping
    this.getStamping = function () {
      var d = $q.defer();
      HttpService.getData('/site/getStamping', {}).then(function (response) {
        d.resolve(response);
      }, function error(response) {
        d.reject();
      });
      return d.promise;
    };

    //getJobTypes

    this.getJobTypes = function () {
      var d = $q.defer();
      if (!this.jobTypes || this.jobTypes.length <= 0) {
        HttpService.getData('/site/getJobTypes', {}).then(function (response) {
          response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
          this.jobTypes = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.jobTypes);
      }
      return d.promise;
    };

    this.getJobCats = function () {
      var d = $q.defer();
      if (!this.jobCats || this.jobCats.length <= 0) {
        HttpService.getData('/site/getJobCats', {}).then(function (response) {
          response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
          this.jobCats = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.jobCats);
      }
      return d.promise;
    };

    this.getPayers = function () {
      var d = $q.defer();
      if (!this.lstPayer || this.lstPayer.length <= 0) {
        HttpService.getData('/site/getPayers', {}).then(function (response) {
          response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
          this.lstPayer = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.lstPayer);
      }
      return d.promise;
    };

    this.getShifts = function () {
      var d = $q.defer();
      if (!this.lstShifts || this.lstShifts.length <= 0) {
        HttpService.getData('/site/getShifts', {}).then(function (response) {
          response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
          this.lstShifts = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.lstShifts);
      }
      return d.promise;
    };

    this.getChargeCats = function () {
      var d = $q.defer();
      if (!this.lstChargeCats || this.lstChargeCats.length <= 0) {
        HttpService.getData('/site/getChargeCats', {}).then(function (response) {

          response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
          angular.forEach(response, function (item) {
            item.Id = parseInt(item.Id);
          })
          this.lstChargeCats = response;
          // console.log(response);
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.lstChargeCats);
      }
      return d.promise;
    };

    this.getTransactionTypes2 = function () {
      console.log("-------getTransactionTypes: " + this.transactionTypes.length);
      if (!this.transactionTypes || this.transactionTypes.length <= 0) {
        console.log("-------getTransactionTypes https-----");
        var deferred = $q.defer();
        $http.get('/site/getTransactionTypes', {}).then(function successCallback(response) {
          response.data.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
          this.transactionTypes = response.data;
          console.log("-------getTransactionTypes http: " + this.transactionTypes.length);
          deferred.resolve(this.transactionTypes);
        }, function errorCallback(response) {
          console.error(response);
          deferred.reject(this.transactionTypes);
        });
      }
      return this.transactionTypes;
    };

    this.getTransactionTypes = function () {
      var d = $q.defer();
      if (!this.transactionTypes || this.transactionTypes.length <= 0) {
        HttpService.getData('/site/getTransactionTypes', {}).then(function (response) {
          response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
          this.transactionTypes = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.transactionTypes);
      }
      return d.promise;
    };
    this.getDepartments = function () {
      var d = $q.defer();
      if (!this.departments || this.departments.length <= 0) {
        HttpService.getData('/site/getDepartments', {}).then(function (response) {
          response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
          this.departments = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.departments);
      }
      return d.promise;
    };
    this.getVisitReasons = function () {
      var d = $q.defer();
      if (!this.visitReasons || this.visitReasons.length <= 0) {
        HttpService.getData('/site/getVisitReasons', {}).then(function (response) {
          response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
          this.visitReasons = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.visitReasons);
      }
      return d.promise;
    };
    this.getServiceAdvisors = function () {
      var d = $q.defer();
      if (!this.serviceAdvisors || this.serviceAdvisors.length <= 0) {
        HttpService.getData('/site/getServiceAdvisors', {}).then(function (response) {
          response.unshift({ "Id": "", "Name": $translate.instant('pleaseSelect') });
          this.serviceAdvisors = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      } else {
        d.resolve(this.serviceAdvisors);
      }
      return d.promise;
    };

    this.getVehicles = function (skey) {
      var param = {
        skey: skey
      };
      var d = $q.defer();
      if (!this.vehicles || this.vehicles.length <= 0) {
        HttpService.getData('/site/getVehicles', param).then(function (response) {
          this.vehicles = response;
          d.resolve(response);
        }, function (error) {
          d.reject();
        });
      } else {
        d.resolve(this.vehicles);
      }
      return d.promise;
    }

    this.getCustomers = function (skey, custNo) {
      var d = $q.defer();
      var param = {
        skey: skey,
        custNo: custNo,
      };
      if (!this.customers || this.vehicles.length <= 0) {
        HttpService.getData('/site/getCustomers', param).then(function (response) {
          this.customers = response;
          d.resolve(response);
        }, function (error) {
          d.reject();
        });
      } else {
        d.resolve(this.customers);
      }
      return d.promise;
    }


    this.loadData = function () {
      var d = $q.defer();
      var resolve = true;
      if (!this.transactionTypes || this.transactionTypes.length <= 0) {
        resolve = false;
        this.getTransactionTypes().then(function (data) {
          resolve = true;
          this.transactionTypes = data;
        });
      }
      if (!this.departments || this.departments.length <= 0) {
        resolve = false;
        this.getDepartments().then(function (data) {
          resolve = true;
          this.departments = data;
        });
      }
      if (!this.visitReasons || this.visitReasons.length <= 0) {
        resolve = false;
        this.getVisitReasons().then(function (data) {
          resolve = true;
          this.visitReasons = data;
        });
      }
      if (!this.serviceAdvisors || this.serviceAdvisors.length <= 0) {
        resolve = false;
        this.getServiceAdvisors().then(function (data) {
          resolve = true;
          this.serviceAdvisors = data;
        });
      }

      //
      if (!this.jobTypes || this.jobTypes.length <= 0) {
        resolve = false;
        this.getJobTypes().then(function (data) {
          resolve = true;
          this.jobTypes = data;
        });
      }
      if (!this.jobCats || this.jobCats.length <= 0) {
        resolve = false;
        this.getJobCats().then(function (data) {
          resolve = true;
          this.jobCats = data;
        });
      }
      if (!this.lstPayer || this.lstPayer.length <= 0) {
        resolve = false;
        this.getPayers().then(function (data) {
          resolve = true;
          this.lstPayer = data;
        });
      }
      if (!this.lstShifts || this.lstShifts.length <= 0) {
        resolve = false;
        this.getShifts().then(function (data) {
          resolve = true;
          this.lstShifts = data;
        });
      }
      if (!this.lstChargeCats || this.lstChargeCats.length <= 0) {
        resolve = false;
        this.getChargeCats().then(function (data) {
          resolve = true;
          this.lstChargeCats = data;
        });
      }

      if (!this.sites || this.sites.length <= 0) {
        resolve = false;
        this.getChargeCats().then(function (data) {
          resolve = true;
          this.sites = data;
        });
      }
      
      if (resolve) {
        d.resolve("");
      }

      return d.promise;
    }


  })
  ;