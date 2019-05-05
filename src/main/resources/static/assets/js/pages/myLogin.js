function loadSite() {
  $.ajax({
    type: 'GET',
    url: '/site/getAll',
    dataType: 'json',
    success: function (responseData, textStatus, jqXHR) {
      $.each(responseData, function (i, item) {
        $('#siteId').append($('<option>', {
          value: item.Id,
          text: item.Name
        }));
      });


      //Set selected
      var selected = readCookie("siteId");
      if (selected != "") {
        $('#siteId').val(selected);
      }
    },
    error: function (responseData, textStatus, errorThrown) {
      console.log(responseData);
      console.log(errorThrown);
    }
  });
}

function loadAuth() {
  $.ajax({
    type: 'GET',
    url: '/site/getMenuAuth',
    dataType: 'json',
    success: function (responseData, textStatus, jqXHR) {
      console.log(responseData);
      var lst_auth = responseData.auth;
      var lst_name = responseData.menu;
      var lst_tab = responseData.tab;
      var lst_timeout = responseData.timeout;

      lst_auth.forEach(function (element) {
        lst_name.forEach(function (item) {
          if (element.name == item.name) {
            element.icon = item.class;
          }
        })
      })
      localStorage.setItem('info_menu', JSON.stringify(lst_auth));
      localStorage.setItem('info_tab', JSON.stringify(lst_tab));
      localStorage.setItem('info_timeout', JSON.stringify(lst_timeout));

    },
    error: function (responseData, textStatus, errorThrown) {
      console.log(responseData);
      console.log(errorThrown);
    }
  })
}

function loadLang() {
  $.ajax({
    type: 'GET',
    url: '/language/getAll',
    dataType: 'json',
    success: function (responseData, textStatus, jqXHR) {
      var option = "";
      localStorage.setItem('cultureInfo', JSON.stringify(responseData));


      $.each(responseData, function (i, item) {
        var CultureInfo = item.CultureInfo;
        var tmp = CultureInfo.split("-");
        $('#language').append($('<option>', {
          value: tmp[0],
          text: item.Name
        }));
      });

      // $.each(responseData, function (i, item) {
      //
      //   var CultureInfo = item.CultureInfo;
      //   var tmp = CultureInfo.split("-");
      //   option = "";
      //   option += "<option value=\"" + tmp[0] + "\" data-thumbnail=\"/assets/images/flags/" + item.Flag.toLowerCase() + "\">" + item.Name + "</option>";
      //   $('#language').append(option);
      // });

      var selected = readCookie("language");
      if (selected != "") {
        $('#language').val(selected);
      }
    },
    error: function (responseData, textStatus, errorThrown) {
      console.log(responseData);
      console.log(errorThrown);
    }
  });
}

function checkSubmit(e) {
  if (e.keyCode == 13) {
    onLogin();
  }
}

function onLogin() {
  if ($("#frmLogin").valid()) {
    //Set cookies
    eraseCookie("siteId");
    eraseCookie("language");

    createCookie("siteId", $("#siteId").val(), 365);
    createCookie("language", $("#language").val(), 365);

    common.btnLoading($("#btnLogin"), true);
    $("#frmLogin").submit();
  }
}

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  } else {
    var expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}