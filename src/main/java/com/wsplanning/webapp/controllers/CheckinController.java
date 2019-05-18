package com.wsplanning.webapp.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.wsplanning.webapp.clients.ASMasterClient;
import com.wsplanning.webapp.clients.EmployeesClient;
import com.wsplanning.webapp.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.Map;

@Controller
public class CheckinController extends BaseController {
  private Logger logger = LoggerFactory.getLogger(CheckinController.class);

  @Autowired
  protected ASMasterClient asMasterClient;

  @Autowired
  protected HttpSession session;

  @Autowired
  HttpSession httpSession;


  @PostMapping("/checkin/template-type")
  @ResponseBody
  public ResponseEntity getTemplateType(@RequestBody Map<String, String> params) {
    try {
      logger.info("#USER_LOG {},{},{},{},{}", session.getId(), session.getAttribute("username"), "test mechanic on test mechanic page", "", "");
      String getVHCTemplates = asMasterClient.getVHCTemplates(getSiteId(),params.get("VehiId"));
      return new ResponseEntity<>(getVHCTemplates, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @PostMapping("/checkin/template")
  @ResponseBody
  public ResponseEntity test(@RequestBody Map<String, String> params) {
    try {
      logger.info("#USER_LOG {},{},{},{},{}", session.getId(), session.getAttribute("username"), "test mechanic on test mechanic page", "", "");
      JsonObject rtn = new JsonObject();
      String type = params.get("type");
      String fileName = params.get("name");
      String base64 = "";
      if (type != null) {
        if ("1".equalsIgnoreCase(type)) {
          base64 = Utils.encodeFileToBase64AtResource2("image" + File.separator + "template" + File.separator + "taixuong.png");
        } else if ("2".equalsIgnoreCase(type)) {
          base64 = Utils.encodeFileToBase64AtResource2("image" + File.separator + "template" + File.separator + "macbook.jpg");
        }
      }else{
        base64 = Utils.encodeFileToBase64AtResource2("image" + File.separator + "template" + File.separator + fileName);
      }
      rtn.addProperty("base64", base64);

      return new ResponseEntity<>(rtn.toString(), HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }
}
