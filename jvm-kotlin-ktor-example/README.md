# Kotlin Ktor example

Example implementation of the GrowthBook Java SDK (https://github.com/growthbook/growthbook-sdk-java) featuring an imaginary donut company, Acme Donuts.

This is an example written in Kotlin using the [Ktor web framework](https://ktor.io/). 

It uses a lot of examples from the [JVM example](https://github.com/growthbook/examples/tree/main/jvm-spring-web). See that project's readme for more details.

- [Running the example](#running-the-example)
- [Endpoints](#endpoints)
  - [GET /acme/features](#get-acmefeatures)
  - [GET /encrypted](#get-encrypted)


## Running the example

Run the development server in the terminal:

    ./gradlew run

Alternatively you can run the `main()` function in `Application.kt` in a Java/Kotlin IDE like IntelliJ CE.

You should see output that includes:

> Server running on http://localhost:8081

The console will include a list of endpoints and some contextual logging.


## Endpoints

### GET /acme/features

Evaluate results from the Acme Donuts project including running inline experiments.

    curl http://localhost:8081/acme/features


### GET /encrypted

Evaluate results from 2 separate GrowthBook projects.

    curl http://localhost:8081/encrypted