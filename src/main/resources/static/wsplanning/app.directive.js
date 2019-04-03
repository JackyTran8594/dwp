UserWebApp.directive('onFinishRender', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.$emit(attr.onFinishRender);
        });
      }
    }
  }
})
  .directive('convertToNumber', convertToNumberDirective)
  .directive('dlKeyCode', dlKeyCode)
  .directive('formatNumberDecimal', formatNumberDecimal)
  .directive('drawing', drawing)
  .directive('signaturePad', signaturePad)
  .directive('inputType', inputType);


convertToNumberDirective.$inject = [];

function convertToNumberDirective() {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function (val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function (val) {
        return '' + val;
      });
    }
  }
}

function dlKeyCode() {
  return {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {
      $element.bind("keypress", function (event) {
        var keyCode = event.which || event.keyCode;

        if (keyCode == $attrs.code) {
          $scope.$apply(function () {
            $scope.$eval($attrs.dlKeyCode, {$event: event});
          });

        }
      });
    }
  };
}

function inputType($compile) {
  return {
    restrict: 'AE',
    scope: {
      type: '=',
      ngModel: '=',
    },
    replace: true,
    link: function (scope, element, attr, ctrl) {

      var html_text = '<input type="text" class="form-control" ng-model="$parent.item.Value" />';
      var html_number = '<input type="number" class="form-control" ng-model="$parent.item.Value" />';
      var html_date = '<div class="input-group"><input type="text" class="form-control" datetime-picker="dd-MMMM-yyyy HH:mm:ss" date-format="dd-MMMM-yyyy HH:mm:ss" ng-model="$parent.item.Value" is-open="$parent.isOpenDateInput" /><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="$parent.openDateInput($event, prop)"><i class="icon-calendar"></i></button></span></div>';


      if (scope.type == "C") {
        var e = $compile(html_text)(scope);
        element.replaceWith(e);
      }
      if (scope.type == "N") {
        var e = $compile(html_number)(scope);
        element.replaceWith(e);
      }
      if (scope.type == "D") {
        var e = $compile(html_date)(scope);
        element.replaceWith(e);
      }

    }
  }
}


function formatNumberDecimal($filter) {
  var FLOAT_REGEXP_1 = /^\$?\d+.(\d{3})*(\,\d*)$/; //Numbers like: 1.123,56
  var FLOAT_REGEXP_2 = /^\$?\d+,(\d{3})*(\.\d*)$/; //Numbers like: 1,123.56
  var FLOAT_REGEXP_3 = /^\$?\d+(\.\d*)?$/; //Numbers like: 1123.56
  var FLOAT_REGEXP_4 = /^\$?\d+(\,\d*)?$/; //Numbers like: 1123,56 

  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {

      ctrl.$parsers.unshift(function (value) {


        if (value) {
          var transformedInput = value.replace(/[A-Za-z]/g, '0');

          if (transformedInput !== value) {
            ctrl.$setViewValue(transformedInput);
            ctrl.$render();
          }
          return transformedInput;

        }

        if (FLOAT_REGEXP_1.test(transformedInput)) {
          ctrl.$setValidity('float', true);

          return parseFloat(transformedInput);
        } else if (FLOAT_REGEXP_2.test(transformedInput)) {
          ctrl.$setValidity('float', true);

          return parseFloat(transformedInput.replace(',', '.').replace('.', ','));

        }
        else if (FLOAT_REGEXP_3.test(transformedInput)) {
          ctrl.$setValidity('float', true);

          return parseFloat(transformedInput.replace('.', ','));

        } else if (FLOAT_REGEXP_4.test(transformedInput)) {
          ctrl.$setValidity('float', true);
          return parseFloat(transformedInput);
        }
        else {
          ctrl.$setValidity('float', false);
          return undefined;
        }


      });


      ctrl.$formatters.unshift(function (model) {
        return $filter('number')(parseFloat(model), 2);
      });

    }
  }
}

function drawing() {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      var base64 = "";
      var canvas = element[0];
      var ctx = canvas.getContext('2d');

      // loadImage(base64);
      //loadImage("http://placehold.it/100x80");


      // variable that decides if something should be drawn on mousemove
      var drawing = false;

      // the last coordinates before the current move
      var lastX;
      var lastY;

      element.bind('mousedown', function (event) {
        if (event.offsetX !== undefined) {
          lastX = event.offsetX;
          lastY = event.offsetY;
        } else {
          lastX = event.layerX - event.currentTarget.offsetLeft;
          lastY = event.layerY - event.currentTarget.offsetTop;
        }

        // begins new line
        ctx.beginPath();

        drawing = true;
      });
      element.bind('mousemove', function (event) {
        if (drawing) {
          // get current mouse position
          if (event.offsetX !== undefined) {
            currentX = event.offsetX;
            currentY = event.offsetY;
          } else {
            currentX = event.layerX - event.currentTarget.offsetLeft;
            currentY = event.layerY - event.currentTarget.offsetTop;
          }

          draw(lastX, lastY, currentX, currentY);

          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }

      });

      element.bind('mouseup', function (event) {
        // stop drawing
        drawing = false;
      });

      // canvas reset
      function reset() {
        element[0].width = element[0].width;
      }

      function loadImage(source) {
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.src = source;

        img.onload = function () {
          ctx.drawImage(img, 0, 0, img.width, img.height,
            0, 0, canvas.width, canvas.height);
        };
      };

      function draw(startX, startY, endX, endY) {
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "yellow";
        ctx.stroke();
      }
    }
  };
}

signaturePad.$inject = ['$interval', '$timeout', '$window'];


function signaturePad($interval, $timeout, $window) {
  var signaturePad, element,
    EMPTY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjgAAADcCAQAAADXNhPAAAACIklEQVR42u3UIQEAAAzDsM+/6UsYG0okFDQHMBIJAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcCQADAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDkQAwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAegeayZAN3dLgwnAAAAAElFTkSuQmCC';

  return {
    restrict: 'EA',
    replace: true,
    template: '<div class="signature" style="width: 100%; max-width:{{width}}px; height: 100%; max-height:{{height}}px;"><canvas style="display: block; margin: 0 auto;" ng-mouseup="onMouseup()" ng-mousedown="notifyDrawing({ drawing: true })"></canvas></div>',
    scope: {
      accept: '=?',
      clear: '=?',
      disabled: '=?',
      dataurl: '=?',
      height: '@',
      width: '@',
      notifyDrawing: '&onDrawing',
    },
    controller: [
      '$scope',
      function ($scope) {
        $scope.accept = function () {

          return {
            isEmpty: $scope.dataurl === EMPTY_IMAGE,
            dataUrl: $scope.dataurl
          };
        };

        $scope.onMouseup = function () {
          $scope.updateModel();

          // notify that drawing has ended
          $scope.notifyDrawing({drawing: false});
        };

        $scope.updateModel = function () {
          /*
           defer handling mouseup event until $scope.signaturePad handles
           first the same event
           */
          $timeout().then(function () {
            $scope.dataurl = $scope.signaturePad.isEmpty() ? EMPTY_IMAGE : $scope.signaturePad.toDataURL();
          });
        };

        $scope.clear = function () {
          $scope.signaturePad.clear();
          $scope.dataurl = EMPTY_IMAGE;
        };

        $scope.$watch("dataurl", function (dataUrl) {
          if (!dataUrl || $scope.signaturePad.toDataURL() === dataUrl) {
            return;
          }

          $scope.setDataUrl(dataUrl);
        });
      }
    ],
    link: function (scope, element, attrs) {
      var canvas = element.find('canvas')[0];
      var parent = canvas.parentElement;
      var scale = 0;
      var ctx = canvas.getContext('2d');

      var width = parseInt(scope.width, 10);
      var height = parseInt(scope.height, 10);

      canvas.width = width;
      canvas.height = height;

      scope.signaturePad = new SignaturePad(canvas);

      scope.setDataUrl = function (dataUrl) {
        var ratio = Math.max(window.devicePixelRatio || 1, 1);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(ratio, ratio);

        scope.signaturePad.clear();
        scope.signaturePad.fromDataURL(dataUrl);

        $timeout().then(function () {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(1 / scale, 1 / scale);
        });
      };

      scope.$watch('disabled', function (val) {
        val ? scope.signaturePad.off() : scope.signaturePad.on();
      });

      var calculateScale = function () {
        var scaleWidth = Math.min(parent.clientWidth / width, 1);
        var scaleHeight = Math.min(parent.clientHeight / height, 1);

        var newScale = Math.min(scaleWidth, scaleHeight);

        if (newScale === scale) {
          return;
        }

        var newWidth = width * newScale;
        var newHeight = height * newScale;
        canvas.style.height = Math.round(newHeight) + "px";
        canvas.style.width = Math.round(newWidth) + "px";

        scale = newScale;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(1 / scale, 1 / scale);
      };

      var resizeIH = $interval(calculateScale, 200);
      scope.$on('$destroy', function () {
        $interval.cancel(resizeIH);
        resizeIH = null;
      });

      angular.element($window).bind('resize', calculateScale);
      scope.$on('$destroy', function () {
        angular.element($window).unbind('resize', calculateScale);
      });

      calculateScale();

      element.on('touchstart', onTouchstart);
      element.on('touchend', onTouchend);

      function onTouchstart(event) {
        scope.$apply(function () {
          // notify that drawing has started
          scope.notifyDrawing({drawing: true});
        });
        event.preventDefault();
      }

      function onTouchend(event) {
        scope.$apply(function () {
          // updateModel
          scope.updateModel();

          // notify that drawing has ended
          scope.notifyDrawing({drawing: false});
        });
        event.preventDefault();
      }
    }
  };
}
