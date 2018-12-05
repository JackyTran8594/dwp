package com.wsplanning;

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
import java.util.List;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
  private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationProvider.class);

  public CustomAuthenticationProvider() {
    logger.info("*** CustomAuthenticationProvider created");
  }

  @Autowired(required = false)
  private HttpServletRequest request;

  @Autowired
  private HttpSession session;

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    String siteId = (String) request.getParameter("siteId");
    System.out.println("request siteId testing= " + siteId);
    session.setAttribute("siteId", siteId);
    if (authentication.getName().equals("admin") && authentication.getCredentials().equals("admin")) {
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
