package com.wsplanning.webapp.clients;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by ThuyetLV
 */
@Component
public class SiteClient {

  private RestTemplate restTemplate;
  private String endpointUrl;

  @Autowired
  public SiteClient(RestTemplate restTemplate,
                    @Value("${apiEndpointUrl}") String apiEndpointUrl) {
    this.restTemplate = restTemplate;
    this.restTemplate.getMessageConverters()
        .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        this.endpointUrl = apiEndpointUrl + "/api/ASMaster";
  }

  public String getSites() {
    String url = String.format("%s?command=getSites", this.endpointUrl);
    return restTemplate.getForObject(url, String.class);
  }

  public String getLanguages() {
    String url = String.format("%s?command=getLanguages", this.endpointUrl);
    return restTemplate.getForObject(url, String.class);
  }
}
