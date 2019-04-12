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
  .directive('drawing', drawing2)
  .directive('signaturePad', signaturePad)
  .directive('inputType', inputType)
  .directive('ngFiles', ngFiles)
  .directive('ngCamera', ngCamera)
  .directive('checkboxDirective', checkboxDirective);

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
            $scope.$eval($attrs.dlKeyCode, { $event: event });
          });

        }
      });
    }
  };
}


function ngFiles($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onchange = $parse(attrs.ngFiles);
      element.on('change', function (eve) {
        onchange(scope, { $files: eve.target.files })
      })
    }
  }
}

function ngCamera() {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      var videoSources = [];

      MediaStreamTrack.getSources(function (mediaSources) {

        for (var i = 0; i < mediaSources.length; i++) {
          if (mediaSources[i].kind == 'video') {
            videoSources.push(mediaSources[i].id);
          }
        }

        if (videoSources.length > 1) { $scope.$emit('multipleVideoSources'); }

        initCamera(0);

      });

      // Elements
      var videoElement = element.find('video')[0];


      // Stream
      function streaming(stream) {
        $scope.$apply(function () {
          videoElement.src = stream;
          videoElement.play();
        });
      }


      // Check ready state
      function checkReadyState() {
        if (videoElement.readyState == 4) {
          $interval.cancel(interval);
          $scope.$emit('videoStreaming');
        }
      }
      var interval = $interval(checkReadyState, 1000);

      // Init
      $scope.$on('init', function (event, stream) {
        streaming(stream);
      });

      // Switch camera
      $scope.$on('switchCamera', function (event, cameraIndex) {
        initCamera(cameraIndex);
      });

      // Init via Service
      function initCamera(cameraIndex) {
        var constraints = {
          audio: false,
          video: {
            optional: [{ sourceId: videoSources[cameraIndex] }]
          }
        };

        camera.setup(constraints, camera.onSuccess, camera.onError);
      }


    }
  }
}

function checkboxDirective($compile) {
  return {
    restrict: 'EA',
    scope: {
      hasMechanicId: '=',
      type: '=',
      ngModel: '='
    },
    replace: true,
    link: function (scope, element, attr, ctrl) {
      var checked = '<input type="checkbox" ng-init="checked = true"  ng-model="checked" ng-change="$parent.getCheckRow($parent.$parent.$index, $parent.$index, checked)"/>'
      var unchecked = '<input type="checkbox" ng-init="checked = false"  ng-model="checked" ng-change="$parent.getCheckRow($parent.$parent.$index, $parent.$index, checked)"/>'
      // var attributes = scope.$eval(attr.checkboxDirective);

      if ((scope.type == "7") || (scope.type == "8")) {
        if (scope.hasMechanicId && scope.hasMechanicId.length > 0) {
          var e = $compile(checked)(scope); 
          element.replaceWith(e);
        } else {
          var e = $compile(unchecked)(scope);
          element.replaceWith(e);
        }
      } else {
        var e = $compile("")(scope);
        element.replaceWith(e);
      }
    }
  }
}

function inputType($compile) {
  return {
    restrict: 'EA',
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

function drawing3() {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimaitonFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 4;

      var drawing = false;
      var mousePos = {
        x: 0,
        y: 0
      };
      var lastPos = mousePos;

      canvas.addEventListener("mousedown", function (e) {
        drawing = true;
        lastPos = getMousePos(canvas, e);
      }, false);

      canvas.addEventListener("mouseup", function (e) {
        drawing = false;
      }, false);

      canvas.addEventListener("mousemove", function (e) {
        mousePos = getMousePos(canvas, e);
      }, false);

      // Add touch event support for mobile
      canvas.addEventListener("touchstart", function (e) {

      }, false);

      canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var me = new MouseEvent("mousemove", {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
      }, false);

      canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var me = new MouseEvent("mousedown", {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
      }, false);

      canvas.addEventListener("touchend", function (e) {
        var me = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(me);
      }, false);

      function getMousePos(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
          x: mouseEvent.clientX - rect.left,
          y: mouseEvent.clientY - rect.top
        }
      }

      function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
          x: touchEvent.touches[0].clientX - rect.left,
          y: touchEvent.touches[0].clientY - rect.top
        }
      }

      function renderCanvas() {
        if (drawing) {
          ctx.moveTo(lastPos.x, lastPos.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
          lastPos = mousePos;
        }
      }

      // Prevent scrolling when touching the canvas
      document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, false);
      document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, false);
      document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, false);

      (function drawLoop() {
        requestAnimFrame(drawLoop);
        renderCanvas();
      })();

      function clearCanvas() {
        canvas.width = canvas.width;
      }
    }
  }
}

function drawing2() {


  var isMobile = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      // Setup canvas ..
      var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');


      // setup lines styles ..
      ctx.strokeStyle = "#DDD";
      ctx.lineWidth = 2;

      // some variables we'll need ..
      var drawing = false;
      var mousePos = { x: 0, y: 0 };
      var lastPos = mousePos;

      // helper functions ..
      function getMousePos(canvasDom, touchOrMouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
          x: (isMobile ? touchOrMouseEvent.touches[0].clientX : touchOrMouseEvent.clientX) - rect.left,
          y: (isMobile ? touchOrMouseEvent.touches[0].clientY : touchOrMouseEvent.clientY) - rect.top
        };
      };

      // drawing ..
      window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      function renderCanvas() {
        if (drawing) {
          ctx.moveTo(lastPos.x, lastPos.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
          lastPos = mousePos;
        }
      };

      function drawLoop() {
        requestAnimFrame(drawLoop);
        renderCanvas();
      }


      // mouse/touch events ..
      canvas.addEventListener((isMobile ? 'touchstart' : 'mousedown'), function (e) {
        console.log("----touchstart----");
        drawing = true;
        lastPos = getMousePos(canvas, e);
        mousePos = lastPos;
      });
      canvas.addEventListener((isMobile ? 'touchmove' : 'mousemove'), function (e) {
        if (drawing) {
          console.log("----touchmove----");
          mousePos = getMousePos(canvas, e);
          drawLoop();
        }
      });
      canvas.addEventListener((isMobile ? 'touchend' : 'mouseup'), function (e) {
        console.log("----touchend----");
        drawing = false;
      });

      // Prevent scrolling when touching the canvas
      document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, false);
      document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, false);
      document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, false);
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

      canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
      }, false);

      canvas.addEventListener("touchend", function (e) {
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
      }, false);
      canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
      }, false);


      // Get the position of a touch relative to the canvas
      function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
          x: touchEvent.touches[0].clientX - rect.left,
          y: touchEvent.touches[0].clientY - rect.top
        };
      }

      // Prevent scrolling when touching the canvas
      document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, false);
      document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, false);
      document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, false);

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
    template: '<div class="signature" id="{{id}}_ctn" style="width: 100%; max-width:{{width}}px; height: 100%; max-height:{{height}}px;"><canvas id="{{id}}"  style="display: block; margin: 0 auto;" ng-mouseup="onMouseup()" ng-mousedown="notifyDrawing({ drawing: true })"></canvas></div>',
    scope: {
      accept: '=?',
      clear: '=?',
      disabled: '=?',
      dataurl: '=?',
      height: '@',
      width: '@',
      id: '@',
      notifyDrawing: '&onDrawing'
    },
    controller: [
      '$scope',
      function ($scope) {
        $scope.accept = function () {
          // emit data for close modal
          $scope.$emit("acceptPhoto", {
            dataUrl: $scope.dataurl
          });
          //
          return {
            isEmpty: $scope.dataurl === EMPTY_IMAGE,
            dataUrl: $scope.dataurl
          };
        };

        $scope.onMouseup = function () {
          $scope.updateModel();

          // notify that drawing has ended
          $scope.notifyDrawing({ drawing: false });
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
          // $scope.dataurl = EMPTY_IMAGE;
          if ($scope.$parent.dataUrlOriginal) {
            $scope.dataurl = $scope.$parent.dataUrlOriginal;
          } else {
            $scope.dataurl = EMPTY_IMAGE;
          }
        };

        $scope.clearOnlySign = function () {
          $scope.signaturePad.clear();
          $scope.dataurl = $scope.$parent.dataUrlOriginal;
        };

        $scope.acceptPhoto = function () {
          $scope.$emit("acceptPhoto", {
            dataUrl: $scope.dataurl
          })
          return {
            dataUrl: $scope.dataurl
          };
        }




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
          scope.notifyDrawing({ drawing: true });
        });
        event.preventDefault();
      }

      function onTouchend(event) {
        scope.$apply(function () {
          // updateModel
          scope.updateModel();

          // notify that drawing has ended
          scope.notifyDrawing({ drawing: false });
        });
        event.preventDefault();
      }
    }
  };
}
