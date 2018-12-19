package com.wsplanning.webapp;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.wsplanning.CustomAuthenticationProvider;
import com.wsplanning.webapp.clients.AuthClient;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomizeLogoutSuccessHandler implements LogoutSuccessHandler {
  private Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  private AuthClient authClient;

  @Autowired
  private HttpSession session;


  @Override
  public void onLogoutSuccess(HttpServletRequest request,
                              HttpServletResponse response, Authentication authentication)
      throws IOException, ServletException {
    // Code For Business Here
    if (authentication != null) {

      String token = (String) session.getAttribute(CustomAuthenticationProvider.SESSION_TOKEN);
      if (token != null && !StringUtils.isBlank(token)) {
        logger.info("Logout Sucessfull on server with Principal: " + authentication.getName());
        String logout = authClient.logout(token);
        logger.info("Logout respponse: " + logout);
        session.removeAttribute(CustomAuthenticationProvider.SESSION_TOKEN);
      }
      logger.info("Logout Sucessfull with Principal: " + authentication.getName());
    }

    logger.info("Logout Sucessfull");
    response.setStatus(HttpServletResponse.SC_OK);
    //redirect to login
    response.sendRedirect("/logoutsuccessful");
  }
}
