UserWebApp.controller('PhotoModalCtrl', function ($scope, $uibModal, data, $uibModalInstance, WorkOrderService) {

    var $ctrl = this;

    console.log(data);

    $scope.isGrid = true;


    $scope.getClass = function (param) {
        if (param === 1) {
            $scope.isGrid = false;
        } else {
            $scope.isGrid = true;
        }
    }

    function jobAttachments() {
        var jobObj = {
            AttachType: "",
            AttachTypeDescription: "",
            FileDescription: "",
            FileId: 0,
            FileName: "",
            ImageData: "",
            dataUrl: ""
        }
        return jobObj
    }

    $scope.lstfiles = [];
    $scope.lstphoto = [];
    $scope.lstAttachment = [];

    loadPhoto(data)

    function loadPhoto(data) {
        if (data.jobAttachments && data.jobAttachments[0].ImageData) {
            common.spinner(true);
            angular.forEach(data.jobAttachments, function (v, k) {
                var dataUrl = "data:image/webp;base64," + v.ImageData;
                $scope.lstphoto.push(dataUrl);
            })

            common.spinner(false)
        } else {
            var RowId = -1;
            var data = {
                workOrderId: data.workOrderId,
                jobRowId: RowId,
                LoadWOAttachmentData: ""
            }
            if (data.item) {
                data.RowId = data.item.RowId;
            } else {
                data.LoadWOAttachmentData = "true";
            }

            common.spinner(true);

            WorkOrderService.getPhoto(data).then(function (res) {
                // console.log(res);
                angular.forEach(res.data, function (v, k) {
                    var obj = jobAttachments();
                    obj.AttachType = v.AttachType;
                    obj.AttachTypeDescription = v.AttachTypeDescription;
                    obj.FileDescription = v.AttacFileDescriptionhType;
                    obj.FileId = v.FileId;
                    obj.FileName = v.FileName;
                    obj.ImageData = v.ImageData;
                    obj.dataUrl = "data:image/webp;base64," + v.ImageData;
                    $scope.lstphoto.push(obj.dataUrl);
                    $scope.lstAttachment.push(obj);
                })
                common.spinner(false)
            }, function (err) {
                console.log(err);
                common.spinner(false)
            });
        }
    }


    // var formData = new FormData();
    $scope.getTheFiles = function ($files) {

        $scope.lstfiles = $files;

        angular.forEach($files, function (v, k) {
            var file = v;
            var reader = new FileReader();

            reader.onload = function (e) {
                $scope.$apply(function () {
                    var obj = jobAttachments();
                    var dataUrl = ""
                    obj.AttachType = "PIC";
                    obj.AttachTypeDescription = "";
                    obj.FileDescription = "";

                    obj.FileName = file.name;
                    dataUrl = e.target.result.split(',');
                    obj.ImageData = dataUrl[1];
                    obj.dataUrl = e.target.result;
                    $scope.lstphoto.push(obj.dataUrl);
                    $scope.lstAttachment.push(obj)
                    console.log($scope.lstphoto);
                });
            }
            reader.readAsDataURL(file)
            // formData.append("files", v)

        });
    }


    $scope.takeScreenshot = function () {
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            templateUrl: '/wsplanning/templates/pages/taking_screenshot.html',
            controller: 'TakeScreenshotCtrl',
            backdrop: 'static',
            controllerAs: '$ctrl',
            size: "full",
        });

        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);

            // $scope.lstphoto = $scope.lstphoto.concat(selectedItem)
            angular.forEach(selectedItem, function (v, k) {
                var obj = jobAttachments();
                obj.AttachType = "PIC";
                obj.dataUrl = v;
                var dataUrl = v.split(',');
                obj.ImageData = dataUrl[1];
                $scope.lstAttachment.push(obj)
                $scope.lstphoto.push(obj.dataUrl);
            });

        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };


    $scope.openPhoto = function (index) {
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            templateUrl: '/wsplanning/templates/pages/open_Photo.html',
            controller: 'openPhotoCtrl',
            backdrop: 'static',
            controllerAs: '$ctrl',
            size: "lg",
            resolve: {
                item: function () {
                    console.log(index);
                    return $scope.lstphoto[index];
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
            $scope.lstphoto[index] = selectedItem.dataUrl;
            var attach = $scope.lstAttachment[index];
            attach.dataUrl = selectedItem.dataUrl;
            var dataUrl = selectedItem.dataUrl.split(',');
            attach.ImageData = dataUrl[1];
            $scope.lstAttachment[index] = attach;

        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $ctrl.save = function () {
        $uibModalInstance.close($scope.lstAttachment);
    }

    $scope.removePhoto = function (id) {
        $scope.lstphoto.splice(id, 1);
    }


    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})