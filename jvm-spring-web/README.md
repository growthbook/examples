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
