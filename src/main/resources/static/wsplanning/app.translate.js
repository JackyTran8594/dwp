var translationsEN = {
  workOrderTitle: "WorkOrder Management",
  todayWorkTitle: "Today Work Management",
  //breadcrumb
  breadcrumbHome: "Home",
  breadcrumbWorkOrder: "WorkOrder",
  breadcrumbTodayWork: "Today Work",

  //common
  btnAdd: "Add",
  btnDelete: "Delete",
  btnRefresh: "Refresh",
  btnMore: "More",
  btnEdit: "Edit",
  btnAction: "Action",
  commonNoResult: "No Results Found",
  btnDeleteItem: "Delete this item",
  btnEditItem: "Edit this item",
  item: "item",
  page: "page",
  go: "Go",
  limit: "Limit",
  btnClose: "Close",
  btnOk: "Ok",
  btnSave: "Save",
  btnCancel: "Cancel",

  //Confirm delete
  confirmDeleteWorkOder: "Are you want to delete this WorkOder?",
  confirmDeletesWorkOder: "Are you want to delete selected WorkOder?",

  //Form
  mechanicDeptId: "DeptId",

  accessDenied: 'Access Denied',
  actionError: 'Action is error.',
  changePasswordFail: 'Change password fail!',
  changePasswordSuccess: 'Change password successfully!',
  currentPasswordWrong: 'Mật khẩu hiện tại không đúng',
  dateTime: 'Date time is invalid. <br>Start time > ended time, please change date time.',
  deleteError: 'Delete error!',
  deleteSuccessfully: 'Delete successfully!.',
  placeholderSelect: '- Select option -',
  recoverPasswordError: 'Recover password error!',
  recoverPasswordSuccess: 'Recover password successfully!',
  requestTimeout: 'Request timeout!',
  requestParamError: 'Request param limit invalid.',
  saveSuccessfully: 'Save successfully.',
  startDateError: "Start date must less than end date",
  success: 'Success!',
  total: ", Total ",
  warning: 'WARNING ',
  saveError: 'Save Error.',
  validatorExisted: "This value is already in use.",
  validatorRequired: "This field is required.",
  validatorEmail: "Please enter a valid email address.",
  validatorUrl: "Please enter a valid URL.",
  validatorDate: "Please enter a valid date.",
  validatorDateISO: "Please enter a valid date (ISO).",
  validatorNumber: "Please enter a valid number.",
  validatorEqualTo: "Please enter the same value again.",
  validatorAccept: "Please enter a value with a valid extension.",
  validatorMaxlength: "Please enter no more than {0} characters.",
  validatorMinlength: "Please enter at least {0} characters.",
  validatorRangelength: "Please enter a value between {0} and {1} characters long.",
  validatorRange: "Please enter a value between {0} and {1}.",
  validatorMax: "Please enter a value less than or equal to {0}.",
  validatorMin: "Please enter a value greater than or equal to {0}.",
  formInvalid: 'Form invalid.',
  invalidNumberIn: 'Value has special characters.',
  invalidNumberBetween: 'From value must less than to value',
  editMechanic: 'Edit mechanic',
  addMechanic: 'Add mechanic',
};

var translationsVI = {
  workOrderTitle: "WorkOrder Management",
  breadcrumbHome: "Home",
  breadcrumbWorkOrder: "WorkOrder",

  accessDenied: 'Access Denied',
  actionError: 'Action is error.',
  changePasswordFail: 'Change password fail!',
  changePasswordSuccess: 'Change password successfully!',
  currentPasswordWrong: 'Mật khẩu hiện tại không đúng',
  dateTime: 'Date time is invalid. <br>Start time > ended time, please change date time.',
  deleteError: 'Delete error!',
  deleteSuccessfully: 'Delete successfully!.',
  placeholderSelect: '- Select option -',
  recoverPasswordError: 'Recover password error!',
  recoverPasswordSuccess: 'Recover password successfully!',
  requestTimeout: 'Request timeout!',
  requestParamError: 'Request param limit invalid.',
  saveSuccessfully: 'Save successfully.',
  startDateError: "Start date must less than end date",
  success: 'Success!',
  total: ", Total ",
  warning: 'WARNING ',
  saveError: 'Save Error.',
  validatorExisted: "This value is already in use.",
  validatorRequired: "This field is required.",
  validatorEmail: "Please enter a valid email address.",
  validatorUrl: "Please enter a valid URL.",
  validatorDate: "Please enter a valid date.",
  validatorDateISO: "Please enter a valid date (ISO).",
  validatorNumber: "Please enter a valid number.",
  validatorEqualTo: "Please enter the same value again.",
  validatorAccept: "Please enter a value with a valid extension.",
  validatorMaxlength: "Please enter no more than {0} characters.",
  validatorMinlength: "Please enter at least {0} characters.",
  validatorRangelength: "Please enter a value between {0} and {1} characters long.",
  validatorRange: "Please enter a value between {0} and {1}.",
  validatorMax: "Please enter a value less than or equal to {0}.",
  validatorMin: "Please enter a value greater than or equal to {0}.",
  formInvalid: 'Form invalid.',
  invalidNumberIn: 'Value has special characters.',
  invalidNumberBetween: 'From value must less than to value',
  editMechanic: 'Edit mechanic',
  addMechanic: 'Add mechanic',
};

UserWebApp.config(['$translateProvider', function ($translateProvider) {
  // Declare multi language
  $translateProvider.translations('en', translationsEN);
  $translateProvider.translations('vi', translationsVI);

  // Get current language
  var currentLang = $('.currentLang').attr('data-currentLang');
  currentLang = currentLang && currentLang !== '' ? currentLang : 'en';

  // Set language
  $translateProvider.fallbackLanguage(currentLang);
  $translateProvider.preferredLanguage(currentLang);
}]);