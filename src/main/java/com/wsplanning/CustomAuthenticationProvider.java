package com.wsplanning;

import com.google.gson.JsonObject;
import com.wsplanning.webapp.clients.ASMasterClient;
import com.wsplanning.webapp.clients.AuthClient;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
  private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationProvider.class);

  public static final String SESSION_LANG = "SESSION_LANG";
  public static final String SESSION_SITEID = "SESSION_SITEID";
  public static final String SESSION_TOKEN = "SESSION_TOKEN";
  public static final String SESSION_SMANID = "userSmanID";
  public static final String SESSION_EMPLOYEEDATA = "EmployeeData";

  public CustomAuthenticationProvider() {
    logger.info("*** CustomAuthenticationProvider created");
    hsmLang = new HashMap<>();
    hsmLang.put("100", "vi");
    hsmLang.put("102", "en");
    hsmLang.put("103", "en");
    hsmLang.put("104", "en");
    hsmLang.put("105", "en");
    hsmLang.put("106", "en");

    hsmCountry = new HashMap<>();
    hsmCountry.put("100", "VN");
    hsmCountry.put("102", "en");
    hsmCountry.put("103", "en");
    hsmCountry.put("104", "en");
    hsmCountry.put("105", "en");
    hsmCountry.put("106", "en");

    //http://localhost:8081/mechanic/?lang=vi
  }

  @Autowired(required = false)
  private HttpServletRequest request;

  @Autowired
  private HttpSession session;

  @Autowired
  private ASMasterClient asMasterClient;

  @Autowired
  private AuthClient authClient;


  public static HashMap<String, String> hsmLang = new HashMap<>();
  public static HashMap<String, String> hsmCountry = new HashMap<>();

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    String siteId = (String) request.getParameter("siteId");
    String language = (String) request.getParameter("language");
    if (language == null || StringUtils.isBlank(language)) {
      language = hsmLang.get(siteId);
      if (language == null || StringUtils.isBlank(language)) {
        language = "en";
      }
    }
    session.setAttribute(SESSION_LANG, language);
    session.setAttribute(SESSION_SITEID, siteId);

    boolean loginSuccess = false;
    try {
      String loginResponse = authClient.login(siteId, language, authentication.getName(), (String) authentication.getCredentials());
      if (loginResponse != null && !StringUtils.isBlank(loginResponse)) {
        JSONObject userInfo = new JSONObject(loginResponse);
        String Token = userInfo.optString("Token", "");
        String siteName = asMasterClient.getSiteName(userInfo.optString("SiteId", ""));
        if (Token != null && !StringUtils.isBlank(Token)) {
          JSONObject EmployeeData = userInfo.optJSONObject("EmployeeData");
//          JSONObject EmployeeData = userInfo.optJSONObject("Employee");

          if (EmployeeData != null) {
            session.setAttribute(SESSION_EMPLOYEEDATA, EmployeeData.toString());
            if (siteName != null && !StringUtils.isBlank(siteName)) {
              session.setAttribute(SESSION_SMANID, EmployeeData.optString("Name", "") + "@" + siteName);
            } else {
              session.setAttribute(SESSION_SMANID, EmployeeData.optString("Name", ""));
            }
          }
          System.out.println("------Token: " + Token);
          loginSuccess = true;
          session.setAttribute(SESSION_TOKEN, Token);
        }
      }
    } catch (Exception ex) {
      logger.error("ERROR authenticate: ", ex);
    }

    if (loginSuccess) {
      List<GrantedAuthority> grantedAuths = new ArrayList<>();
      grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
      grantedAuths.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
      return new UsernamePasswordAuthenticationToken(authentication.getName(), authentication.getCredentials(), grantedAuths);
    } else {
      return null;
    }

  }

  @Override
  public boolean supports(Class<?> authentication) {
    return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
  }
}
