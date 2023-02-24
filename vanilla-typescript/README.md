# TypeScript example

Vanilla TypeScript example.

A video demo of this example is available [here](https://github.com/growthbook/examples/pull/28)


## Features

### Typed feature definitions

This project implements the [GrowthBook CLI](https://docs.growthbook.io/tools/cli) to generate types.


## Usage

Install all the dependencies in this project:

    npm install

If you're testing against a local version of `@growthbook/growthbook` you will need to run `npm link` in the SDK directory, and then `npm link @growthbook/growthbook` in this directory.


### Feature setup in the GrowthBook app

Add a new feature with value type `"string"` to the app, e.g. `'banner_text'` and give it the value `"Hello"`. 

Create override rules, e.g. `if "country" == "france" serve "Bonjour"` and `if "country" == "spain" serve "Hola"`.


### API Key setup

Log into the GrowthBook dashboard and create a new API Key on the [API Keys page](https://app.growthbook.io/settings/keys). Copy this API Key secret to your clipboard. This will be refered to as `<API_KEY>` below.

Run the following command:

    npx growthbook auth login --apiKey <API_KEY> --profile vanilla_ts_example

You can also use the shorthand flag `-k` instead of the full flag `--apiKey`.

This will write config to the profile `vanilla_ts_example`.


### Generate types

Run the following command to generate types:

    npx growthbook features generate-types --profile vanilla_ts_example --output ./src/generated-types

This should generate the types to the file `./src/generated-types/app-features.ts`.
