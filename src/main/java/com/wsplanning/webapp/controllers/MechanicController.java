package com.wsplanning.webapp.controllers;

import com.wsplanning.webapp.clients.MechanicClient;
import com.wsplanning.webapp.utils.Utils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
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
public class MechanicController extends BaseController {
  private Logger logger = LoggerFactory.getLogger(MechanicController.class);

  @Autowired
  protected MechanicClient mechanicClient;

  @Autowired
  protected HttpSession session;

  @Autowired
  HttpSession httpSession;

  @GetMapping("/mechanic")
  public String index() {
    logger.info("#USER_LOG {},{},{},{},{}", session.getId(), session.getAttribute("username"), "go to mechanic page", "", "");
    return MECHANIC_PAGE;
  }

  @PostMapping("/mechanic/test")
  @ResponseBody
  public ResponseEntity test(@RequestBody Map<String, String> params) {
    try {
      logger.info("#USER_LOG {},{},{},{},{}", session.getId(), session.getAttribute("username"), "test mechanic on test mechanic page", "", "");
      String rtn = mechanicClient.test(params);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @PostMapping("/mechanic/search")
  @ResponseBody
  public ResponseEntity search(@RequestBody Map<String, String> params) {
    try {
      logger.info("#USER_LOG {},{},{},{},{}", session.getId(), session.getAttribute("username"), "search mechanic on list mechanic page", "", "");
      String rtn = mechanicClient.search(params);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @PostMapping("/mechanic/count")
  @ResponseBody
  public int countDevices(@RequestBody Map<String, String> params) {
    logger.info("#USER_LOG {},{},{},{},{}", session.getId(), session.getAttribute("username"), "count mechanic on list mechanic page", "", "");
    return mechanicClient.count(params);
  }

  @GetMapping("/mechanic/add")
  public String add(Model model) {
    model.addAttribute("id", "");
    model.addAttribute("code", "");
    model.addAttribute("name", "");
    logger.info("#USER_LOG {},{},{},{},{}", session.getId(), session.getAttribute("username"), "go to add mechanic page", "", "");
    return MECHANIC_PAGE_FORM;
  }

  @GetMapping("/mechanic/edit/{id}")
  public String edit(Model model, @PathVariable("id") String id) {
    JsonObject jsonObject = new Gson().fromJson(mechanicClient.get(Long.parseLong(id)), JsonObject.class);
    System.out.println("------------" + Utils.getAsString(jsonObject, "code", ""));
    model.addAttribute("id", Utils.getAsString(jsonObject, "id", ""));
    model.addAttribute("code", Utils.getAsString(jsonObject, "code", ""));
    model.addAttribute("name", Utils.getAsString(jsonObject, "name", ""));
    model.addAttribute("address", Utils.getAsString(jsonObject, "address", ""));
    model.addAttribute("taxCode", Utils.getAsString(jsonObject, "taxCode", ""));
    model.addAttribute("taxAddress", Utils.getAsString(jsonObject, "taxAddress", ""));
    model.addAttribute("mobile", Utils.getAsString(jsonObject, "mobile", ""));
    model.addAttribute("email", Utils.getAsString(jsonObject, "email", ""));
    model.addAttribute("note", Utils.getAsString(jsonObject, "note", ""));
    model.addAttribute("userId", Utils.getAsString(jsonObject, "userId", ""));
    logger.info("#USER_LOG {},{},{},{},{}", session.getId(), session.getAttribute("username"), "go to edit mechanic page", "", "");
    return MECHANIC_PAGE_FORM;
  }

  @PostMapping("/mechanic/save")
  @ResponseBody
  public ResponseEntity save(@RequestBody Map<String, String> params) {
    try {
      logger.info("#USER_LOG {},{},{},{},{}", session.getId(), session.getAttribute("username"), "execute save mechanic", "", "");
      String rtn = mechanicClient.save(params);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }


  @PostMapping("/mechanic/delete")
  @ResponseBody
  public ResponseEntity delete(@RequestBody Map<String, String> params) {
    try {
      logger.info("#USER_LOG {},{},{},{},{}", session.getId(), session.getAttribute("username"), "execute delete mechanic", "", "");
      String rtn = mechanicClient.deteles(params.getOrDefault("ids", ""));
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }
}
