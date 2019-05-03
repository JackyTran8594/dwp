package com.wsplanning.webapp.controllers;

import com.google.gson.*;
import com.wsplanning.webapp.clients.*;
import com.wsplanning.webapp.dto.*;
import com.wsplanning.webapp.utils.Utils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PhoneCallController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(PhoneCallController.class);

    @Autowired
    protected EmployeesClient employeesClient;

    @Autowired
    protected PhoneCallClient phoneCallClient;

    @Autowired
    protected HttpSession session;

    @Autowired
    HttpSession httpSession;

    Gson gson = new Gson();

    @PostMapping("/phonecall/getdata")
    @ResponseBody
    public ResponseEntity getdata(@RequestBody Map<String, String> params) {
        try {
            String SmanId = params.get("SmanId");
            if (SmanId == null || StringUtils.isBlank(SmanId)) {
                SmanId = getSManId();
            }
            String CallType = params.get("CallType");
            String rtn = phoneCallClient.getData(SmanId, CallType, null, params);
            return new ResponseEntity<>(rtn, HttpStatus.OK);
        } catch (Exception ex) {
            return parseException(ex);
        }
    }

    @PostMapping("/phonecall/count")
    @ResponseBody
    public ResponseEntity count(@RequestBody Map<String, String> params) {
        try {
            String SmanId = params.get("SmanId");
            if (SmanId == null || StringUtils.isBlank(SmanId)) {
                SmanId = getSManId();
            }
            String CallType = params.get("CallType");
            String rtn = phoneCallClient.getData(SmanId, CallType, "true", params);
            return new ResponseEntity<>(rtn, HttpStatus.OK);
        } catch (Exception ex) {
            return parseException(ex);
        }
    }


    @PostMapping("/phonecall/createtask")
    @ResponseBody
    public ResponseEntity createtask(@RequestBody PhoneCallTaskDTO data) {
        try {
            String rtn = phoneCallClient.createtask(getToken(),data);
            return new ResponseEntity<>(rtn, HttpStatus.OK);
        } catch (Exception ex) {
            return parseException(ex);
        }
    }

    @GetMapping("/phonecall/getPhoneCallEmployee/{db}/{siteId}")
    public ResponseEntity getPhoneCallEmployee(@PathVariable("db") String db, @PathVariable("siteId") String siteId) {
        try {
            String rtn = employeesClient.getPhoneCallEmployee(db, siteId);
            return new ResponseEntity<>(rtn, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return parseException(e);
        }
    }
}
