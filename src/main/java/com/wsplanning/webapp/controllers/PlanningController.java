package com.wsplanning.webapp.controllers;

import com.google.gson.*;
import com.wsplanning.webapp.clients.ASMasterClient;
import com.wsplanning.webapp.clients.PlanningClient;
import com.wsplanning.webapp.clients.SearchServiceItemClient;
import com.wsplanning.webapp.clients.WokOrderClient;
import com.wsplanning.webapp.dto.WOCustomerDTO;
import com.wsplanning.webapp.dto.WODTO;
import com.wsplanning.webapp.dto.WOJobDTO;
import com.wsplanning.webapp.dto.WOVehicleDTO;
import com.wsplanning.webapp.utils.Utils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
public class PlanningController extends BaseController {
  private Logger logger = LoggerFactory.getLogger(PlanningController.class);

  @Autowired
  protected PlanningClient planningClient;


  @Autowired
  protected HttpSession session;

  @Autowired
  HttpSession httpSession;

  Gson gson = new Gson();

  @PostMapping("/planning")
  @ResponseBody
  public ResponseEntity countWO(@RequestBody Map<String, String> params) {
    try {
      String rtn = planningClient.getPlanning(getToken(), getSiteId(), params);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }
}
