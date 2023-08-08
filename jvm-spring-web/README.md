# JVM example: Acme Donuts

Example implementation of the GrowthBook Java SDK (https://github.com/growthbook/growthbook-sdk-java) featuring an imaginary donut company, Acme Donuts.

The example back-end Java application is for Acme Donuts, an imaginary donut company that has locations in Spain, France and Canada, with plans to expand globally.

Their API services two front-end web apps: 1) a customer facing website; and 2) an employee portal.

It has a features endpoint, that allows the web apps to get information to help with how to display the website theme, and the donut price widget. Acme Donut admins can configure things like the donut price and whether to serve dark mode right from the GrowthBook dashboard.

It also has a welcome banner endpoint that allows Acme Donut admins to customize the welcome text for the banner. This will come in handy when Acme Donuts launches their new location in Bali, Indonesia next month—Acme Donuts staff in Bali can add a condition in the GrowthBook dashboard for the related feature to customize the welcome banner for visitors in Indonesia once they're ready to open.

Before Acme Donuts implemented dark mode, they used to configure theme variables in GrowthBook. Most of these were removed but there's still a legacy `fontColour` that one of the older apps still use. While this value is no longer in the Acme Donuts organization's features on GrowthBook, the Java SDK still queries it and returns the provided fallback value instead to not break the older employee portal.

- [Running the Example](#running-the-example)
- [API Usage](#api-usage)
  - [Welcome Banner](#welcome-banner)
  - [Meal Order](#meal-order)
  - [Acme Donuts Features](#acme-donuts-features)
  - [Features from the GrowthBook API](#features-from-the-growthbook-api)
  - [Encrypted features from the GrowthBook API](#encrypted-features-from-the-growthbook-api)
  - [Dependency Injection example with networking using multiple GrowthBook projects](#dependency-injection-example-with-networking-using-multiple-growthbook-projects)
  - [URL Overrides](#url-overrides)
  - [HandlerInterceptor implementation](#handlerinterceptor-implementation)

## Running the Example

Run the development server in the terminal:

    ./gradlew bootRun

You should see output that includes:

> Server running on http://localhost:8080

The console will also include the parsed features, which can also be found in the `features.json` file.

## API Usage

### Welcome Banner

You can test the implementation of the welcome banner endpoint which will return the banner based on the country.

You will get the following messages based on what country you provide (or the _default_).

| Country   | Text                                     |
| --------- | ---------------------------------------- |
| _default_ | Welcome to Acme Donuts!                  |
| france    | Bienvenue au Beignets Acme !             |
| spain     | ¡Bienvenidos y bienvenidas a Donas Acme! |

You can make an example request with cURL:

```sh
curl http://localhost:8080/welcome-banner?country=:country
```

### Meal Order

Acme Donuts uses a meal order endpoint in their API when planning weekly company lunches.

You can test the implementation of a more complex, Gson serializable and deserializable class instance using the meal order endpoint.

The following request will return the standard meal based on the explicit check for the gluten-free restriction configured in GrowthBook.

```sh
curl http://localhost:8080/meal\?dietary_restrictions\=nut_allergy
```

Response:

```json
{
    "mealType": "STANDARD",
    "dessert": "Strawberry Cheesecake"
}
```

The following request should return the gluten-free meal:

```sh
curl http://localhost:8080/meal\?dietary_restrictions\=gluten_free\&dietary_restrictions\=vegan
```

Response:

```json
{
    "mealType": "GLUTEN_FREE",
    "dessert": "French Vanilla Ice Cream"
}
```

The `MealOrder` class is a Gson serializable and deserializable class with properties of type `String` and `MealType`, an enum that serializes to a string.

### Acme Donuts Features

There's a class `AcmeDonutsFeatures` that captures the features available on the Acme Donuts website.

Acme has an internal portal for employees, and a customer-facing website for everybody. The web app makes a get request to the relevant endpoint depending on if it's serving the employee portal or the customer-facing website.

To get the features for the public-facing website, we can query this endpoint:

```sh
curl http://localhost:8080/acme-features/public
```

This should return the following for the general public:

```json
{
    "darkModeEnabled": false,
    "donutPrice": 2.5,
    "fontColour": null
}
```

The general public sees the regular donut price, and dark mode isn't yet enabled.

To get the features for the employee portal website, we can query this endpoint:

```sh
curl http://localhost:8080/acme-features/employee
```

This should return the following for employees:

```json
{
    "darkModeEnabled": true,
    "donutPrice": 0,
    "fontColour": "DarkSlateBlue"
}
```

Employees get free donuts so they see a donut price of 0. The company is currently beta testing dark mode on the admin portal so it is also enabled for logged in users. Some parts of the employee portal use the legacy `fontColour` so that's still included.

### Features from the GrowthBook API

The endpoint `@GetMapping("/remote") public String frenchBanner()` fetches features from a real GrowthBook endpoint. This should result in French banner text since the user's country is hardcoded to France.

```sh
curl http://localhost:8080/remote
```

This should return the following response:

```
Bienvenue au Beignets Acme !
```

### Encrypted features from the GrowthBook API

The endpoint `@GetMapping("/encrypted")` fetches encrypted features from the GrowthBook endpoint. You can learn more about [encryption for SDK Endpoints in the docs](https://docs.growthbook.io/app/api#encryption).

```sh
curl http://localhost:8080/encrypted?country=:country
```

Based on the country provided as the query parameter `country`, this endpoint will return the following responses:

| Country   | Text    |
| --------- | ------- |
| _default_ | hello   |
| france    | bonjour |
| mexico    | hola    |


### Dependency Injection example with networking using multiple GrowthBook projects

The example in the `MainController` at endpoint `@GetMapping("/di") public String dependencyInjection()` has the following features:

- it implements dependency injection using Spring's `@Autowire`
- it uses 2 separate `GBFeaturesRepository` classes for separate SDK endpoints, which does the networking for you when you call its `initialize()` method. See `AcmeDonutsFeatureService.java` (the same features used in other examples) and `BasicEncryptedFeaturesService.java` (a new project that uses encryption) for details.


```sh
curl http://localhost:8080/di
```

You should get the output `hola - Donut price: 2.5` which are values evaluated from 2 separate projects, 1 encrypted, 1 not.


### URL Overrides

An example for how to override feature values via the URL can be found at the endpoint `@GetMapping("/url-feature-force") public String getForcedFeaturesFromUrl()`.

When running the demo, you can see the following URL's:

- With default values: `http://localhost:8080/url-feature-force`
- With overrides: `http://localhost:8080/url-feature-force?gb~meal_overrides_gluten_free=%7B%22meal_type%22%3A%20%22gf%22%2C%20%22dessert%22%3A%20%22French%20Vanilla%20Ice%20Cream%22%7D&gb~dark_mode=true&gb~donut_price=3.33&gb~banner_text=Hello%2C%20everyone!%20I%20hope%20you%20are%20all%20doing%20well!`


### HandlerInterceptor implementation

The example at the following path shows an example of using `org.springframework.web.servlet.HandlerInterceptor` to handle the request before it reaches the route handler, allowing us to fetch the features from the `GBFeaturesRepository` and instantiate a new `GrowthBook` instance for the request.

```sh
curl http://localhost:8080/interceptors
```

Areas to look at:

- See the `GrowthBookSDKInterceptor.java` file. This is where we create a new `GrowthBook` instance with the features from the `GBFeaturesRepository`.
- See the `AppConfig.java` file. This implements `WebMvcConfigurer` which has an override method that allows us to add interceptors. This also injects the singleton repository into the `GrowthBookSDKInterceptor`.
- See the handler `usingInterceptors(HttpServletRequest request)` in `MainController.java`. This gets the GrowthBook SDK instance we set in the interceptor.

