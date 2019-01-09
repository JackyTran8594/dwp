UserWebApp
  .service('CommonServices', function (HttpService,$q,$translate) {
    this.siteId = "";
    this.transactionTypes = [];
    this.departments = [];
    this.visitReasons = [];
    this.serviceAdvisors = [];
    this.stamping = "";


    this.getStamping = function () {
      var d = $q.defer();
      HttpService.getData('/site/getStamping', {}).then(function (response) {
        d.resolve(response);
      }, function error(response) {
        d.reject();
      });
      return d.promise;
    };

    this.getTransactionTypes = function () {
      var d = $q.defer();
      if(!this.transactionTypes || this.transactionTypes.length <= 0) {
        HttpService.getData('/site/getTransactionTypes', {}).then(function (response) {
          response.unshift({"Id": "","Name": $translate.instant('pleaseSelect')});
          this.transactionTypes = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      }else{
        d.resolve(this.transactionTypes);
      }
      return d.promise;
    };
    this.getDepartments = function () {
      var d = $q.defer();
      if(!this.departments || this.departments.length <= 0) {
        HttpService.getData('/site/getDepartments', {}).then(function (response) {
          response.unshift({"Id": "","Name": $translate.instant('pleaseSelect')});
          this.departments = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      }else{
        d.resolve(this.departments);
      }
      return d.promise;
    };
    this.getVisitReasons = function () {
      var d = $q.defer();
      if(!this.visitReasons || this.visitReasons.length <= 0) {
        HttpService.getData('/site/getVisitReasons', {}).then(function (response) {
          response.unshift({"Id": "","Name": $translate.instant('pleaseSelect')});
          this.visitReasons = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      }else{
        d.resolve(this.visitReasons);
      }
      return d.promise;
    };
    this.getServiceAdvisors = function () {
      var d = $q.defer();
      if(!this.serviceAdvisors || this.serviceAdvisors.length <= 0) {
        HttpService.getData('/site/getServiceAdvisors', {}).then(function (response) {
          response.unshift({"Id": "","Name": $translate.instant('pleaseSelect')});
          this.serviceAdvisors = response;
          d.resolve(response);
        }, function error(response) {
          d.reject();
        });
      }else{
        d.resolve(this.serviceAdvisors);
      }
      return d.promise;
    };

    this.loadData = function () {
      var d = $q.defer();
      var resolve = true;
      if(!this.transactionTypes || this.transactionTypes.length <= 0){
        resolve = false;
        this.getTransactionTypes().then(function(data){
          resolve = true;
          this.transactionTypes = data;
        });
      }
      if(!this.departments || this.departments.length <= 0){
        resolve = false;
        this.getDepartments().then(function(data){
          resolve = true;
          this.departments = data;
        });
      }
      if(!this.visitReasons || this.visitReasons.length <= 0){
        resolve = false;
        this.getVisitReasons().then(function(data){
          resolve = true;
          this.visitReasons = data;
        });
      }
      if(!this.serviceAdvisors || this.serviceAdvisors.length <= 0){
        resolve = false;
        this.getServiceAdvisors().then(function(data){
          resolve = true;
          this.serviceAdvisors = data;
        });
      }
      if(resolve){
        d.resolve("");
      }

      return d.promise;
    }


  })
;