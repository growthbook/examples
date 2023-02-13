package com.growthbook.example.plugins.routing

import com.growthbook.example.plugins.growthbook.AcmeDonutFeaturesRepository
import com.growthbook.example.plugins.growthbook.BasicEncryptedFeaturesRepository
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

/**
 * These routes use both of the created features repositories [AcmeDonutFeaturesRepository] and [BasicEncryptedFeaturesRepository]
 */
fun Routing.multipleGBProjectsRoutes() {
    val acmeDonutFeaturesRepository by inject<AcmeDonutFeaturesRepository>()
    val basicEncryptedFeaturesRepository by inject<BasicEncryptedFeaturesRepository>()
}
