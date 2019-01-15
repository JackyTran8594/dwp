package com.wsplanning.webapp.utils;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.wsplanning.webapp.controllers.CommonController;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class Utils {
  private static Logger logger = LoggerFactory.getLogger(CommonController.class);

  public static String getAsString(JsonObject obj, String key, String defaultValue) {
    if (obj.get(key) == null || obj.get(key).isJsonNull()) {
      return defaultValue;
    }
    return obj.get(key).getAsString();
  }

  public static Integer getAsInt(JsonObject obj, String key, Integer defaultValue) {
    if (obj.get(key) == null || obj.get(key).isJsonNull()) {
      return defaultValue;
    }
    return obj.get(key).getAsInt();
  }

  public static Long getAsLong(JsonObject obj, String key, Long defaultValue) {
    if (obj.get(key) == null || obj.get(key).isJsonNull()) {
      return defaultValue;
    }
    return obj.get(key).getAsLong();
  }

  public static JsonObject getAsJsonObject(JsonObject obj, String key, JsonObject defaultValue) {
    if (obj.get(key) == null || obj.get(key).isJsonNull()) {
      return defaultValue;
    }
    return obj.get(key).getAsJsonObject();
  }

  public static JsonArray getAsJsonArray(JsonObject obj, String key, JsonArray defaultValue) {
    if (obj.get(key) == null || obj.get(key).isJsonNull()) {
      return defaultValue;
    }
    return obj.get(key).getAsJsonArray();
  }

  public static String getAsString(Map<String, String> maps, String key, String defaultValue) {
    String rtn = maps.get(key);
    if (rtn == null) {
      return defaultValue;
    }
    return rtn;
  }

  public static Integer getAsInt(Map<String, String> maps, String key, Integer defaultValue) {
    String rtn = maps.get(key);
    if (rtn == null || !StringUtils.isNumeric(rtn)) {
      return defaultValue;
    }
    return Integer.parseInt(rtn);
  }

  public static Long getAsLong(Map<String, String> maps, String key, Long defaultValue) {
    String rtn = maps.get(key);
    if (rtn == null || !StringUtils.isNumeric(rtn)) {
      return defaultValue;
    }
    return Long.parseLong(rtn);
  }

  public static Boolean getAsBoolean(Map<String, String> maps, String key, Boolean defaultValue) {
    String rtn = maps.get(key);
    if (rtn == null || StringUtils.isBlank(rtn)) {
      return defaultValue;
    }
    return Boolean.parseBoolean(rtn);
  }

  static DateTimeFormatter formatterInput = DateTimeFormatter.ofPattern("yyyy-MM-dd");
  static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

  public static String formateDateAPI(String input) {
    if (input == null || StringUtils.isBlank(input)) {
      return "";
    }
    try {
      if (input.contains("T")) {
        input = input.substring(0, input.indexOf("T"));
      }
      LocalDate dateTime = LocalDate.parse(input, formatterInput);
      return dateTime.format(formatter);
    } catch (Exception ex) {
      logger.error(String.format("ERROR formateDateAPI {%s}", input), ex);
      ex.printStackTrace();
      return "";
    }
  }

  public static void main(String[] args) {
    System.out.println(formateDateAPI("2018-01-17T17:00:00.000Z"));
  }
}
