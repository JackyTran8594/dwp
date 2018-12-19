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
public class AuthClient {

  private RestTemplate restTemplate;
  private String endpointUrl;

  @Autowired
  public AuthClient(RestTemplate restTemplate,
                    @Value("${apiEndpointUrl}") String apiEndpointUrl) {
    this.restTemplate = restTemplate;
    this.restTemplate.getMessageConverters()
        .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
    this.endpointUrl = apiEndpointUrl + "/api/Auth";
  }

  public String login(String siteId, String LangId, String user, String pass) {
    HttpHeaders headers = new HttpHeaders();
    headers.set("UserId", Base64.getEncoder().encodeToString(user.getBytes()));
    headers.set("Password", Base64.getEncoder().encodeToString(pass.getBytes()));
    HttpEntity entity = new HttpEntity(headers);
    String url = String.format("%s?SiteId=%s&LangId=%s", this.endpointUrl, siteId, LangId);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }

  public String auth(String token, String LangId) {
    HttpHeaders headers = new HttpHeaders();
    headers.set("Token", token);
    if(LangId != null && StringUtils.isNotBlank(LangId)) {
      headers.set("LangId", LangId);
    }
    HttpEntity entity = new HttpEntity(headers);
    String url = String.format("%s", this.endpointUrl);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }

  public String logout(String token) {
    HttpHeaders headers = new HttpHeaders();
    headers.set("Token", token);
    HttpEntity entity = new HttpEntity(headers);
    String url = String.format("%s?Logout=true", this.endpointUrl);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }
}
