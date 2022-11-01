package com.example.demo;

import com.example.demo.models.DietaryRestriction;
import com.example.demo.models.MealOrder;
import com.example.demo.models.MealType;
import com.example.demo.models.UserAttributes;
import growthbook.sdk.java.GrowthBook;
import growthbook.sdk.java.models.Context;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class MainController {
    FeaturesRepository featuresRepository = new FeaturesRepository();

    @GetMapping("/welcome-banner")
    public String index(@RequestParam(value = "country", required = false) String country) {
        String userCountry = country;
        Boolean userIsEmployee = false;

        ArrayList<DietaryRestriction> userDietaryRestrictions = new ArrayList<>();
        userDietaryRestrictions.add(DietaryRestriction.NUT_ALLERGY);

        UserAttributes user = new UserAttributes(
            userCountry,
            userIsEmployee,
            userDietaryRestrictions
        );

        System.out.printf("\n\n RequestParam -> country = %s", country);
        System.out.printf("\n\n UserAttributes = %s", user);

        // Build the GrowthBook context
        Context context = Context
            .builder()
            .featuresJson(featuresRepository.getFeaturesJson())
            .attributesJson(user.toJson())
            .build();
        System.out.printf("\n\n GrowthBook context = %s", context);

        // Initialize the GrowthBook SDK with the context
        GrowthBook growthBook = new GrowthBook(context);

        // Get a value for a feature based on the provided user attributes
        String bannerText = growthBook.getFeatureValue("banner_text", "hello?");

        return bannerText;
    }

    @GetMapping("/meal")
    @ResponseBody
    public ResponseEntity<MealOrder> getMeal(@RequestParam(value = "dietary_restrictions", required = false) ArrayList<String> dietaryRestrictions) {
        System.out.printf("\n\n RequestParam -> dietary_restrictions = %s", dietaryRestrictions);

        ArrayList<DietaryRestriction> userDietaryRestrictions = new ArrayList<>();

        if (dietaryRestrictions == null) {
            dietaryRestrictions = new ArrayList<>();
        }

        dietaryRestrictions.forEach(restrictionString -> {
            DietaryRestriction restriction = DietaryRestriction.fromString(restrictionString);
            if (restriction != null) {
                userDietaryRestrictions.add(restriction);
            }
        });

        String userCountry = null;
        Boolean userIsEmployee = false;

        UserAttributes user = new UserAttributes(
            userCountry,
            userIsEmployee,
            userDietaryRestrictions
        );
        System.out.printf("\n\n UserAttributes = %s", user);

        // Build the GrowthBook context
        Context context = Context
            .builder()
            .featuresJson(featuresRepository.getFeaturesJson())
            .attributesJson(user.toJson())
            .build();

        // Initialize the GrowthBook SDK with the context
        GrowthBook growthBook = new GrowthBook(context);

        // If there is no dessert, the meal has failed to parse from the getFeatureValue() method
        MealOrder mealWithoutDessert = new MealOrder(MealType.STANDARD, null);

        // Get a value for a feature based on the provided user attributes
        MealOrder mealOrder = growthBook.getFeatureValue("meal_overrides_gluten_free", mealWithoutDessert, MealOrder.class);

        return new ResponseEntity<MealOrder>(mealOrder, HttpStatus.OK);
    }
}
