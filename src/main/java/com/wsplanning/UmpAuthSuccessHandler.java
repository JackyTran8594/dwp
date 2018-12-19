package com.wsplanning;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

/**
 * Created by ThuyetLV
 */
////@Component
//public class UmpAuthSuccessHandler implements AuthenticationSuccessHandler {
public class UmpAuthSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    private HttpSession session;

    @Autowired
    private LocaleResolver localeResolver;

    public UmpAuthSuccessHandler(String defaultTargetUrl) {
        setDefaultTargetUrl(defaultTargetUrl);
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        Set<String> roles = new HashSet<String>();
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            roles.add(authority.getAuthority());
        }

        String lang = (String) session.getAttribute(CustomAuthenticationProvider.SESSION_LANG);
        session.setAttribute("roles", roles);
        System.out.println("----------getPrincipal: " + authentication.getPrincipal());
        session.setAttribute("username", authentication.getPrincipal());
        System.out.println("----------getAttribute siteId with lang: " + (String) session.getAttribute(CustomAuthenticationProvider.SESSION_SITEID) + " - " + lang);

        HttpSession session = httpServletRequest.getSession();
        if (session != null) {
            String redirectUrl = (String) session.getAttribute("url_prior_login");
            System.out.printf("session != null: " + redirectUrl);
            if (redirectUrl != null && redirectUrl != "" && !redirectUrl.contains("logout")) {
                Locale userLocale = Locale.forLanguageTag(lang);
                localeResolver.setLocale(httpServletRequest, httpServletResponse, userLocale);
                System.out.printf("redirectUrl != null: " + redirectUrl);
                // we do not forget to clean this attribute from session
                session.removeAttribute("url_prior_login");
                // then we redirect
                getRedirectStrategy().sendRedirect(httpServletRequest, httpServletResponse, redirectUrl);
            } else {
                Locale userLocale = Locale.forLanguageTag(lang);
                localeResolver.setLocale(httpServletRequest, httpServletResponse, userLocale);
                System.out.printf("redirectUrl == null: ");
//                redirectUrl = "/mechanic/?lang="+lang;
//                getRedirectStrategy().sendRedirect(httpServletRequest, httpServletResponse, redirectUrl);
                super.onAuthenticationSuccess(httpServletRequest, httpServletResponse, authentication);
            }
        } else {
            System.out.printf("session == null: ");
            httpServletResponse.sendRedirect("/mechanic/");
        }
    }
}
