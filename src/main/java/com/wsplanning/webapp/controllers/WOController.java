package com.wsplanning.webapp.controllers;

import com.wsplanning.webapp.clients.WokOrderClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class WOController extends BaseController {
  private Logger logger = LoggerFactory.getLogger(WOController.class);

  @Autowired
  protected WokOrderClient wokOrderClient;

  @Autowired
  protected HttpSession session;

  @Autowired
  HttpSession httpSession;

  @PostMapping("/wo/countWO")
  @ResponseBody
  public ResponseEntity countWO(@RequestBody Map<String, String> params) {
    try {
      String rtn = wokOrderClient.countWO(getToken(), getSiteId(), params);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @PostMapping("/wo/getWO")
  @ResponseBody
  public ResponseEntity getWO(@RequestBody Map<String, String> params) {
    try {
      String rtn = wokOrderClient.getWO(getToken(), getSiteId(), params);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @PostMapping("/wo/unScheduledWO")
  @ResponseBody
  public ResponseEntity unScheduledWO(@RequestBody Map<String, String> params) {
    try {
      String rtn = wokOrderClient.getWO(getToken(), getSiteId(), params);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @PostMapping("/wo/detail")
  @ResponseBody
  public ResponseEntity detail(@RequestBody Map<String, String> params) {
    try {
      String rtn = wokOrderClient.detail(getToken(), getSiteId(), params);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

}
