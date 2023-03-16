# Go example

## Dependencies

- `go version go1.20`


## Features

### GET /acme

The endpoint `GET /acme` returns values evaluated against the SDK including:

- fetching features from a GrowthBook features endpoint
- checking if a feature is on
- checking the value of a feature
- running an inline experiment
    - getting the value of an inline experiment
    - firing a tracking callback for an inline experiment

You'd run the app and then visit the endpoint at http://localhost:8070

Run the server from the command line with the following command:

    go run github.com/growthbook/examples/go-example/main