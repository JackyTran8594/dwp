package com.wsplanning.webapp.clients;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ThuyetLV
 */
@Component
public class VehiclesClient {

  private RestTemplate restTemplate;
  private String endpointUrl;

  private static HashMap<String, String> hsmSite;

  @Autowired
  public VehiclesClient(RestTemplate restTemplate, @Value("${apiEndpointUrl}") String apiEndpointUrl) {
    this.restTemplate = restTemplate;
    this.restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
    this.endpointUrl = apiEndpointUrl + "/api/Vehicles";
    hsmSite = new HashMap<>();
  }

  public String getVehicles(String skey)
  {
    String url = String.format("%s?skey=%s", this.endpointUrl , skey);
    return restTemplate.getForObject(url, String.class);
  }
}
