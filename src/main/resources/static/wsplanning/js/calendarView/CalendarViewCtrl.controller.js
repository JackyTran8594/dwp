UserWebApp.controller('CalendarViewCtrl', function ($scope, $rootScope, $locale, HttpService, $translate, $location, $state, $sce, $uibModal, CommonServices) {

    //https://automaster.alliedsoft.hu:10106/default.aspx?siteid=102&deptid=201&licno=&smanid=0&shiftId=21&daysShowing=7
    var EmployeeData = $("#EmployeeData").data("employee");
    console.log(EmployeeData);
    $scope.iframeUrl = $sce.trustAsResourceUrl(constants.URL_IFRAME + EmployeeData.SiteId + "&deptid=" + EmployeeData.DeptId+ "&shiftId=" + EmployeeData.ShiftId);
});
