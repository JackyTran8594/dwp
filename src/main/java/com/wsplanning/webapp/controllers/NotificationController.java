package com.wsplanning.webapp.controllers;


import com.wsplanning.webapp.clients.*;
import com.wsplanning.webapp.dto.NotificationDTO;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Locale;
import java.util.Map;

@Controller
public class NotificationController extends BaseController {
  private Logger logger = LoggerFactory.getLogger(NotificationController.class);

  @Autowired
  protected NotificationClient notificationClient;

  @Autowired
  protected HttpSession session;

  @Autowired
  HttpSession httpSession;

  @Autowired
  private LocaleResolver localeResolver;

  @PostMapping("/notification/create")
  @ResponseBody
  public ResponseEntity create(@RequestBody Map<String, String> params, HttpServletRequest request,
                              HttpServletResponse response) {
    try {
      String lang = params.get("lang");
      Locale userLocale = Locale.forLanguageTag(lang);
      localeResolver.setLocale(request, response, userLocale);
      return new ResponseEntity<>(HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @PostMapping("/notification/getCountNotificationType")
  public ResponseEntity getCountNotificationType(@RequestBody Map<String, String> params) {
    try {
      String rtn = notificationClient.getCountNotificationType(params);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @PostMapping("/notification/getNotificationType")
  public ResponseEntity getNotificationType(@RequestBody Map<String, String> params) {
    try {
      String rtn = notificationClient.getNotificationType(params);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

}
