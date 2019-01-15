package com.wsplanning.webapp.clients;

import com.wsplanning.webapp.utils.Utils;
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
    String ServDateFrom = params.get("FromDate");
    String ServDateTo = params.get("ToDate");

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

    if (StringUtils.isNotBlank(DeptId)) {
      headers.set("DeptId", DeptId);
    }
    if (StringUtils.isNotBlank(TransactionType)) {
      headers.set("TransactionType", TransactionType);
    }
    if (StringUtils.isNotBlank(VisitReasonCode)) {
      headers.set("VisitReasonCode", VisitReasonCode);
    }
    if (StringUtils.isNotBlank(MyWO) && "true".equalsIgnoreCase(MyWO)) {
      headers.set("MyWO", "true");
    }
    if (StringUtils.isNotBlank(LoadAttachment) && "true".equalsIgnoreCase(LoadAttachment)) {
      headers.set("LoadAttachment", "true");
    }
    if (StringUtils.isNotBlank(LoadAttachmentData) && "true".equalsIgnoreCase(LoadAttachmentData)) {
      headers.set("LoadAttachmentData", "true");
    }

    //yyyy.MM.dd
    if (StringUtils.isNotBlank(ServDateFrom)) {
      headers.set("ServDateFrom", Utils.formateDateAPI(ServDateFrom));
    }
    if (StringUtils.isNotBlank(ServDateTo)) {
      headers.set("ServDateTo", Utils.formateDateAPI(ServDateTo));
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
    String ServDateFrom = params.get("FromDate");
    String ServDateTo = params.get("ToDate");

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

    if (StringUtils.isNotBlank(DeptId)) {
      headers.set("DeptId", DeptId);
    }
    if (StringUtils.isNotBlank(TransactionType)) {
      headers.set("TransactionType", TransactionType);
    }
    if (StringUtils.isNotBlank(VisitReasonCode)) {
      headers.set("VisitReasonCode", VisitReasonCode);
    }
    if (StringUtils.isNotBlank(MyWO) && "true".equalsIgnoreCase(MyWO)) {
      headers.set("MyWO", "true");
    }
    if (StringUtils.isNotBlank(LoadAttachment) && "true".equalsIgnoreCase(LoadAttachment)) {
      headers.set("LoadAttachment", "true");
    }
    if (StringUtils.isNotBlank(LoadAttachmentData) && "true".equalsIgnoreCase(LoadAttachmentData)) {
      headers.set("LoadAttachmentData", "true");
    }
    if (StringUtils.isNotBlank(ServDateFrom)) {
      headers.set("ServDateFrom", Utils.formateDateAPI(ServDateFrom));
    }
    if (StringUtils.isNotBlank(ServDateTo)) {
      headers.set("ServDateTo", Utils.formateDateAPI(ServDateTo));
    }

    HttpEntity entity = new HttpEntity(headers);
    String url = String.format("%s?SiteId=%s&ViewName=%s", this.endpointUrl, siteId, viewName);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }


  public String detail(String token, String siteId, Map<String, String> params) {
    String workOrderId = params.get("WorkOrderId");
    HttpHeaders headers = new HttpHeaders();
    headers.set("Token", token);
    HttpEntity entity = new HttpEntity(headers);
    String url = String.format("%s?SiteId=%s&WorkOrderId=%s", this.endpointUrl, siteId, workOrderId);
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
    return response.getBody();
  }
}
