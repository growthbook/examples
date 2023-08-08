package com.example.demo;

import com.example.demo.models.UserAttributes;
import com.example.demo.services.AcmeDonutsFeatureService;
import growthbook.sdk.java.GBContext;
import growthbook.sdk.java.GrowthBook;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * An example {@link HandlerInterceptor} that allows you to DRY up the requests
 */
public class GrowthBookSDKInterceptor implements HandlerInterceptor {
    AcmeDonutsFeatureService acmeDonutsFeatureService;

    public GrowthBookSDKInterceptor(AcmeDonutsFeatureService acmeDonutsFeatureService) {
        this.acmeDonutsFeatureService = acmeDonutsFeatureService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("🛰 GrowthBookSDKInterceptor -> preHandle");

        // Pick a mock user type. Employees have donut price 0.00, users from "spain" see Spanish banner text, etc.
//        String userAttributesJson = UserAttributes.mockUserFromCountry("spain").toJson();
        String userAttributesJson = UserAttributes.mockUserFromCountry("france").toJson();
//        String userAttributesJson = UserAttributes.mockRegularUser().toJson();
//        String userAttributesJson = UserAttributes.mockEmployeeUser().toJson();

        // Init the GBContext with a URL and configure allowUrlOverrides = true
        GBContext context = GBContext.builder()
            .featuresJson(acmeDonutsFeatureService.getFeaturesJson())
            .attributesJson(userAttributesJson)
            .build();

        GrowthBook growthBook = new GrowthBook(context);

        request.setAttribute("growthbook", growthBook);

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
