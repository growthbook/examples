package com.growthbook.example.plugins.growthbook

import growthbook.sdk.java.FeatureRefreshStrategy
import growthbook.sdk.java.GBFeaturesRepository

class AcmeDonutFeaturesRepository(
    apiHost: String,
    clientKey: String,
    encryptionKey: String? = null,
    ttlSeconds: Int
) : GBFeaturesRepository(apiHost, clientKey, encryptionKey, FeatureRefreshStrategy.STALE_WHILE_REVALIDATE, ttlSeconds)
