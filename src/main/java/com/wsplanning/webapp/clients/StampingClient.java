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

@Component
public class StampingClient {
  private RestTemplate restTemplate;
  private String endpointUrl;

  @Autowired
  public StampingClient(RestTemplate restTemplate,
                    @Value("${apiEndpointUrl}") String apiEndpointUrl) {
    this.restTemplate = restTemplate;
    this.restTemplate.getMessageConverters()
        .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
    this.endpointUrl = apiEndpointUrl + "/api/Stamping";
  }

  public String getStamping(String token) {
    HttpHeaders headers = new HttpHeaders();
    headers.set("Token", token);
    headers.set("TokenId", token);
    HttpEntity entity = new HttpEntity(headers);
    String url = String.format("%s", this.endpointUrl);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }

  public String confirmStamping(String token, Map<String, String> params) {
    HttpHeaders headers = new HttpHeaders();
    String WorkOrderId = params.get("WorkOrderId");
    String RowId = params.get("RowId");
    String StampingCode = params.get("StampingCode");
    if (StringUtils.isNotBlank(WorkOrderId)) {
      headers.set("WorkOrderId", WorkOrderId);
    }
    if (StringUtils.isNotBlank(RowId)) {
      headers.set("RowId", RowId);
    }
    if (StringUtils.isNotBlank(StampingCode)) {
      headers.set("StampingCode", StampingCode);
    }
    headers.set("Token", token);
    HttpEntity entity = new HttpEntity(headers);
    String url = String.format("%s", this.endpointUrl);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class, new HashMap<>());
    return response.getBody();
  }


}
