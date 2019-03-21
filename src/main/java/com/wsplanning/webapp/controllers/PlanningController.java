package com.wsplanning.webapp.controllers;

import com.google.gson.*;
import com.wsplanning.webapp.clients.*;
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
  protected EmployeesClient employeesClient;

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


  @GetMapping("/resources")
  @ResponseBody
  public ResponseEntity resources() {
    try {
      String rtn = employeesClient.getMechanics(getSiteId());
      if (rtn != null && StringUtils.isNotBlank(rtn)) {
        JsonParser parser = new JsonParser();
        JsonElement tradeElement = parser.parse(rtn);
        JsonArray listData = tradeElement.getAsJsonArray();

        // Init list
        JsonArray listRtn = new JsonArray();
        JsonObject itemRtn = null;

        int i = 0;
        JsonObject itemObj = null;
        for (JsonElement item : listData) {
          itemObj = item.getAsJsonObject();
          itemRtn = new JsonObject();
          itemRtn.addProperty("id", itemObj.get("ShortName").getAsString());
          itemRtn.addProperty("title", itemObj.get("ShortName").getAsString());
          itemRtn.addProperty("eventColor", colors[i % colors.length]);
          listRtn.add(itemRtn);
          i++;
        }
        return new ResponseEntity<>(listRtn.toString(), HttpStatus.OK);
      }
      return new ResponseEntity<>(rtn, HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  String[] colors = "green,orange,red,blue".split(",");

  @PostMapping("/events")
  @ResponseBody
  public ResponseEntity events(@RequestBody Map<String, String> params) {
    try {
      String start = params.get("start"); //2019-03-21T00:00:00Z
      start = start.substring(0, start.indexOf("T"));
      return new ResponseEntity<>(generateEvent(start).toString(), HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  @GetMapping("/events2")
  public ResponseEntity events2(@RequestParam("start") String start) {
    try {
      start = start.substring(0, start.indexOf("T")); ////2019-03-21T00:00:00Z
      return new ResponseEntity<>(generateEvent(start).toString(), HttpStatus.OK);
    } catch (Exception ex) {
      return parseException(ex);
    }
  }

  private JsonArray generateEvent(String start) {
    JsonArray listRtn = new JsonArray();
    String rtn = employeesClient.getMechanics(getSiteId());
    if (rtn != null && StringUtils.isNotBlank(rtn)) {
      JsonParser parser = new JsonParser();
      JsonElement tradeElement = parser.parse(rtn);
      JsonArray listData = tradeElement.getAsJsonArray();

      // Init list
      JsonObject itemRtn = null;

      int i = 0;
      int hour = 0;
      JsonObject itemObj = null;
      for (JsonElement item : listData) {
        itemObj = item.getAsJsonObject();
        hour = new Random().nextInt() % 12;

        itemRtn = new JsonObject();
        itemRtn.addProperty("resourceId", itemObj.get("ShortName").getAsString());
        itemRtn.addProperty("title", "Event " + i + " - " + itemObj.get("ShortName").getAsString());
        if (hour < 10) {
          itemRtn.addProperty("start", start + "T0" + hour + ":00:00+00:00");
          itemRtn.addProperty("end", start + "T" + (hour + 10) + ":00:00+00:00");
        } else {
          itemRtn.addProperty("start", start + "T" + hour + ":00:00+00:00");
          itemRtn.addProperty("end", start + "T" + (hour + 4) + ":00:00+00:00");
        }
        listRtn.add(itemRtn);
        i++;
      }
    }
    return listRtn;
  }
}
