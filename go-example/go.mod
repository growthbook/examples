module github.com/growthbook/examples/go-example/main

go 1.20

require (
	github.com/growthbook/growthbook-golang v0.2.0
	golang.org/x/exp v0.0.0-20230801115018-d63ba01acd4b
)

require (
	github.com/barkimedes/go-deepcopy v0.0.0-20220514131651-17c30cfc62df // indirect
	github.com/r3labs/sse/v2 v2.10.0 // indirect
	golang.org/x/net v0.0.0-20191116160921-f9c825593386 // indirect
	gopkg.in/cenkalti/backoff.v1 v1.1.0 // indirect
)

replace github.com/growthbook/growthbook-golang => ../../growthbook-golang
