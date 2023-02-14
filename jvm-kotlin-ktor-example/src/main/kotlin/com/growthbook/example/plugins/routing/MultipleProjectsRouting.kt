package com.growthbook.example.plugins.routing

import com.growthbook.example.models.AcmeDonutsFeatures
import com.growthbook.example.models.MixedResponse
import com.growthbook.example.plugins.environment.appEnv
import com.growthbook.example.plugins.growthbook.AcmeDonutFeaturesRepository
import com.growthbook.example.plugins.growthbook.BasicEncryptedFeaturesRepository
import com.growthbook.example.plugins.growthbook.MockUserData
import growthbook.sdk.java.GBContext
import growthbook.sdk.java.GrowthBook
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

    println("🔗 Multiple projects, encrypted SDK endpoint: http://0.0.0.0:${application.appEnv.port}/encrypted")

    get("/encrypted") {
        // Toggle between different users to see different results
//        val user = MockUserData.employeeUser
        val user = MockUserData.standardUser

        // Evaluate features for the Acme Donut project
        val gbContext1 = GBContext
            .builder()
            .featuresJson(acmeDonutFeaturesRepository.featuresJson)
            .attributesJson(user.toJson())
            .build()
        val growthBook1 = GrowthBook(gbContext1)

        val donutPrice = growthBook1.getFeatureValue("donut_price", 9999f)
        val bannerText = growthBook1.getFeatureValue("banner_text", "(unknown text)")
        val darkModeEnabled = growthBook1.getFeatureValue("dark_mode", false)

        val acmeFeatures = AcmeDonutsFeatures(
            darkModeEnabled = darkModeEnabled,
            donutPrice = donutPrice,
            bannerText = bannerText,
        )

        // Evaluate features for the encrypted project
        val gbContext2 = GBContext
            .builder()
            .featuresJson(basicEncryptedFeaturesRepository.featuresJson)
            .attributesJson(user.toJson())
            .build()
        val growthBook2 = GrowthBook(gbContext2)

        val greeting = growthBook2.getFeatureValue("greeting", "???")

        val response = MixedResponse(
            acmeFeatures = acmeFeatures,
            greeting = greeting
        )

        call.respond(response)
    }
}
