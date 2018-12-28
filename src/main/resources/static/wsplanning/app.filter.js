UserWebApp
  .filter('floor', function () {
    return function (n) {
      return Math.floor(n);
    };
  })
  .filter('ceil', function () {
    return function (n) {
      return Math.ceil(n);
    };
  })
  .filter('dateFormat', function ($filter) {
    return function (input) {
      if (typeof input === 'undefined' || input === null || input === '0000-00-00' || input === '0000-00-00 00:00:00') {
        return '';
      }
      var _date = $filter('date')(new Date(input), 'yyyy-MM-dd');
      return _date.toUpperCase();
    };
  })
  .filter('dateTimeFormat', function ($filter) {
    return function (input) {
      if (typeof input === 'undefined' || input === null || input === '0000-00-00' || input === '0000-00-00 00:00:00') {
        return '';
      }
      var _date = $filter('date')(new Date(input), 'yyyy-MM-dd HH:mm:ss');
      return _date.toUpperCase();
    };
  })
  .filter('isEmpty', function () {
    var bar;
    return function (obj) {
      for (bar in obj) {
        if (obj.hasOwnProperty(bar)) {
          return false;
        }
      }
      return true;
    };
  })
  .filter('titleCase', function () {
    return function (input) {
      input = input || '';
      return input.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase().replace(/[\s]/g, '');
      });
    };
  })
  .filter('utcToLocal', function ($filter) {
    return function (utcDateString, format) {
      // return if input date is null or undefined
      if (!utcDateString) {
        return;
      }

      // append 'Z' to the date string to indicate UTC time if the timezone isn't already specified
      if (utcDateString.indexOf('Z') === -1 && utcDateString.indexOf('+') === -1) {
        utcDateString += 'Z';
      }

      // convert and format date using the built in angularjs date filter
      return $filter('date')(utcDateString, format);
    };
  })
  .filter('dateLocal', function ($filter) {
    return function (input,format) {
      var dateToConvert = new Date(input);
      var convertedDateString = dateToConvert.toLocaleString();
      convertedDateString = convertedDateString.replace('at ', '');
      var convertedDate = new Date(convertedDateString);
      return $filter('date')(convertedDate, format);
    };
  })
  .filter('unique', function () {
    return function (collection, primaryKey) {
      var output = [];
      var keys = [];
      var splitKeys = primaryKey.split('.');

      angular.forEach(collection, function (item) {
        var key = {};
        angular.copy(item, key);
        for (var i = 0; i < splitKeys.length; i++) {
          key = key[splitKeys[i]];
        }

        if (keys.indexOf(key) === -1) {
          keys.push(key);
          output.push(item);
        }
      });

      return output;
    };
  })
;