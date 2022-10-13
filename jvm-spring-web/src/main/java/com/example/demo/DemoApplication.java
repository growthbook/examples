package com.example.demo;

import growthbook.sdk.java.models.Context;
import growthbook.sdk.java.models.GBContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {
			System.out.println("Let's inspect the beans provided by Spring Boot:");

			String[] beanNames = ctx.getBeanDefinitionNames();
			Arrays.sort(beanNames);
			for (String beanName : beanNames) {
				System.out.println(beanName);
			}

			Boolean isEnabled = true;
			Boolean isQaMode = false;
			String url = "http://localhost:3000";
			Context gbContext = new GBContext(isEnabled, url, isQaMode);

			System.out.println(String.format("GrowthBook context %s", gbContext));

			System.out.println("http://localhost:8080");
		};
	}
}
