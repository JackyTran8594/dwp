var constants = {
  DATETIME_MOMENT_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  DATETIME_INPUT_MASK_FORMAT: 'yyyy-mm-dd hh:mm:ss',
  DATE_INPUT_MASK_FORMAT: 'yyyy-mm-dd',
  TIME_INPUT_MASK_FORMAT: 'HH:mm',
  WEB_SOCKET_URL: 'http://' + location.hostname + ':8083/ump-websocket',
  WEB_SOCKET_TIMEOUT: 3 * 60 * 1000,
  POLICY_EVENTS_DEFAULT: [
    '0 BOOTSTRAP', '1 BOOT', '2 PERIODIC', '3 SCHEDULED', '4 VALUE CHANGE', '5 KICKED',
    '6 CONNECTION REQUEST', '7 TRANSFER COMPLETE', '8 DIAGNOSTICS COMPLETE', '9 REQUEST DOWNLOAD', '10 AUTONOMOUS TRANSFER COMPLETE'
  ],
  WEB_REPORTS_URL: 'http://' + location.hostname + ':8882',
  COLOR_CRITICAL : '#f44336',
  COLOR_MAJOR : '#e6e903',
  COLOR_MINOR : '#00af35',
  URL_IFRAME: "https://automaster.alliedsoft.hu:10106/default.aspx?siteid=",
};
