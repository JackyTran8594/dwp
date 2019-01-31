package com.wsplanning.webapp.controllers;

import com.google.common.net.HttpHeaders;
import com.wsplanning.webapp.clients.ASMasterClient;
import com.wsplanning.webapp.clients.CustomerClient;
import com.wsplanning.webapp.clients.EmployeesClient;
import com.wsplanning.webapp.clients.StampingClient;
import com.wsplanning.webapp.clients.VehiclesClient;

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
public class CommonController extends BaseController {
  private Logger logger = LoggerFactory.getLogger(CommonController.class);

  @Autowired
  protected ASMasterClient siteClient;

  @Autowired
  protected StampingClient stampingClient;

  @Autowired
  protected EmployeesClient employeesClient;

  @Autowired
  protected CustomerClient customerClient;

  @Autowired
  protected VehiclesClient vehiclesClient;

  @Autowired
  protected HttpSession session;

  @Autowired
  HttpSession httpSession;

  @Autowired
  private LocaleResolver localeResolver;

  @GetMapping("/site/getAll")
  public ResponseEntity getAll() {
    try {
      String rtn = siteClient.getSites();
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/language/getAll")
  public ResponseEntity getLanguage() {
    try {
      String getLanguages = siteClient.getLanguages();
      JSONArray rtn = new JSONArray();
      JSONArray jsonArray = new JSONArray(getLanguages);
      JSONObject jsonObj = null;
      JSONObject itemObj = null;
      JSONArray Items = null;
      JSONObject itemLang = null;
      int IsDefault = 0;
      String CultureInfo = "";
      String Flag = "";
      String keyItem = "";
      for (int i = 0; i < jsonArray.length(); i++) {
        IsDefault = 0;
        CultureInfo = "";
        Flag = "";
        keyItem = "";

        itemLang = new JSONObject();
        jsonObj = jsonArray.getJSONObject(i);
        Items = jsonObj.getJSONArray("Items");
        for (int j = 0; j < Items.length(); j++) {
          itemObj = Items.getJSONObject(j);
          keyItem = itemObj.getString("Id");
          if ("IsDefault".equalsIgnoreCase(keyItem)) {
            IsDefault = itemObj.getInt("Value");
          } else if ("CultureInfo".equalsIgnoreCase(keyItem)) {
            CultureInfo = itemObj.getString("Value");
          } else if ("Flag".equalsIgnoreCase(keyItem)) {
            Flag = itemObj.getString("Value");
          }
        }
        itemLang.put("Id", jsonObj.getString("Id"));
        itemLang.put("Name", jsonObj.getString("Name"));
        itemLang.put("IsDefault", IsDefault);
        itemLang.put("CultureInfo", CultureInfo);
        itemLang.put("Flag", Flag);
        rtn.put(itemLang);
      }
      return new ResponseEntity<>(rtn.toString(), HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @PostMapping("/language")
  @ResponseBody
  public ResponseEntity getWO(@RequestBody Map<String, String> params, HttpServletRequest request,
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

  @GetMapping("/site/getTransactionTypes")
  public ResponseEntity getTransactionTypes() {
    try {
      String rtn = siteClient.getTransactionTypes(getSiteId());
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/site/getDepartments")
  public ResponseEntity getDepartments() {
    try {
      String rtn = siteClient.getDepartments(getSiteId());
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/site/getJobTypes")
  public ResponseEntity getJobTypes() {
    try {
      String rtn = siteClient.getJobTypes(getSiteId());
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/site/getJobCats")
  public ResponseEntity getJobCats() {
    try {
      String rtn = siteClient.getJobCats(getSiteId());
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/site/getPayers")
  public ResponseEntity getPayers() {
    try {
      String rtn = siteClient.getPayers(getSiteId());
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/site/getShifts")
  public ResponseEntity getShifts() {
    try {
      String rtn = siteClient.getShifts(getSiteId());
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/site/getVisitReasons")
  public ResponseEntity getVisitReasons() {
    try {
      String rtn = siteClient.getVisitReasons(getSiteId());
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/site/getServiceAdvisors")
  public ResponseEntity getServiceAdvisors() {
    try {
      String rtn = employeesClient.getServiceAdvisors(getSiteId());
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/site/getStamping")
  public ResponseEntity getStamping() {
    try {
      String rtn = stampingClient.getStamping(getToken());
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/site/getChargeCats")
  public ResponseEntity getChargeCats() {
    try {
      String rtn = siteClient.getChargeCats(getToken());
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/site/getVehicles")
  public ResponseEntity getVehicles(@RequestParam(name = "skey") String skey) {
    try {
      String rtn = vehiclesClient.getVehicles(skey);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/site/getCustomers")
  public ResponseEntity getCustomers(@RequestParam(name = "skey") String skey, @RequestParam(name = "custNo") String custNo) {
    try {
      String rtn = customerClient.getCustomers(skey, custNo);
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

}
