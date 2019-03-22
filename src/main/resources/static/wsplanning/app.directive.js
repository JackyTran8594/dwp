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
  .directive('formatNumberDecimal', formatNumberDecimal);

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


function formatNumberDecimal($filter) {
  var FLOAT_REGEXP_1 = /^\$?\d+.(\d{3})*(\,\d*)$/; //Numbers like: 1.123,56
  var FLOAT_REGEXP_2 = /^\$?\d+,(\d{3})*(\.\d*)$/; //Numbers like: 1,123.56
  var FLOAT_REGEXP_3 = /^\$?\d+(\.\d*)?$/; //Numbers like: 1123.56
  var FLOAT_REGEXP_4 = /^\$?\d+(\,\d*)?$/; //Numbers like: 1123,56 

  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {

      ctrl.$parsers.unshift(function (value) {

       
        if(value) {
          var transformedInput = value.replace(/[A-Za-z]/g, '0');

          if (transformedInput !== value) {
            ctrl.$setViewValue(transformedInput);
            ctrl.$render();
          }
          return transformedInput;      
         
        }

        if(FLOAT_REGEXP_1.test(transformedInput)) {
          ctrl.$setValidity('float', true);
             
          return  parseFloat(transformedInput);
        } else if(FLOAT_REGEXP_2.test(transformedInput)) {
          ctrl.$setValidity('float', true);
         
          return parseFloat(transformedInput.replace(',','.').replace('.',','));

        } 
        else if (FLOAT_REGEXP_3.test(transformedInput)) {
          ctrl.$setValidity('float', true);
        
          return parseFloat(transformedInput.replace('.',','));

        } else if(FLOAT_REGEXP_4.test(transformedInput)) {
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