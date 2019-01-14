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
public class ASMasterClient {

  private RestTemplate restTemplate;
  private String endpointUrl;

  @Autowired
  public ASMasterClient(RestTemplate restTemplate,
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

  //getTransactionTypes&amp;param1=[site_id]

  public String getTransactionTypes(String siteId) {
    String url = String.format("%s?command=getTransactionTypes&param1=%s", this.endpointUrl,siteId);
    return restTemplate.getForObject(url, String.class);
  }

  public String getDepartments(String siteId) {
    String url = String.format("%s?command=getDepartments&param1=%s", this.endpointUrl,siteId);
    return restTemplate.getForObject(url, String.class);
  }

  public String getJobTypes(String siteId) {
    String url = String.format("%s?command=getJobTypes&param1=%s", this.endpointUrl,siteId);
    return restTemplate.getForObject(url, String.class);
  }

  public String getJobCats(String siteId) {
    String url = String.format("%s?command=getJobCats&param1=%s", this.endpointUrl,siteId);
    return restTemplate.getForObject(url, String.class);
  }

  public String getPayers(String siteId) {
    String url = String.format("%s?command=getPayers&param1=%s", this.endpointUrl,siteId);
    return restTemplate.getForObject(url, String.class);
  }

  public String getShifts(String siteId) {
    String url = String.format("%s?command=getShifts&param1=%s", this.endpointUrl,siteId);
    return restTemplate.getForObject(url, String.class);
  }

  public String getVisitReasons(String siteId) {
    String url = String.format("%s?command=getVisitReasons&param1=%s", this.endpointUrl,siteId);
    return restTemplate.getForObject(url, String.class);
  }

  public String getChargeCats(String siteId) {
    String url = String.format("%s?command=getChargeCats&param1=%s", this.endpointUrl,siteId);
    return restTemplate.getForObject(url, String.class);
  }
}
