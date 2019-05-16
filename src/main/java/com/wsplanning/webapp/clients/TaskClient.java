package com.wsplanning.webapp.clients;

import com.wsplanning.webapp.dto.PhoneCallTaskDTO;
import com.wsplanning.webapp.dto.TaskDTO;
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
public class TaskClient {
    //http://automaster.alliedsoft.hu:9092/api/Task?SiteId=102&SmanId=DUONG&bIsOpen=true&bGetCountOnly=true
    private RestTemplate restTemplate;
    private String endpointUrl;

    @Autowired
    public TaskClient(RestTemplate restTemplate, @Value("${apiEndpointUrl}") String apiEndpointUrl) {
        this.restTemplate = restTemplate;
        this.restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        this.endpointUrl = apiEndpointUrl + "/api/Task";
    }

    public String getData(String siteId, String SmanId, String bIsOpen, String bGetCountOnly, Map<String, String> params) {

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
            url = String.format("%s?SiteId=%s&SmanId=%s&bIsOpen=%s&bGetCountOnly=%s", this.endpointUrl, siteId, SmanId, bIsOpen, String.valueOf(bGetCountOnly));
        } else {
            url = String.format("%s?SiteId=%s&SmanId=%s&bIsOpen=%s", this.endpointUrl, siteId, SmanId, bIsOpen);
        }

        HttpEntity entity = new HttpEntity(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new HashMap<>());
        return response.getBody();
    }

    public String saveTask(String token, String action, TaskDTO data) {
        HttpHeaders headers = new HttpHeaders();
        if (StringUtils.isNotBlank(token)) {
            headers.set("Token", token);
        }
        if (StringUtils.isNotBlank(action)) {
            headers.set("PostAction", action);
        }
        HttpEntity<TaskDTO> entity = new HttpEntity<TaskDTO>(data, headers);
        String url = String.format("%s", this.endpointUrl);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        return response.getBody();
    }
}
