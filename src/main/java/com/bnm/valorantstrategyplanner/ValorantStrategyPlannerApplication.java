package com.bnm.valorantstrategyplanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication(exclude = {UserDetailsServiceAutoConfiguration.class})
public class ValorantStrategyPlannerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ValorantStrategyPlannerApplication.class, args);
	}

}
