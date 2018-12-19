package com.wsplanning.webapp.controllers;

import com.wsplanning.webapp.clients.SiteClient;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
public class CommonController extends BaseController {
  private Logger logger = LoggerFactory.getLogger(CommonController.class);

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
      for (int i=0; i < jsonArray.length(); i++) {
        IsDefault = 0;
        CultureInfo = "";
        Flag = "";
        keyItem = "";

        itemLang = new JSONObject();
        jsonObj = jsonArray.getJSONObject(i);
        Items = jsonObj.getJSONArray("Items");
        for (int j=0; j < Items.length(); j++) {
          itemObj = Items.getJSONObject(j);
          keyItem = itemObj.getString("Id");
          if("IsDefault".equalsIgnoreCase(keyItem)){
            IsDefault = itemObj.getInt("Value");
          }else if("CultureInfo".equalsIgnoreCase(keyItem)){
            CultureInfo = itemObj.getString("Value");
          }else if("Flag".equalsIgnoreCase(keyItem)){
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
}
