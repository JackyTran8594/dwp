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
  protected WSCalendarClient wsCalendarClient;

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


  private JsonArray convertToResource(String rtn, String DeptId, String ShiftId, HashMap<String, String> hsm, HashMap<String, String> hsmBreak) {
    // Init list
    JsonArray listRtn = new JsonArray();

    if (rtn != null && StringUtils.isNotBlank(rtn)) {
      JsonParser parser = new JsonParser();
      JsonElement tradeElement = parser.parse(rtn);
      JsonArray listData = tradeElement.getAsJsonArray();

      JsonObject itemRtn = null;

      int i = 0;
      JsonObject itemObj = null;

      JsonObject objBusinessHours = null;


      String businessHoursTmp = "";
      String tmp[] = null;

      if ((DeptId == null || DeptId.trim().length() == 0 || DeptId.equalsIgnoreCase("0"))
          && (ShiftId == null || ShiftId.trim().length() == 0 || ShiftId.equalsIgnoreCase("0"))) {
        for (JsonElement item : listData) {
          itemObj = item.getAsJsonObject();
          itemRtn = new JsonObject();
          itemRtn.addProperty("id", itemObj.get("SmanId").getAsString());
          itemRtn.addProperty("title", itemObj.get("ShortName").getAsString());
          itemRtn.addProperty("deptId", itemObj.get("DeptId").getAsString());
          itemRtn.addProperty("shiftId", itemObj.get("ShiftId").getAsString());
          itemRtn.addProperty("ResType", itemObj.get("ResType").getAsString());
//            itemRtn.addProperty("eventColor", colors[i % colors.length]);

          businessHoursTmp = hsm.get(itemObj.get("SmanId").getAsString());
          if (businessHoursTmp != null && businessHoursTmp.trim().length() > 0 && businessHoursTmp.contains("&")) {
            tmp = businessHoursTmp.split("&");
            objBusinessHours = new JsonObject();
            objBusinessHours.addProperty("start", tmp[0]);
            objBusinessHours.addProperty("startTime", tmp[0]);
            objBusinessHours.addProperty("end", tmp[1]);
            objBusinessHours.addProperty("endTime", tmp[1]);
          } else {
            objBusinessHours = new JsonObject();
            objBusinessHours.addProperty("start", "07:00");
            objBusinessHours.addProperty("startTime", "07:00");
            objBusinessHours.addProperty("end", "19:00");
            objBusinessHours.addProperty("endTime", "19:00");
          }
          itemRtn.add("businessHours", objBusinessHours);
          itemRtn.addProperty("breakHours", hsmBreak.get(itemObj.get("SmanId").getAsString()));
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
          itemRtn.addProperty("ResType", itemObj.get("ResType").getAsString());
//            itemRtn.addProperty("eventColor", colors[i % colors.length]);

          businessHoursTmp = hsm.get(itemObj.get("SmanId").getAsString());
          if (businessHoursTmp != null && businessHoursTmp.trim().length() > 0 && businessHoursTmp.contains("&")) {
            tmp = businessHoursTmp.split("&");
            objBusinessHours = new JsonObject();
            objBusinessHours.addProperty("start", tmp[0]);
            objBusinessHours.addProperty("startTime", tmp[0]);
            objBusinessHours.addProperty("end", tmp[1]);
            objBusinessHours.addProperty("endTime", tmp[1]);
          } else {
            objBusinessHours = new JsonObject();
            objBusinessHours.addProperty("start", "07:00");
            objBusinessHours.addProperty("startTime", "07:00");
            objBusinessHours.addProperty("end", "19:00");
            objBusinessHours.addProperty("endTime", "19:00");
          }

          itemRtn.add("businessHours", objBusinessHours);
          itemRtn.addProperty("breakHours", hsmBreak.get(itemObj.get("SmanId").getAsString()));
          listRtn.add(itemRtn);
          i++;
        }
      }
    }
    return listRtn;
  }

  //2019-04-02T08:00:00
  private String formatBusinessHours(String s) {
    if (s == null || s.trim().length() <= 0 || !s.contains("T") || !s.contains(":")) {
      return "";
    }
    return s.substring(s.lastIndexOf("T") + 1, s.lastIndexOf(":"));
  }

  @GetMapping("/resources")
  @ResponseBody
  public ResponseEntity resources(@RequestParam String start, @RequestParam String DeptId, @RequestParam String ShiftId) {
    try {
      start = start.substring(0, start.indexOf("T"));
      String calendar = wsCalendarClient.getCalendar(getSiteId(), start.replaceAll("-", "."), DeptId, ShiftId);

      HashMap<String, String> hsm = new HashMap<>();
      HashMap<String, String> hsmBreak = new HashMap<>();
      if (calendar != null && StringUtils.isNotBlank(calendar)) {
        JsonParser parser = new JsonParser();
        JsonElement tradeElement = parser.parse(calendar);
        JsonArray listData = tradeElement.getAsJsonArray();

        JsonObject itemObj = null;
        for (JsonElement item : listData) {
          itemObj = item.getAsJsonObject();
          if (itemObj.has("Type")) {
            if (itemObj.get("Type").getAsString().equalsIgnoreCase("P")) {
              hsm.put(itemObj.get("SmanId").getAsString(), formatBusinessHours(itemObj.get("Start").getAsString()) + "&" + formatBusinessHours(itemObj.get("End").getAsString()));
            } else if (itemObj.get("Type").getAsString().equalsIgnoreCase("T")) {
              //break
              if (hsmBreak.get(itemObj.get("SmanId").getAsString()) == null) {
                hsmBreak.put(itemObj.get("SmanId").getAsString(), formatBusinessHours(itemObj.get("Start").getAsString()) + "&" + formatBusinessHours(itemObj.get("End").getAsString()));
              } else {
                hsmBreak.put(itemObj.get("SmanId").getAsString(), hsmBreak.get(itemObj.get("SmanId").getAsString()) + "@" + formatBusinessHours(itemObj.get("Start").getAsString()) + "&" + formatBusinessHours(itemObj.get("End").getAsString()));
              }
            }
          }
        }
      }


      //getMechanics
      String rtn = employeesClient.getMechanics(getSiteId());
      JsonArray listRtn = convertToResource(rtn, DeptId, ShiftId, hsm, hsmBreak);

      //getServiceAdvisors
      rtn = employeesClient.getServiceAdvisors(getSiteId());
      listRtn.addAll(convertToResource(rtn, DeptId, ShiftId, hsm, hsmBreak));
      return new ResponseEntity<>(listRtn.toString(), HttpStatus.OK);
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
      String DeptId = params.get("DeptId");
      String ShiftId = params.get("ShiftId");

      if (DeptId == null || DeptId.trim().length() == 0 || "0".equalsIgnoreCase(DeptId)) {
        DeptId = "";
      }
      if (ShiftId == null || ShiftId.trim().length() == 0 || "0".equalsIgnoreCase(ShiftId)) {
        ShiftId = "";
      }

      start = start.substring(0, start.indexOf("T"));
      return new ResponseEntity<>(generateEvent(start, DeptId, ShiftId).toString(), HttpStatus.OK);
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

      JsonObject itemRtn = null;

      if (rtn != null && StringUtils.isNotBlank(rtn)) {
        JsonParser parser = new JsonParser();
        JsonElement tradeElement = parser.parse(rtn);
        JsonArray listData = tradeElement.getAsJsonArray();

        // Init list
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

      //Add type P = working hour, type T= break
      String calendar = wsCalendarClient.getCalendar(getSiteId(), start.replaceAll("-", "."), DeptId, ShiftId);
      if (calendar != null && StringUtils.isNotBlank(calendar)) {
        JsonParser parser = new JsonParser();
        JsonElement tradeElement = parser.parse(calendar);
        JsonArray listData = tradeElement.getAsJsonArray();

        JsonObject itemObj = null;
        for (JsonElement item : listData) {
          itemObj = item.getAsJsonObject();
          itemRtn = new JsonObject();
          itemRtn.addProperty("resourceId", itemObj.get("SmanId").getAsString());
          itemRtn.addProperty("start", itemObj.get("Start").getAsString());
          itemRtn.addProperty("end", itemObj.get("End").getAsString());

//          itemRtn.addProperty("start", itemObj.get("Start").getAsString().replaceAll("T00","T08"));
//          itemRtn.addProperty("end", itemObj.get("End").getAsString().replaceAll("T00","T09"));
          if (itemObj.has("Type")) {
            if (itemObj.get("Type").getAsString().equalsIgnoreCase("P")) {
              itemRtn.addProperty("title", "P");
              itemRtn.addProperty("rendering", "background");
              itemRtn.addProperty("color", "#1cdac6");
              listRtn.add(itemRtn);
            } else if (itemObj.get("Type").getAsString().equalsIgnoreCase("T")) {
              //break
              itemRtn.addProperty("title", "T");
              itemRtn.addProperty("color", "#bad0cd");
              itemRtn.addProperty("overlap", false);
              itemRtn.addProperty("editable", false);
              itemRtn.addProperty("resourceEditable", false);
              itemRtn.addProperty("droppable", false);
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

  private JsonArray generateEvent(String start, String DeptId, String ShiftId) {
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
