package com.wsplanning.webapp.controllers;

import com.google.gson.Gson;
import com.wsplanning.webapp.clients.EmployeesClient;
import com.wsplanning.webapp.dto.PhoneCallTaskDTO;
import com.wsplanning.webapp.dto.TaskDTO;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.wsplanning.webapp.clients.TaskClient;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class TaskController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(TaskController.class);

    @Autowired
    protected EmployeesClient employeesClient;

    @Autowired
    protected TaskClient taskClient;

    @Autowired
    protected HttpSession session;

    @Autowired
    HttpSession httpSession;

    Gson gson = new Gson();

    @PostMapping("/tasklist/getdata")
    @ResponseBody
    public ResponseEntity getdata(@RequestBody Map<String, String> params) {
        try {
            String SmanId = params.get("SmanId");
            if (SmanId == null || StringUtils.isBlank(SmanId)) {
                SmanId = getSManId();
            }
            String bIsOpen = params.get("bIsOpen");
            String rtn = taskClient.getData(getSiteId(), SmanId, bIsOpen, null, params);
            return new ResponseEntity<>(rtn, HttpStatus.OK);
        } catch (Exception ex) {
            return parseException(ex);
        }
    }

    @PostMapping("/tasklist/count")
    @ResponseBody
    public ResponseEntity count(@RequestBody Map<String, String> params) {
        try {
            String SmanId = params.get("SmanId");
            if (SmanId == null || StringUtils.isBlank(SmanId)) {
                SmanId = getSManId();
            }
            String bIsOpen = params.get("bIsOpen");
            String rtn = taskClient.getData(getSiteId(), SmanId, bIsOpen, "true", params);
            return new ResponseEntity<>(rtn, HttpStatus.OK);
        } catch (Exception ex) {
            return parseException(ex);
        }
    }

    @PostMapping("/tasklist/saveTask")
    @ResponseBody
    public ResponseEntity createtask(@RequestBody TaskDTO data) {
        try {
            if("insert".equalsIgnoreCase(data.action)){
                data.SiteId = getSiteId();
            }
            String rtn = taskClient.saveTask(getToken(), data.action, data);
            return new ResponseEntity<>(rtn, HttpStatus.OK);
        } catch (Exception ex) {
            return parseException(ex);
        }
    }

}
