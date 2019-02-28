package com.wsplanning.webapp.clients;

import java.nio.charset.Charset;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Base64;
import java.util.HashMap;

@Component
public class SearchServiceItemClient {

  private RestTemplate restTemplate;
  private String endpointUrl;
  private HttpSession session;

  @Autowired
  public SearchServiceItemClient(RestTemplate restTemplate, @Value("${apiEndpointUrl}") String apiEndpointUrl) {
    this.restTemplate = restTemplate;
    this.restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
    this.endpointUrl = apiEndpointUrl + "/api/SearchServiceItems";
  }

  public String getServiceItem(String token, Map<String, String> params) {
    String skey = params.get("skey");
    String itemTypeStr = params.get("itemType");
    String VehiId = params.get("vehiId");
    String CustNo = params.get("custNo");
    String Page = params.get("page");
    String PageCount = params.get("pageCount");
    HttpHeaders headers = new HttpHeaders();
    headers.set("Token", token);

    // if (StringUtils.isNotBlank(skey)) {
    //     headers.set("skey", Base64.getEncoder().encodeToString(skey.getBytes()));
    //     }

    if (StringUtils.isNotBlank(VehiId)) {
      headers.set("VehiId", VehiId);
    }

    if (StringUtils.isNotBlank(CustNo)) {
      headers.set("CustNo", CustNo);
    }

    if (StringUtils.isNotBlank(Page)) {
      headers.set("Page", Page);
    }

    if (StringUtils.isNotBlank(PageCount)) {
      headers.set("PageCount", PageCount);
    }
    Integer itemType = Integer.parseInt(itemTypeStr);
    HttpEntity entity = new HttpEntity(headers);
    System.out.println(token);
    String url = String.format("%s?itemType=%d&skey=%s", this.endpointUrl, itemType, skey);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }

  public String getCountServiceItem(String token, Map<String, String> params) {

    String skey = params.get("skey");
    String itemTypeStr = params.get("itemType");
    String VehiId = params.get("vehiId");
    String CustNo = params.get("custNo");
    String Page = params.get("page");
    String PageCount = params.get("pageCount");
    HttpHeaders headers = new HttpHeaders();
    headers.set("Token", token);

    // if (StringUtils.isNotBlank(skey)) {
    //     headers.set("skey", Base64.getEncoder().encodeToString(skey.getBytes()));
    //     }

    if (StringUtils.isNotBlank(VehiId)) {
      headers.set("VehiId", VehiId);
    }

    if (StringUtils.isNotBlank(CustNo)) {
      headers.set("CustNo", CustNo);
    }

    if (StringUtils.isNotBlank(Page)) {
      headers.set("Page", Page);
    }

    if (StringUtils.isNotBlank(PageCount)) {
      headers.set("PageCount", PageCount);
    }
    Integer itemType = Integer.parseInt(itemTypeStr);
    HttpEntity entity = new HttpEntity(headers);
    String url = String.format("%s?itemType=%d&skey=%s&getCountOnly=true", this.endpointUrl, itemType, skey);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }
}