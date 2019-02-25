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
      url: '/wo/getServiceItem',
      data: data
    });
  }


  WorkOrderService.countServiceItem = function (data) {
    return $http({
      method: 'POST',
      url: '/wo/getCountServiceItem',
      data: data
    });
  }

  return WorkOrderService;
});