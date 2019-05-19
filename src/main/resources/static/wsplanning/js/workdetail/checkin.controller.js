UserWebApp.controller('CheckInCtrl', function ($scope, $rootScope, WorkOrderService, HttpService, $translate, $location, $filter, $uibModal, CommonServices, $stateParams, $timeout, $window, $element) {

    //<editor-fold desc="Variable">
    $scope.imgTemplate = "";


    $scope.VehiId = ($scope.WorkOrder && $scope.WorkOrder.WOVehicle && $scope.WorkOrder.WOVehicle.VehiId) ? $scope.WorkOrder.WOVehicle.VehiId : 0;
    $scope.template = "1";
    $scope.templateSelected = {"Id": "01"};
    $scope.templateName = {};
    $scope.lstTemplate = [];

    $scope.boundingBox = {
        "width": 581,
        "height": 216,
    };

    $scope.data = {
        "Mileage": ($scope.WorkOrder && $scope.WorkOrder.Mileage) ? $scope.WorkOrder.Mileage : 0,
        "Remark": "",
        "legalText": "",
    };

    $scope.color = "rgb(255, 0, 0)";
    //</editor-fold>

    $scope.$watch("color", function (newValue, oldValue) {
        if (newValue != oldValue) {
            console.log(newValue);
            $timeout(function() {
                angular.element('#btnUpdateColor').triggerHandler('click');
            });
        }
    });

    //<editor-fold desc="listTemplateType">
    $scope.listTemplateType = function () {
        $scope.base64Encode = "";
        common.spinner(true);
        HttpService.postData('/checkin/template-type', {VehiId: $scope.VehiId}).then(function (response) {
            $scope.lstTemplate = response;
            if($scope.lstTemplate.length > 0){
                $scope.templateSelected = $scope.lstTemplate[0];
            }else{
                $scope.templateSelected = {};
                $scope.data.legalText = "";
                $scope.templateName = "";
            }
            $scope.changeTemplate();
            common.spinner(false);
        }, function error(response) {
            $scope.lstTemplate = [];
            $scope.templateSelected = {};
            $scope.data.legalText = "";
            $scope.templateName = "";
            $scope.changeTemplate();
            console.log(response);
            common.spinner(false);
        });
    }
    $scope.listTemplateType();
    //</editor-fold>

    //<editor-fold desc="changeTemplate">
    $scope.changeTemplate = function () {
        console.log($scope.templateSelected);

        $scope.templateName = "";
        if ($scope.templateSelected && $scope.templateSelected.Items && $scope.templateSelected.Items.length > 0) {
            for (var i = 0; i < $scope.templateSelected.Items.length; i++) {
                if ($scope.templateSelected.Items[i].Id == "Image") {
                    $scope.templateName = $scope.templateSelected.Items[i].Value;
                }else if ($scope.templateSelected.Items[i].Id == "LegacyText") {
                    $scope.data.legalText = $scope.templateSelected.Items[i].Value;
                }
            }
        }
        $scope.base64Encode = "";
        common.spinner(true);
        if ($scope.templateName != "") {
            $scope.imgTemplate = "";
            // HttpService.postData('/checkin/template', {name: $scope.templateName}).then(function (response) {
            //     $scope.imgTemplate = "data:image/png;base64," + response.base64;
            //     common.spinner(false);
            // }, function error(response) {
            //     $scope.imgTemplate = "";
            //     console.log(response);
            //     common.spinner(false);
            // });
        } else {
            HttpService.postData('/checkin/template', {type: $scope.template}).then(function (response) {
                $scope.imgTemplate = "data:image/png;base64," + response.base64;
                common.spinner(false);
            }, function error(response) {
                $scope.imgTemplate = "";
                console.log(response);
                common.spinner(false);
            });
        }
    }
    //</editor-fold>


    //<editor-fold desc="onSubmitForm">
    function createListWOAttachment(){
        var list = [];
        var i = 0;
        //template da danh dau
        var template = $scope.acceptTemplate();
        if(!template.isEmpty) {
            var templateMark = {};
            templateMark.FileId = 0;
            templateMark.FileName = $scope.templateName;
            templateMark.dataUrl = template.dataUrl;
            templateMark.ImageData = template.dataUrl.replace("data:image/png;base64,", "");
            templateMark.AttachType = "PIC";
            templateMark.AttachTypeDescription = "";
            templateMark.FileDescription = "";
            list[i++] = templateMark;
        }

        var signCanvas  = $scope.accept();
        if(!signCanvas.isEmpty) {
            var sign = {};
            sign.FileId = 0;
            sign.FileName = "Signature_of_customer.png";
            sign.dataUrl = signCanvas.dataUrl;
            sign.ImageData = signCanvas.dataUrl.replace("data:image/png;base64,", "");
            sign.AttachType = "PIC";
            sign.AttachTypeDescription = "";
            sign.FileDescription = "";
            list[i++] = sign;
        }

        if($scope.listImage && $scope.listImage.length > 0) {
            Array.prototype.push.apply(list, $scope.listImage);
        }

        return list;
    }

    $scope.onSubmitForm = function () {
        var list = createListWOAttachment();

        var postAction = "checkIn";

        $scope.WorkOrder.WOAttachments = list;
        $scope.WorkOrder.CustomerComplaint = $scope.data.Remark;

        console.log($scope.WorkOrder);
        var data = JSON.stringify($scope.WorkOrder);

        common.btnLoading($(".btnSubmit"), true);
        WorkOrderService.postWorkOrder(data, postAction).then(function (res) {
            common.btnLoading($(".btnSubmit"), false);
            console.log(res);
            if (res.data.Token && res.data.Token.ErrorDesc) {
                common.notifyWithMessage("Warning!!!", res.status, res.data.Token.ErrorDesc)
            } else {
                common.notifySuccess("Success!!!");
            }
            console.log($scope.WorkOrder);
            if ($scope.WorkOrder && $scope.WorkOrder.WorkOrderId) {
                location.reload();
            } else {
            }
        }, function (err) {
            common.btnLoading($(".btnSubmit"), true);
            console.log(err);
            common.notifyError("Error!!!", err.status);
        });
    }


    //Save from button header
    $rootScope.$on('saveCheckin', function (event, obj) {
        $scope.onSubmitForm();
    });
    //</editor-fold>


    //<editor-fold desc="openImage">
    $scope.listImage = [];
    $scope.openImage = function () {
        $scope.listImage = [];
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/wsplanning/templates/pages/common/photo-form.html',
            controller: 'PhotoModalCtrl',
            backdrop: 'static',
            controllerAs: '$ctrl',
            size: "full",
            resolve: {
                data: {
                    item: null,
                    workOrderId: $scope.WorkOrder.WorkOrderId,
                    jobAttachments: null
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
            Array.prototype.push.apply($scope.listImage, selectedItem);
            console.log($scope.listImage);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    //</editor-fold>

});