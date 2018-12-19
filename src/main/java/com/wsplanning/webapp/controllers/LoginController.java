package com.wsplanning.webapp.controllers;

import com.wsplanning.CustomAuthenticationProvider;
import com.wsplanning.webapp.clients.AuthClient;
import com.wsplanning.webapp.clients.MechanicClient;
import com.wsplanning.webapp.clients.SiteClient;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Autowired
    protected SiteClient siteClient;

    @Autowired
    private HttpSession session;

    @GetMapping("/login")
    public String login(HttpServletRequest request) {
        String token = (String) session.getAttribute(CustomAuthenticationProvider.SESSION_TOKEN);
        if (token != null && !StringUtils.isBlank(token)) {
            return "redirect:/mechanic";
        }
        //String listSite = siteClient.getSites();
//        String referrer = request.getHeader("Referer");
//        request.getSession().setAttribute("url_prior_login", referrer);
        return "login";
    }
}
