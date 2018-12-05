package com.wsplanning.webapp.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.wsplanning.webapp.clients.MechanicClient;
import com.wsplanning.webapp.clients.SiteClient;
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
import java.util.Map;

@Controller
public class SiteController extends BaseController {
  private Logger logger = LoggerFactory.getLogger(SiteController.class);

  @Autowired
  protected SiteClient siteClient;

  @Autowired
  protected HttpSession session;

  @Autowired
  HttpSession httpSession;

  @GetMapping("/site/getAll")
  public ResponseEntity getAll() {
    try {
      String rtn = siteClient.getSites();
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }
}
