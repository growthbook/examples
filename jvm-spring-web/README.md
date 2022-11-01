# JVM example

Example implementation of the GrowthBook Java SDK: https://github.com/growthbook/growthbook-sdk-java

- [Running the Example](#running-the-example)
- [Features](#features)
  - [Welcome Banner](#welcome-banner)
  - [Meal Order](#meal-order)

## Running the Example

Run the development server in the terminal:

    ./gradlew bootRun

You should see output that includes:

> Server running on http://localhost:8080

## Features

### Welcome Banner

You can test the implementation of the welcome banner endpoint which will return the banner based on the country.

You will get the following messages based on what country you provide (or the *default*).

| Country   | Text                                    |
| --------- | --------------------------------------- |
| _default_ | Welcome to the Java SDK!                |
| france    | Bienvenue au SDK Java !                 |
| spain     | ¡Bienvenidos y bienvenidas al SDK Java! |

You can make an example request with cURL:

```sh
curl http://localhost:8080/welcome-banner?country=:country
```

### Meal Order

You can test the implementation of a more complex, Gson serializable and deserializable class instance using the meal order endpoint.

The following request will return the standard meal based on the explicit check for the gluten-free restriction configured in GrowthBook.

```sh
curl http://localhost:8080/meal\?dietary_restrictions\=nut_allergy\&dietary_restrictions\=vegan
```

The following request should return the gluten-free meal:

```sh
curl http://localhost:8080/meal\?dietary_restrictions\=gluten_free\&dietary_restrictions\=vegan
```