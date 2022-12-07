# Acme Donuts

Example project in Ruby on Rails implementing the [GrowthBook Ruby SDK](https://docs.growthbook.io/lib/ruby).

The project uses SQLite for simplicity.

## Dependencies

Install the dependencies:

    bundle install

## Development Server

Run the migrations:

    bundle exec rails db:migrate

This will create sample users in the database.

Run the development server:

    bundle exec rails serve -p 3333

This will run the dev server at: http://127.0.0.1:3333

You can access the REPL and models:

    bundle exec rails console

## Usage

You can make requests to any of the endpoints as any of the below users.

Include the `access_token` as the `Authorization: Bearer {token}` header.

| id  | email                         | access_token           |
| --- | ----------------------------- | ---------------------- |
| 1   | `tina@growthbook.io`          | `user_tina_abc123`     |
| 2   | `employee@acme.growthbook.io` | `employee_acme_xyz987` |

Here's an example request as an employee of Acme:

```sh
curl --header "Authorization: Bearer employee_acme_xyz987" http://localhost:3333/user
```

You should see the following response:

```json
{
  "growthbook_user_attributes": {
    "id": "user-employee-123456789",
    "country": "spain",
    "email": "employee@acme.growthbook.io",
    "employee": true,
    "loggedIn": true
  }
}
```

Here's an example request as a non-employee of Acme:

```sh
curl --header "Authorization: Bearer user_tina_abc123" http://localhost:3333/user
```

You should see the following response:

```json
{
  "growthbook_user_attributes": {
    "id": "user-abc123",
    "country": "france",
    "email": "tina@growthbook.io",
    "employee": false,
    "loggedIn": true
  }
}
```

You should get an error if you make any request without a token, e.g.:

```sh
curl -v http://localhost:3333/user
```

## Features

Make a request to the features endpoint to evaluate features for a given user.

Here's an example request as an employee of Acme:

```sh
curl --header "Authorization: Bearer employee_acme_xyz987" http://localhost:3333/features
```

You should see the following response:

```json
{
  "banner_text": "¡Bienvenidos y bienvenidas a Donas Acme!",
  "use_dark_mode": true,
  "donut_price": 0
}
```

Here's an example request as a non-employee of Acme:

```sh
curl --header "Authorization: Bearer user_tina_abc123" http://localhost:3333/features
```

You should see the following response:

```json
{
  "banner_text": "Bienvenue au Beignets Acme !",
  "use_dark_mode": true,
  "donut_price": 2.5
}
```


## Navigating the code

The `ApplicationController` implements authentication as well as initializing the GrowthBook SDK for the authenticated user.

See the `growthbook_sdk` controller concern for implementation details.

The `UserController` has one method that returns the user attributes that are assigned to the GrowthBook SDK.

The view layer uses [blueprinter](https://github.com/procore/blueprinter) to serialize models into JSON but you can use [active_model_serializers](https://github.com/rails-api/active_model_serializers), [jbuilder](https://github.com/rails/jbuilder), or any other way of creating JSON for the GrowthBook attributes.