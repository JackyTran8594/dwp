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
import java.util.Map;

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

  public String countWO(String token, String siteId, Map<String, String> params) {
    String viewName = params.get("ViewName");
    String skey = params.get("skey");
    String page = params.get("page");
    String limit = params.get("limit");
    String DeptId = params.get("DeptId");
    String Receiver = params.get("Receiver");
    String TransactionType = params.get("TransactionType");
    String VisitReasonCode = params.get("VisitReasonCode");
    String MyWO = params.get("MyWO");
    String LoadAttachment = params.get("LoadAttachment");
    String LoadAttachmentData = params.get("LoadAttachmentData");
    String ServDateTo = params.get("ServDateTo");

    HttpHeaders headers = new HttpHeaders();
    headers.set("Token", token);

    if (StringUtils.isNotBlank(skey)) {
      headers.set("skey", Base64.getEncoder().encodeToString(skey.getBytes()));
    }

    if (StringUtils.isNotBlank(limit)) {
      headers.set("PageCount", limit);
    }
    if (StringUtils.isNotBlank(page)) {
      headers.set("Page", page);
    }
    HttpEntity entity = new HttpEntity(headers);
    String url = String.format("%s?SiteId=%s&ViewName=%s&getCountOnly=%s", this.endpointUrl, siteId, viewName, "true");
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }

  public String getWO(String token, String siteId, Map<String, String> params) {
    String viewName = params.get("ViewName");
    String skey = params.get("skey");
    String page = params.get("page");
    String limit = params.get("limit");
    String DeptId = params.get("DeptId");
    String Receiver = params.get("Receiver");
    String TransactionType = params.get("TransactionType");
    String VisitReasonCode = params.get("VisitReasonCode");
    String MyWO = params.get("MyWO");
    String LoadAttachment = params.get("LoadAttachment");
    String LoadAttachmentData = params.get("LoadAttachmentData");
    String ServDateTo = params.get("ServDateTo");

    HttpHeaders headers = new HttpHeaders();
    headers.set("Token", token);
    if (StringUtils.isNotBlank(skey)) {
      headers.set("skey", Base64.getEncoder().encodeToString(skey.getBytes()));
    }

    if (StringUtils.isNotBlank(limit)) {
      headers.set("PageCount", limit);
    }
    if (StringUtils.isNotBlank(page)) {
      headers.set("Page", page);
    }
    HttpEntity entity = new HttpEntity(headers);
    String url = String.format("%s?SiteId=%s&ViewName=%s", this.endpointUrl, siteId, viewName);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }
}
