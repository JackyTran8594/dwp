package com.wsplanning.webapp.clients;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;

import com.wsplanning.webapp.dto.NotificationDTO;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ThuyetLV
 */
@Component
public class NotificationClient {

  private RestTemplate restTemplate;
  private String endpointUrl;

  @Autowired
  public NotificationClient(RestTemplate restTemplate, @Value("${apiEndpointUrl}") String apiEndpointUrl) {
    this.restTemplate = restTemplate;
    this.restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
    this.endpointUrl = apiEndpointUrl + "/api/Notification";
  }

  public String getCount(String params) {
    String SmanId = params;
    String GetCountOnly = "true";
    String url = String.format("%s?SmanId=%s&bGetCountOnly=%s", this.endpointUrl, SmanId, GetCountOnly);
    return restTemplate.getForObject(url, String.class);
  }

  public String getListNotification(String params) {
    String SmanId = params;
    String url = String.format("%s?SmanId=%s", this.endpointUrl, SmanId);
    return restTemplate.getForObject(url, String.class);
  }

  public String postNotification(String siteId,String token, NotificationDTO item) {
    HttpHeaders headers = new HttpHeaders();
    item.SiteId = siteId;
    headers.set("Token", token);
    HttpEntity<NotificationDTO> entity = new HttpEntity<NotificationDTO>(item, headers);
    String url = String.format("%s", this.endpointUrl);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
    return response.getBody();
  }

  public String markNotification(String token, NotificationDTO item) {
    String postAction = "markNotify";
    HttpHeaders headers = new HttpHeaders();
    headers.set("Token", token);
    if (StringUtils.isNotBlank(postAction)) {
      headers.set("PostAction", postAction);
    }
    HttpEntity<NotificationDTO> entity = new HttpEntity<NotificationDTO>(item, headers);
    String url = String.format("%s", this.endpointUrl);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
    return response.getBody();
  }

  public String getCountNotificationType(Map<String, String> params) {
    String notificationType = params.get("notificationType");
    String smanId = params.get("smanId");
    String url =  String.format("%s?SmanId=%s&bGetCountOnly=true&NotificationType=%s", this.endpointUrl, smanId, notificationType);
    return restTemplate.getForObject(url, String.class);
  }

  public String getNotificationType(Map<String, String> params) {
    String notificationType = params.get("notificationType");
    String smanId = params.get("smanId");
    String url =  String.format("%s?SmanId=%s&NotificationType=%s", this.endpointUrl, smanId, notificationType);
    return restTemplate.getForObject(url, String.class);
  }


}
