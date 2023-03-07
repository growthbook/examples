package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {
			System.out.println("Decrypted greeting: http://localhost:8080/encrypted");
			System.out.println("Dependency Injection example: http://localhost:8080/di");
			System.out.println("Welcome banner: http://localhost:8080/welcome-banner");
			System.out.println("Meal order: http://localhost:8080/meal");
			System.out.println("Features (public site): http://localhost:8080/acme-features/public");
			System.out.println("Features (employee site): http://localhost:8080/acme-features/employee");
			System.out.println("French banner (uses features from the GrowthBook API): http://localhost:8080/remote");
			System.out.println("Features forced by URL: http://localhost:8080/url-feature-force");
			System.out.println("Features forced by URL (with URL overrides): http://localhost:8080/url-feature-force?gb~meal_overrides_gluten_free=%7B%22meal_type%22%3A%20%22gf%22%2C%20%22dessert%22%3A%20%22French%20Vanilla%20Ice%20Cream%22%7D&gb~dark_mode=true&gb~donut_price=3.33&gb~banner_text=Hello%2C%20everyone!%20I%20hope%20you%20are%20all%20doing%20well!");
		};
	}
}
