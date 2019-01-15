package com.wsplanning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Created by ThuyetLV
 */
@Configuration
@ComponentScan
@EnableAutoConfiguration
@SpringBootApplication
public class UserWebApplication extends SpringBootServletInitializer {

  public static void main(String[] args) {
    SpringApplication.run(UserWebApplication.class, args);
  }
}
