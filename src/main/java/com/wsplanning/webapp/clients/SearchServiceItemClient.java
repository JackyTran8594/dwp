package com.wsplanning.webapp.clients;

import java.nio.charset.Charset;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class SearchServiceItemClient {

    private RestTemplate restTemplate;
    private String endpointUrl;
    private HttpSession session;

    @Autowired
    public SearchServiceItemClient(RestTemplate restTemplate, @Value("${apiEndpointUrl}") String apiEndpointUrl) {
        this.restTemplate = restTemplate;
        this.restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        this.endpointUrl = apiEndpointUrl + "/api/SearchServiceItems";
    }

    public String getServiceItem(String token, Map<String, String> params) {
        String skey = params.get("skey");
        String itemTypeStr = params.get("ItemType");
        Integer ItemType = Integer.parseInt(itemTypeStr);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", token);
        String url = String.format("%s?itemType=%d&skey=%s", this.endpointUrl, ItemType, skey);
        return restTemplate.getForObject(url, String.class);
    }

    public String getCountServiceItem(String token, Map<String, String> params) 
    {    
        String skey = params.get("skey");
        String itemTypeStr = params.get("ItemType");
    
        Integer ItemType = Integer.parseInt(itemTypeStr);
        // if (StringUtils.isNotBlank(skey)) {
        //     headers.set("skey", Base64.getEncoder().encodeToString(skey.getBytes()));
        //   }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", token);
        String url = String.format("%s?itemType=%d&skey=%s&getCountOnly=true", this.endpointUrl, ItemType, skey);
        return restTemplate.getForObject(url, String.class);
    }
}