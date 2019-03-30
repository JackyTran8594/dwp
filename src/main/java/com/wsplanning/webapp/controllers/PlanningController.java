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
  protected WokOrderClient wokOrderClient;

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
  public ResponseEntity resources(@RequestParam String DeptId, @RequestParam String ShiftId) {
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

        JsonObject objBusinessHours = new JsonObject();
        objBusinessHours.addProperty("start", "08:00");
        objBusinessHours.addProperty("startTime", "08:00");
        objBusinessHours.addProperty("end", "18:00");
        objBusinessHours.addProperty("endTime", "18:00");

        if ((DeptId == null || DeptId.trim().length() == 0 || DeptId.equalsIgnoreCase("0"))
            && (ShiftId == null || ShiftId.trim().length() == 0 || ShiftId.equalsIgnoreCase("0"))) {
          for (JsonElement item : listData) {
            itemObj = item.getAsJsonObject();
            itemRtn = new JsonObject();
            itemRtn.addProperty("id", itemObj.get("SmanId").getAsString());
            itemRtn.addProperty("title", itemObj.get("ShortName").getAsString());
            itemRtn.addProperty("deptId", itemObj.get("DeptId").getAsString());
            itemRtn.addProperty("shiftId", itemObj.get("ShiftId").getAsString());
            itemRtn.addProperty("eventColor", colors[i % colors.length]);
            itemRtn.add("businessHours",objBusinessHours);
//            itemRtn.addProperty("businessHours", objBusinessHours.toString());
            listRtn.add(itemRtn);
            i++;
          }
        } else {
          for (JsonElement item : listData) {
            itemObj = item.getAsJsonObject();
            itemRtn = new JsonObject();
            if (DeptId != null && DeptId.trim().length() > 0 && !DeptId.equalsIgnoreCase("0")) {
              if (!itemObj.get("DeptId").getAsString().equalsIgnoreCase(DeptId)) {
                continue;
              }
            }
            if (ShiftId != null && ShiftId.trim().length() > 0 && !ShiftId.equalsIgnoreCase("0")) {
              if (!itemObj.get("ShiftId").getAsString().equalsIgnoreCase(ShiftId)) {
                continue;
              }
            }

            itemRtn.addProperty("id", itemObj.get("SmanId").getAsString());
            itemRtn.addProperty("title", itemObj.get("ShortName").getAsString());
            itemRtn.addProperty("deptId", itemObj.get("DeptId").getAsString());
            itemRtn.addProperty("shiftId", itemObj.get("ShiftId").getAsString());
            itemRtn.addProperty("eventColor", colors[i % colors.length]);
            itemRtn.add("businessHours",objBusinessHours);
            listRtn.add(itemRtn);
            i++;
          }
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
  public ResponseEntity events2(@RequestParam("start") String start, @RequestParam("DeptId") String DeptId, @RequestParam("ShiftId") String ShiftId) {
    try {
      start = start.substring(0, start.indexOf("T")); ////2019-03-21T00:00:00Z
      JsonArray listRtn = new JsonArray();
      String rtn = wokOrderClient.getResource(getSiteId(), start.replaceAll("-", "."), DeptId, ShiftId);
      if (rtn != null && StringUtils.isNotBlank(rtn)) {
        JsonParser parser = new JsonParser();
        JsonElement tradeElement = parser.parse(rtn);
        JsonArray listData = tradeElement.getAsJsonArray();

        // Init list
        JsonObject itemRtn = null;
        JsonObject WorkOrder = null;
        JsonObject WOResource = null;
        JsonArray BookedResources = null;
        String title = "";
        for (JsonElement item : listData) {
          WorkOrder = item.getAsJsonObject();

          if (WorkOrder.has("TimeBarText")) {
            title = WorkOrder.get("TimeBarText").getAsString();
          } else {
            title = "";
          }
          if (WorkOrder.has("BookedResources")) {
            BookedResources = WorkOrder.get("BookedResources").getAsJsonArray();
            for (JsonElement resource : BookedResources) {
              WOResource = resource.getAsJsonObject();

              itemRtn = new JsonObject();
              itemRtn.addProperty("resourceId", WOResource.get("ResourceId").getAsString());
              if (!title.isEmpty()) {
                itemRtn.addProperty("title", title);
              } else {
                itemRtn.addProperty("title", WOResource.toString());
              }
              itemRtn.addProperty("start", WOResource.get("StartTime").getAsString());
              itemRtn.addProperty("end", WOResource.get("EndTime").getAsString());
              listRtn.add(itemRtn);

            }
          }
        }
      }

      return new ResponseEntity<>(listRtn.toString(), HttpStatus.OK);
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
