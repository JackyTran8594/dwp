UserWebApp.service('WorkOrderService', function ($http) {
  var WorkOrderService = {};
  WorkOrderService.detail = function (WorkOrderId) {
    return $http({
      method: 'POST',
      url: '/wo/detail',
      data: {"WorkOrderId": WorkOrderId,}
    });
  }

  WorkOrderService.jobTab = function (data) {
    return $http({
      method:'GET',
      url:'/wo/jobTab',
      params: data
    });
  }

  WorkOrderService.serviceItem = function (data) {
    return $http({
      method:'GET',
      url:'/wo/serviceItem',
      params: data
    });
  }

  return WorkOrderService;
});