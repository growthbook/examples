package com.example.demo;

import com.example.demo.services.AcmeDonutsFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig implements WebMvcConfigurer {
    @Autowired
    AcmeDonutsFeatureService acmeDonutsFeatureService;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new GrowthBookSDKInterceptor(acmeDonutsFeatureService));
    }
}
