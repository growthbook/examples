package com.growthbook.example.plugins.growthbook

import growthbook.sdk.java.GBFeaturesRepository

class BasicEncryptedFeaturesRepository(
    endpoint: String,
    encryptionKey: String,
    ttlSeconds: Int
) : GBFeaturesRepository(endpoint, encryptionKey, ttlSeconds)
