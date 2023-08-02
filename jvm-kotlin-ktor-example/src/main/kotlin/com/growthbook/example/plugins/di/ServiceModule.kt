package com.growthbook.example.plugins.di

import com.growthbook.example.plugins.growthbook.AcmeDonutFeaturesRepository
import com.growthbook.example.plugins.growthbook.BasicEncryptedFeaturesRepository
import org.koin.dsl.koinApplication
import org.koin.dsl.module

/**
 * This service module has 2 separate [growthbook.sdk.java.GBFeaturesRepository] configured
 */
val serviceModule = module {
    single<AcmeDonutFeaturesRepository> {
        AcmeDonutFeaturesRepository(
            apiHost = "https://cdn.growthbook.io",
            clientKey = "sdk-pGmC6LrsiUoEUcpZ",
            ttlSeconds = 10,
        ).apply {
            onFeaturesRefresh {
                logger.info("🔵 AcmeDonutFeaturesRepository -> Features have been refreshed \n $it")
            }
        }
    }

    single<BasicEncryptedFeaturesRepository> {
        BasicEncryptedFeaturesRepository(
            apiHost = "https://cdn.growthbook.io",
            clientKey = "sdk-862b5mHcP9XPugqD",
            encryptionKey = "BhB1wORFmZLTDjbvstvS8w==",
            ttlSeconds = 15
        ).apply {
            onFeaturesRefresh {
                logger.info("🔵 BasicEncryptedFeaturesService -> Features have been refreshed \n $it")
            }
        }
    }
}
