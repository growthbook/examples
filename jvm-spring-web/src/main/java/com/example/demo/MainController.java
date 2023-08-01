package com.example.demo;

import com.example.demo.models.*;
import com.example.demo.services.AcmeDonutsFeatureService;
import com.example.demo.services.BasicEncryptedFeaturesService;
import com.example.demo.services.RealTimeSSEFeaturesService;
import growthbook.sdk.java.FeatureResult;
import growthbook.sdk.java.GBContext;
import growthbook.sdk.java.GrowthBook;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
public class MainController {

    /**
     * Each of these autowired dependencies is using the {@link growthbook.sdk.java.GBFeaturesRepository} class.
     */
    @Autowired
    BasicEncryptedFeaturesService basicEncryptedFeaturesService;

    @Autowired
    AcmeDonutsFeatureService acmeDonutsFeatureService;

    @Autowired
    RealTimeSSEFeaturesService realTimeSSEFeaturesService;

    // If you are managing the fetching of your own features, this class is doing that.
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
        FeatureResult<Boolean> darkModeFeature = growthBook.evalFeature("dark_mode", Boolean.class);
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
        FeatureResult<Boolean> darkModeFeature = growthBook.evalFeature("dark_mode", Boolean.class);

        // This is an example of a deprecated feature. This feature was deleted from the GrowthBook dashboard
        // but some features in the old legacy employee portal still depend on it, so it'll fall back to the provided default value
        String fontColour = growthBook.getFeatureValue("font_colour", "DarkSlateBlue");

        AcmeDonutsFeatures acmeDonutsFeatures = new AcmeDonutsFeatures(darkModeFeature.isOn(), donutPrice, fontColour);

        return new ResponseEntity<>(acmeDonutsFeatures, HttpStatus.OK);
    }

    @GetMapping("/di")
    public String dependencyInjection() {
        // A real app would get user attributes from a DB
        UserAttributes user = new UserAttributes("user-abc123", "mexico", false, false, new ArrayList<>());
        String userAttributesJson = user.toJson();

        // Project 1: Features from the Acme donut project, unencrypted
        GBContext project1GBContext = GBContext.builder()
            .featuresJson(acmeDonutsFeatureService.getFeaturesJson())
            .attributesJson(userAttributesJson)
            .build();
        GrowthBook project1growthBook = new GrowthBook(project1GBContext);
        Float donutPrice = project1growthBook.getFeatureValue("donut_price", 9999f);

        // Project 2: Features from another basic project, encrypted
        GBContext project2GBContext = GBContext.builder()
            .featuresJson(basicEncryptedFeaturesService.getFeaturesJson())
            .attributesJson(userAttributesJson)
            .build();
        GrowthBook project2growthBook = new GrowthBook(project2GBContext);
        String greeting = project2growthBook.getFeatureValue("greeting", "unknown");

        // Return a string with the greeting from one project and the donut price from another
        return String.format("%s - Donut price: %s", greeting, donutPrice);
    }

    @GetMapping("/version")
    public String appVersion() {
        GBContext context = GBContext.builder()
            .featuresJson(acmeDonutsFeatureService.getFeaturesJson())
            .attributesJson("{\"version\": \"2.1.0\"}")
            .build();

        GrowthBook growthBook = new GrowthBook(context);

        return growthBook.getFeatureValue("app_name", "unknown app version");
    }

    @GetMapping("/url-feature-force")
    public String getForcedFeaturesFromUrl(HttpServletRequest request) {
        // Defaults: http://localhost:8080/url-feature-force
        // With overrides: http://localhost:8080/url-feature-force?gb~meal_overrides_gluten_free=%7B%22meal_type%22%3A%20%22gf%22%2C%20%22dessert%22%3A%20%22French%20Vanilla%20Ice%20Cream%22%7D&gb~dark_mode=true&gb~donut_price=3.33&gb~banner_text=Hello%2C%20everyone!%20I%20hope%20you%20are%20all%20doing%20well!

        // Get current URL from Spring
        String uriString = UriComponentsBuilder
            .fromHttpRequest(new ServletServerHttpRequest(request))
            .build()
            .toUriString();

        // A real app would get user attributes from a DB
        UserAttributes user = new UserAttributes("user-abc123", "mexico", false, false, new ArrayList<>());
        String userAttributesJson = user.toJson();

        // Init the GBContext with a URL and configure allowUrlOverrides = true
        GBContext context = GBContext.builder()
            .featuresJson(acmeDonutsFeatureService.getFeaturesJson())
            .attributesJson(userAttributesJson)
            .url(uriString)
            .allowUrlOverrides(true)
            .build();

        GrowthBook growthBook = new GrowthBook(context);

        String response = "";

        // Override string value
        String bannerText = growthBook.getFeatureValue("banner_text", "???");
        response += String.format("Banner Text: %s \n", bannerText);

        // Override float value
        Float donutPrice = growthBook.getFeatureValue("donut_price", 999f);
        response += String.format("Donut Price: %f \n",donutPrice);

        // Override Gson-deserializable class
        MealOrder standardMealOrder = new MealOrder(MealType.STANDARD, "Pie");
        MealOrder mealOrder = growthBook.getFeatureValue("meal_overrides_gluten_free", standardMealOrder, MealOrder.class);
        response += String.format("Meal Order Dessert: %s \n\n", mealOrder.getDessert());

        return response;
    }

    /**
     * Example that uses a {@link org.springframework.web.servlet.HandlerInterceptor}.
     * See {@link GrowthBookSDKInterceptor} and {@link AppConfig}
     * @param request The request
     * @return A hashmap response
     */
    @GetMapping("/interceptors")
    public ResponseEntity<HashMap<String, Object>> usingInterceptors(HttpServletRequest request) {
        // Get the GrowthBook instance created on the request
        GrowthBook growthBook = (GrowthBook) request.getAttribute("growthbook");

        // Evaluate features in GrowthBook
        Float donutPrice = growthBook.getFeatureValue("donut_price", 999f);
        String bannerText = growthBook.getFeatureValue("banner_text", "(unknown text)");

        HashMap<String, Object> res = new HashMap<>();
        res.put("donut_price", donutPrice);
        res.put("banner_text", bannerText);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/sse")
    public ResponseEntity<HashMap<String, Object>> evalFeaturesFromSSE() {
        // prepare response object
        HashMap<String, Object> res = new HashMap<>();

        // create GrowthBook instance with features from real-time SSE features service
        GBContext context = GBContext.builder()
            .featuresJson(realTimeSSEFeaturesService.getFeaturesJson())
            .attributesJson("{\"version\": \"2.1.0\"}")
            .build();
        GrowthBook growthBook = new GrowthBook(context);

        // get values
        String appVersion = growthBook.getFeatureValue("app_name", "unknown app version");
        String greeting = growthBook.getFeatureValue("greeting", "???");

        // add values to response
        res.put("app_version", appVersion);
        res.put("greeting", greeting);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
