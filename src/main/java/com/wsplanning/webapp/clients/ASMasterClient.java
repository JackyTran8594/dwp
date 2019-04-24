package com.wsplanning.webapp.clients;

import org.apache.poi.hssf.record.PageBreakRecord.Break;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * Created by ThuyetLV
 */
@Component
public class ASMasterClient {

    private RestTemplate restTemplate;
    private String endpointUrl;

    private static HashMap<String, String> hsmSite;

    @Autowired
    public ASMasterClient(RestTemplate restTemplate, @Value("${apiEndpointUrl}") String apiEndpointUrl) {
        this.restTemplate = restTemplate;
        this.restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        this.endpointUrl = apiEndpointUrl + "/api/ASMaster";
        hsmSite = new HashMap<>();
    }

    public String getSiteName(String Id) {
        if (hsmSite == null || hsmSite.isEmpty()) {
            getSites();
        }
        return hsmSite.get(Id);
    }

    public String getSites() {
        String url = String.format("%s?command=getSites", this.endpointUrl);

        String response = restTemplate.getForObject(url, String.class);
        if (hsmSite == null || hsmSite.isEmpty()) {
            if (hsmSite == null) {
                hsmSite = new HashMap<>();
            }
            JSONArray jsonArray = new JSONArray(response);
            JSONObject itemObj = null;
            for (int i = 0; i < jsonArray.length(); i++) {
                itemObj = jsonArray.getJSONObject(i);
                hsmSite.put(itemObj.getString("Id"), itemObj.getString("Name"));
            }
        }
        return response;
    }

    public String getLanguages() {
        String url = String.format("%s?command=getLanguages", this.endpointUrl);
        return restTemplate.getForObject(url, String.class);
    }

    // getTransactionTypes&amp;param1=[site_id]

    public String getTransactionTypes(String siteId) {
        String url = String.format("%s?command=getTransactionTypes&param1=%s", this.endpointUrl, siteId);
        return restTemplate.getForObject(url, String.class);
    }

    public String getDepartments(String siteId) {
        String url = String.format("%s?command=getDepartments&param1=%s", this.endpointUrl, siteId);
        return restTemplate.getForObject(url, String.class);
    }

    public String getJobTypes(String siteId) {
        String url = String.format("%s?command=getJobTypes&param1=%s", this.endpointUrl, siteId);
        return restTemplate.getForObject(url, String.class);
    }

    public String getJobCats(String siteId) {
        String url = String.format("%s?command=getJobCats&param1=%s", this.endpointUrl, siteId);
        return restTemplate.getForObject(url, String.class);
    }

    public String getPayers(String siteId) {
        String url = String.format("%s?command=getPayers&param1=%s", this.endpointUrl, siteId);
        return restTemplate.getForObject(url, String.class);
    }

    public String getShifts(String siteId) {
        String url = String.format("%s?command=getShifts&param1=%s", this.endpointUrl, siteId);
        return restTemplate.getForObject(url, String.class);
    }

    public String getVisitReasons(String siteId) {
        String url = String.format("%s?command=getVisitReasons&param1=%s", this.endpointUrl, siteId);
        return restTemplate.getForObject(url, String.class);
    }

    public String getChargeCats(String siteId) {
        String url = String.format("%s?command=getChargeCats&param1=%s", this.endpointUrl, siteId);
        return restTemplate.getForObject(url, String.class);
    }

    public String jobTab(String SiteId, String CustNo, String VehicleId) {
        String url = String.format("%s?SiteId=%s&CustNo=%s&VehiId=%s", this.endpointUrl, SiteId, CustNo, VehicleId);
        return restTemplate.getForObject(url, String.class);
    }

    public String getStampingCode(String param) {
        String url = String.format("%s?command=getStampingCodes&param1=%s", this.endpointUrl, param);
        return restTemplate.getForObject(url, String.class);
    }

    public JSONObject loadProperty() {
        String path = "messages/config.properties";
        String path_Menu = "messages/messages.properties";
        InputStream input = getClass().getClassLoader().getResourceAsStream(path);
        InputStream input_Menu = getClass().getClassLoader().getResourceAsStream(path_Menu);
        Properties prop_Auth = new Properties();
        Properties prop_Menu = new Properties();
        JSONArray jsonArray = new JSONArray();
        JSONArray jarray = new JSONArray();
        JSONArray arrayTab = new JSONArray();
        JSONArray arrTime = new JSONArray();
        // JSONArray properties = new JSONArray();
        JSONObject obj = new JSONObject();
        if (input == null) {
            System.out.println("not found");
        } else {
            try {
                prop_Auth.load(input);
                prop_Menu.load(input_Menu);

                prop_Menu.forEach((k, v) -> {
                    String[] icoStrings = k.toString().split("\\.");

                    if (icoStrings[0].contains("icon")) {
                        JSONObject jmenu = new JSONObject();
                        jmenu.put("name", icoStrings[1]);
                        jmenu.put("class", v.toString());
                        jarray.put(jmenu);
                    }
                });

                JSONObject objTimeout = new JSONObject();
                prop_Auth.forEach((key, value) -> {
                    JSONObject jsonObject = new JSONObject();
                    JSONObject objTab = new JSONObject();
                    String[] subStr = key.toString().split("\\.");
                    if (subStr[0].contains("app")) {
                        jsonObject.put("route", subStr[0] + "." + subStr[1] + "." + subStr[2]);
                        jsonObject.put("value", value.toString());
                        jsonObject.put("name", subStr[2]);
                        jsonObject.put("ordinalNumber", Integer.parseInt(subStr[3]));
                    }
                    if (subStr[0].contains("tab")) {
                        objTab.put("name", subStr[1]);
                        objTab.put("value", value.toString());
                        objTab.put("ordinalNumber", Integer.parseInt(subStr[2]));
                    }
                    if (subStr[0].contains("timeout")) {
                        objTimeout.put("name", subStr[0]);
                        objTimeout.put("value", value.toString());
                    }

                    arrayTab.put(objTab);
                    jsonArray.put(jsonObject);
                    arrTime.put(objTimeout);
                });

                obj.put("auth", jsonArray);
                obj.put("menu", jarray);
                obj.put("tab", arrayTab);
                obj.put("timeout", arrTime);

            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
                System.out.println(e);
            }
        }
        return obj;
    }
}
