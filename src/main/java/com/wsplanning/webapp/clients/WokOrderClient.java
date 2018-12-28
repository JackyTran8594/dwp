package com.wsplanning.webapp.clients;

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
import java.util.Base64;
import java.util.HashMap;

/**
 * Created by ThuyetLV
 */
@Component
public class WokOrderClient {

  private RestTemplate restTemplate;
  private String endpointUrl;

  @Autowired
  public WokOrderClient(RestTemplate restTemplate,
                        @Value("${apiEndpointUrl}") String apiEndpointUrl) {
    this.restTemplate = restTemplate;
    this.restTemplate.getMessageConverters()
        .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
    this.endpointUrl = apiEndpointUrl + "/api/WorkOrders";
  }

  public String getWO(String token, String siteId, String viewName, String skey, String page, String limit) {
    HttpHeaders headers = new HttpHeaders();
    headers.set("Token", token);
    if (StringUtils.isNotBlank(limit)) {
      headers.set("LinePerPage", limit);
    }
    if (StringUtils.isNotBlank(page)) {
      headers.set("Page", page);
    }
    HttpEntity entity = new HttpEntity(headers);
    String url = "";
    if (StringUtils.isNotBlank(skey)) {
      url = String.format("%s?SiteId=%s&ViewName=%s&skey=%s", this.endpointUrl, siteId, viewName, Base64.getEncoder().encodeToString(skey.getBytes()));
    } else {
      url = String.format("%s?SiteId=%s&ViewName=%s&skey=", this.endpointUrl, siteId, viewName);
    }
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }
}
