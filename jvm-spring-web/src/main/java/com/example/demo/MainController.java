package com.example.demo;

import com.example.demo.models.*;
import growthbook.sdk.java.GrowthBook;
import growthbook.sdk.java.models.Context;
import growthbook.sdk.java.models.FeatureResult;
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
        String userId = null;
        String userCountry = country;
        Boolean userIsEmployee = false;
        Boolean userIsLoggedIn = true;

        ArrayList<DietaryRestriction> userDietaryRestrictions = new ArrayList<>();
        userDietaryRestrictions.add(DietaryRestriction.NUT_ALLERGY);

        UserAttributes user = new UserAttributes(
            userId,
            userCountry,
            userIsEmployee,
            userIsLoggedIn,
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

        String userId = null;
        String userCountry = null;
        Boolean userIsEmployee = false;
        Boolean userIsLoggedIn = true;

        UserAttributes user = new UserAttributes(
            userId,
            userCountry,
            userIsEmployee,
            userIsLoggedIn,
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

    @GetMapping("/acme-features/public")
    @ResponseBody
    public ResponseEntity<AcmeDonutsFeatures> getAcmeDonutFeaturesForThePublic() {
        String userId = null;
        String userCountry = null;
        Boolean userIsEmployee = false;
        Boolean userIsLoggedIn = false;
        ArrayList<DietaryRestriction> userDietaryRestrictions = new ArrayList<>();

        UserAttributes user = new UserAttributes(
            userId,
            userCountry,
            userIsEmployee,
            userIsLoggedIn,
            userDietaryRestrictions
        );

        // Build the GrowthBook context
        Context context = Context
            .builder()
            .featuresJson(featuresRepository.getFeaturesJson())
            .attributesJson(user.toJson())
            .build();

        // Initialize the GrowthBook SDK with the context
        GrowthBook growthBook = new GrowthBook(context);

        // in the event of an unexpected error, the donut would be priced at $99
        Float donutPrice = growthBook.getFeatureValue("donut_price", 99.0f);
        FeatureResult<Boolean> darkModeFeature = growthBook.evalFeature("dark_mode");
        System.out.printf("Dark mode %s", darkModeFeature);
        String fontColour = null; // The new public facing website doesn't use this value anymore

        AcmeDonutsFeatures acmeDonutsFeatures = new AcmeDonutsFeatures(darkModeFeature.isOn(), donutPrice, fontColour);

        return new ResponseEntity<>(acmeDonutsFeatures, HttpStatus.OK);
    }

    @GetMapping("/acme-features/employee")
    @ResponseBody
    public ResponseEntity<AcmeDonutsFeatures> getAcmeDonutFeaturesForTheEmployeePortal() {
        String userCountry = "donutlandia";
        ArrayList<DietaryRestriction> userDietaryRestrictions = new ArrayList<>();

        // A real app would have some kind of logic, but for this example, we assume all requests to this endpoint are from logged in employees.
        Boolean userIsEmployee = true;
        Boolean userIsLoggedIn = true;
        String userId = "user-employee-123456789";

        UserAttributes user = new UserAttributes(
            userId,
            userCountry,
            userIsEmployee,
            userIsLoggedIn,
            userDietaryRestrictions
        );

        // Build the GrowthBook context
        Context context = Context
            .builder()
            .featuresJson(featuresRepository.getFeaturesJson())
            .attributesJson(user.toJson())
            .build();

        // Initialize the GrowthBook SDK with the context
        GrowthBook growthBook = new GrowthBook(context);

        // in the event of an unexpected error, the donut would be priced at $99
        Float donutPrice = growthBook.getFeatureValue("donut_price", 99.0f);
        FeatureResult<Boolean> darkModeFeature = growthBook.evalFeature("dark_mode");

        // This is an example of a deprecated feature. This feature was deleted from the GrowthBook dashboard
        // but some features in the old legacy employee portal still depend on it, so it'll fall back to the provided default value
        String fontColour = growthBook.getFeatureValue("font_colour", "DarkSlateBlue");

        AcmeDonutsFeatures acmeDonutsFeatures = new AcmeDonutsFeatures(darkModeFeature.isOn(), donutPrice, fontColour);

        return new ResponseEntity<>(acmeDonutsFeatures, HttpStatus.OK);
    }
}
