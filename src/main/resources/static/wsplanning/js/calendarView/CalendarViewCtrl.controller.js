UserWebApp.controller('CalendarViewCtrl', function ($scope, $rootScope, $locale, HttpService, $translate, $location, $state, $sce, $uibModal, CommonServices) {

    var EmployeeData = $("#EmployeeData").data("employee");
    $scope.iframeUrl = $sce.trustAsResourceUrl(constants.URL_IFRAME + EmployeeData.SiteId);
});
