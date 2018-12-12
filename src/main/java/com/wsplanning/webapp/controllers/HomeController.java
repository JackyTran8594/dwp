package com.wsplanning.webapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created by ThuyetLV
 */
@Controller
public class HomeController {

    @GetMapping("/")
    public String index(Model model) {
        return "redirect:/mechanic";
    }

    @GetMapping("/403")
    public String accessDenied() {
        return "errors/403";
    }
}
