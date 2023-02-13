package com.growthbook.example.plugins.growthbook

import io.ktor.server.application.*
import org.koin.ktor.ext.inject

fun Application.configureGrowthBook() {
    val acmeDonutFeaturesRepository by inject<AcmeDonutFeaturesRepository>()
    val basicEncryptedFeaturesRepository by inject<BasicEncryptedFeaturesRepository>()

    acmeDonutFeaturesRepository.initialize()
    basicEncryptedFeaturesRepository.initialize()
}
