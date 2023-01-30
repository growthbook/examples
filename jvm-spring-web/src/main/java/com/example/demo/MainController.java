package com.example.demo;

import com.example.demo.models.*;
import growthbook.sdk.java.FeatureResult;
import growthbook.sdk.java.GBContext;
import growthbook.sdk.java.GrowthBook;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;

@RestController
public class MainController {
    FeaturesRepository featuresRepository = new FeaturesRepository();

    @GetMapping("/encrypted")
    public String encryptedGreeting(
        @RequestParam(value = "country", required = false) String country
    ) throws URISyntaxException, IOException, InterruptedException {
        // Fetch feature definitions from the GrowthBook API
        // These features are configured as encrypted
        URI featuresEndpoint = new URI("https://cdn.growthbook.io/api/features/sdk-862b5mHcP9XPugqD");
        HttpRequest request = HttpRequest.newBuilder().uri(featuresEndpoint).GET().build();
        HttpResponse<String> response = HttpClient.newBuilder()
            .build()
            .send(request, HttpResponse.BodyHandlers.ofString());
        String encryptedFeaturesJson = new JSONObject(response.body()).get("encryptedFeatures").toString();

        // You can store your encryption key as an environment variable rather than hardcoding in plain text in your codebase
        String encryptionKey = "BhB1wORFmZLTDjbvstvS8w==";

        // Get user attributes as a JSON string
        JSONObject userAttributesObj = new JSONObject();
        userAttributesObj.put("id", "user-abc123");
        // You wouldn't normally provide user attributes as a query param, this is for demonstration purposes
        userAttributesObj.put("country", country);

        // Initialize the GrowthBook SDK with the context
        GBContext context = GBContext
            .builder()
            .featuresJson(encryptedFeaturesJson)
            .encryptionKey(encryptionKey)
            .attributesJson(userAttributesObj.toString())
            .build();
        GrowthBook growthBook = new GrowthBook(context);

        // We should never get the fallback text unless the configuration of the GrowthBook feature changes and "greeting" is no longer available
        String greeting = growthBook.getFeatureValue("greeting", "ERROR with getting the greeting");

        return greeting;
    }

    @GetMapping("/remote")
    public String frenchBanner() throws URISyntaxException, IOException, InterruptedException {
        // Fetch feature definitions from GrowthBook API
        // We recommend adding a caching layer in production
        URI featuresEndpoint = new URI("https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8");
        HttpRequest request = HttpRequest.newBuilder().uri(featuresEndpoint).GET().build();
        HttpResponse<String> response = HttpClient.newBuilder()
            .build()
            .send(request, HttpResponse.BodyHandlers.ofString());
        String featuresJson = new JSONObject(response.body()).get("features").toString();

        // Get user attributes as a JSON string
        JSONObject userAttributesObj = new JSONObject();
        userAttributesObj.put("id", "user-abc123");
        userAttributesObj.put("company", "company-abc123");
        userAttributesObj.put("loggedIn", false);
        userAttributesObj.put("employee", false);
        userAttributesObj.put("country", "france");
        userAttributesObj.put("deviceId", "device-123456");
        userAttributesObj.put("loggedIn", true);
        userAttributesObj.put("employee", true);
        userAttributesObj.put("browser", "<some-browser>");
        userAttributesObj.put("url", "<some-page-url>");

        // Initialize the GrowthBook SDK with the context
        GBContext context = GBContext
            .builder()
            .featuresJson(featuresJson)
            .attributesJson(userAttributesObj.toString())
            .build();
        GrowthBook growthBook = new GrowthBook(context);

        // Value for a feature
        String bannerText = growthBook.getFeatureValue("banner_text", "(unknown text)");

        return bannerText;
    }

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
        GBContext context = GBContext
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
        GBContext context = GBContext
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
        GBContext context = GBContext
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
        GBContext context = GBContext
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
