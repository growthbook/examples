package main

import (
	"context"
	"fmt"

	"github.com/growthbook/growthbook-golang"
	"github.com/hashicorp/golang-lru/v2"
)

// Implement the experiment tracking interface. This allows for
// passing through a Go Context and additional information to the
// tracking callback.

type tracker struct{}

func (t tracker) Track(ctx context.Context, c *growthbook.Client,
	experiment *growthbook.Experiment, result *growthbook.Result,
	extraData interface{}) {
	user := extraData.(string)
	fmt.Printf("Experiment Viewed: %s - Variation index: %d - Value: %s - User: %s\n",
		experiment.Key, result.VariationID, result.Value, user)
}

// Implement an LRU cache for experiment tracking.

type trackingCache struct {
	cache *lru.Cache[string, struct{}]
}

func newTrackingCache(size int) *trackingCache {
	lru, _ := lru.New[string, struct{}](size)
	return &trackingCache{lru}
}

func (c *trackingCache) Clear() {
	c.cache.Purge()
}

func (c *trackingCache) Check(ctx context.Context, client *growthbook.Client,
	exp *growthbook.Experiment, result *growthbook.Result, extraData interface{}) bool {
	key := fmt.Sprintf("%s%v%s%d", result.HashAttribute, result.HashValue,
		exp.Key, result.VariationID)
	exists, evicted := c.cache.ContainsOrAdd(key, struct{}{})
	if evicted {
		fmt.Println("CACHE EVICTION")
	}
	return !exists
}
