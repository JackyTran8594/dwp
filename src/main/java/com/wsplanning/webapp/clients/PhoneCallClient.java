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
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ThuyetLV
 */
@Component
public class PhoneCallClient {
  //http://automaster.alliedsoft.hu:9092/api/PhoneCall?SmanId=401&CallType=RecentCall
  //http://automaster.alliedsoft.hu:9092/api/PhoneCall?SmanId=401&CallType=ActiveCall
  private RestTemplate restTemplate;
  private String endpointUrl;

  @Autowired
  public PhoneCallClient(RestTemplate restTemplate, @Value("${apiEndpointUrl}") String apiEndpointUrl) {
    this.restTemplate = restTemplate;
    this.restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
    this.endpointUrl = apiEndpointUrl + "/api/PhoneCall";
  }

  public String getData(String SmanId, String CallType,String bGetCountOnly, Map<String, String> params) {

    String page = params.get("page");
    String limit = params.get("limit");

    HttpHeaders headers = new HttpHeaders();
    if (StringUtils.isNotBlank(limit)) {
      headers.set("PageCount", limit);
    }
    if (StringUtils.isNotBlank(page)) {
      headers.set("Page", page);
    }


    String url = "";
    if (bGetCountOnly != null && StringUtils.isNotBlank(bGetCountOnly)) {
      url = String.format("%s?SmanId=%s&CallType=%s&bGetCountOnly=%s", this.endpointUrl, SmanId,CallType,String.valueOf(bGetCountOnly));
    } else {
      url = String.format("%s?SmanId=%s&CallType=%s", this.endpointUrl, SmanId,CallType);
    }

    HttpEntity entity = new HttpEntity(headers);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }

}
