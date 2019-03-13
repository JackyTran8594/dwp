package com.wsplanning.webapp.clients;

import com.google.gson.Gson;
import com.wsplanning.webapp.dto.WODTO;
import com.wsplanning.webapp.utils.Utils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ThuyetLV
 */
@Component
public class PlanningClient {

  private RestTemplate restTemplate;
  private String endpointUrl;

  @Autowired
  public PlanningClient(RestTemplate restTemplate, @Value("${apiEndpointUrl}") String apiEndpointUrl) {
    this.restTemplate = restTemplate;
    this.restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
    this.endpointUrl = apiEndpointUrl + "/api/WSCalendar";
  }

  public String getPlanning(String token, String siteId, Map<String, String> params) {
    String DayFrom = params.get("DayFrom");
    String DayTo = params.get("DayTo");
    String DeptId = params.get("DeptId");
    String ShiftId = params.get("ShiftId");

    HttpHeaders headers = new HttpHeaders();
    headers.set("Token", token);

    HttpEntity entity = new HttpEntity(headers);
    String url = String.format("%s?SiteId=%s&DayFrom=%s&DayTo=%s&DeptId=%s&ShiftId=%s", this.endpointUrl, siteId, DayFrom, DayTo, DeptId, ShiftId);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }
}
