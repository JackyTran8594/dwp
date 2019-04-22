package com.wsplanning.webapp.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.wsplanning.CustomAuthenticationProvider;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.UnknownHttpStatusCodeException;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class BaseController {
  private Logger logger = LoggerFactory.getLogger(BaseController.class);


  public ResponseEntity parseException(Exception ex) {
    JsonObject response = new JsonObject();
    if (ex instanceof UnknownHttpStatusCodeException) {
      logger.error("ERROR UnknownHttpStatusCodeException: ", ex);
      UnknownHttpStatusCodeException uex = (UnknownHttpStatusCodeException) ex;
      if (uex.getRawStatusCode() == 601) {
        response.addProperty("message", uex.getResponseBodyAsString());
      } else {
        String s = uex.getResponseBodyAsString();
        if (StringUtils.isNotBlank(s)) {
          response = new Gson().fromJson(s, JsonObject.class);
        } else {
          response.addProperty("message", ex.getMessage());
        }
      }
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response.toString());
    } else if (ex instanceof HttpServerErrorException) {
      logger.error("ERROR HttpServerErrorException: ", ex);
      HttpServerErrorException hex = (HttpServerErrorException) ex;
      String s = hex.getResponseBodyAsString();
      if (StringUtils.isNotBlank(s)) {
        response = new Gson().fromJson(s, JsonObject.class);
      } else {
        response.addProperty("message", ex.getMessage());
      }
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response.toString());
    } else {
      logger.error("ERROR parseException: ", ex);
      response.addProperty("message", ex.getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response.toString());
    }
  }

  @Autowired
  private HttpSession session;

  public String getUsername() {
    return (String) session.getAttribute("username");
  }

  public String getSiteId() {
    String site = (String) session.getAttribute(CustomAuthenticationProvider.SESSION_SITEID);
    System.out.println("---site: " + site);
    return site;
  }

  public String getToken() {
    String token = (String) session.getAttribute(CustomAuthenticationProvider.SESSION_TOKEN);
    System.out.println("---token: " + token);
    return token;
  }

  public Map<String, String> addParamSiteId(Map<String, String> params) {
    params.put("SiteId", getSiteId());
    return params;
  }
}
