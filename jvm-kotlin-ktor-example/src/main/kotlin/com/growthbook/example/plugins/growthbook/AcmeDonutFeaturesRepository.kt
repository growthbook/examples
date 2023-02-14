package com.growthbook.example.plugins.growthbook

import growthbook.sdk.java.GBFeaturesRepository

class AcmeDonutFeaturesRepository(
    endpoint: String,
    encryptionKey: String? = null,
    ttlSeconds: Int
) : GBFeaturesRepository(endpoint, encryptionKey, ttlSeconds)
