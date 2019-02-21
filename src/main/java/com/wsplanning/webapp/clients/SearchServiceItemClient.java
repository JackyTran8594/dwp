package com.wsplanning.webapp.clients;

import java.nio.charset.Charset;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class SearchServiceItemClient {

    private RestTemplate restTemplate;
    private String endpointUrl;
    private HttpSession session;

    @Autowired
    public SearchServiceItemClient(RestTemplate restTemplate, @Value("${apiEndpointUrl}") String apiEndpointUrl) {
        this.restTemplate = restTemplate;
        this.restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        this.endpointUrl = apiEndpointUrl + "/api/SearchServiveItem";
    }

    public String getServiceItem(Integer itemType, String skey) {
        String url = String.format("%s?itemType=%d&skey=%s", this.endpointUrl, itemType, skey);
        return restTemplate.getForObject(url, String.class);
    }
}