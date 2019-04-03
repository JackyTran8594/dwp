UserWebApp.service('WorkOrderService', function ($http) {
  var WorkOrderService = {};
  WorkOrderService.detail = function (WorkOrderId) {
    return $http({
      method: 'POST',
      url: '/wo/detail',
      data: {
        "WorkOrderId": WorkOrderId
      },
      headers: {
        "LoadRows": true,
      }
    });
  }

  WorkOrderService.jobTab = function (data) {
    return $http({
      method: 'GET',
      url: '/wo/jobTab',
      params: data
    });
  }

  WorkOrderService.serviceItem = function (data) {
    return $http({
      method: 'POST',
      url: '/wo/serviceItem',
      data: data
    });
  }


  WorkOrderService.countServiceItem = function (data) {
    return $http({
      method: 'POST',
      url: '/wo/countServiceItem',
      data: data
    });
  }

  WorkOrderService.postWorkOrder = function (data, postAction) {
    return $http({
      method: 'POST',
      url: '/wo/workOrderTest',
      data: data,
      headers: {
        "postAction": postAction
      }
    });
  }

  WorkOrderService.shareData = {
    postAction: "",
    data: "",
    modified: false
  }

  WorkOrderService.customer = function (params) {
    return $http({
      method: 'POST',
      url: '/site/customer',
      data: params
    })
  }

  WorkOrderService.calendarMonth = function (data) {
    return $http({
      method: 'POST',
      url: '/planning',
      data: data
    });
  }

  
  WorkOrderService.resources = function () {
    return $http({
      method: 'GET',
      url: '/resources',
    });
  }


  WorkOrderService.getStamping = function () {
    return $http({
      method: 'GET',
      url: '/site/stampingCode',
    });
  }

  WorkOrderService.stamp = function (data) {
    return $http({
      method: 'POST',
      url: '/wo/confirm',
      data: data
    });
  }

  return WorkOrderService;
});


