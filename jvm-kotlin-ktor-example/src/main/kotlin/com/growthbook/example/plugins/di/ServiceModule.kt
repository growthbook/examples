package com.growthbook.example.plugins.di

import com.growthbook.example.plugins.growthbook.AcmeDonutFeaturesRepository
import com.growthbook.example.plugins.growthbook.BasicEncryptedFeaturesRepository
import org.koin.dsl.module

/**
 * This service module has 2 separate [growthbook.sdk.java.GBFeaturesRepository] configured
 */
val serviceModule = module {
    single<AcmeDonutFeaturesRepository> {
        AcmeDonutFeaturesRepository(
            endpoint = "https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8",
            ttlSeconds = 10,
        )
    }

    single<BasicEncryptedFeaturesRepository> {
        BasicEncryptedFeaturesRepository(
            endpoint = "https://cdn.growthbook.io/api/features/sdk-862b5mHcP9XPugqD",
            encryptionKey = "BhB1wORFmZLTDjbvstvS8w==",
            ttlSeconds = 15
        )
    }
}
