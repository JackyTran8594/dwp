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
    data: ""
  }

  return WorkOrderService;
});


