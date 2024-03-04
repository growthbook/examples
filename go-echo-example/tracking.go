package main

import (
	"context"
	"fmt"
	"sync"

	"github.com/growthbook/growthbook-golang"
	lru "github.com/hashicorp/golang-lru/v2"
)

// Implement the experiment tracking interface. This allows for
// passing through a Go Context and additional information to the
// tracking callback.

type tracker struct{}

func (t tracker) Track(ctx context.Context, c *growthbook.Client,
	experiment *growthbook.Experiment, result *growthbook.Result,
	extraData any) {
	user := extraData.(string)
	fmt.Printf("Experiment Viewed: %s - Variation index: %d - Value: %s - User: %s\n",
		experiment.Key, result.VariationID, result.Value, user)
}

// Implement an LRU cache for experiment tracking.

type trackingCache struct {
	sync.Mutex
	cache   *lru.Cache[string, struct{}]
	tracker growthbook.ExperimentTracker
}

func newTrackingCache(size int, tracker growthbook.ExperimentTracker) *trackingCache {
	lru, _ := lru.New[string, struct{}](size)
	return &trackingCache{cache: lru, tracker: tracker}
}

func (c *trackingCache) Clear() {
	c.cache.Purge()
}

func (c *trackingCache) Track(ctx context.Context, client *growthbook.Client,
	exp *growthbook.Experiment, result *growthbook.Result, extraData any) {
	key := fmt.Sprintf("%s%v%s%d", result.HashAttribute, result.HashValue,
		exp.Key, result.VariationID)
	exists, evicted := c.cache.ContainsOrAdd(key, struct{}{})
	if evicted {
		fmt.Println("CACHE EVICTION")
	}
	if !exists {
		c.tracker.Track(ctx, client, exp, result, extraData)
	}
}
