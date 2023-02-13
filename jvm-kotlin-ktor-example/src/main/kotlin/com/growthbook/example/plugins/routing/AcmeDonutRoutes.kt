package com.growthbook.example.plugins.routing

import com.growthbook.example.models.AcmeDonutsFeatures
import com.growthbook.example.models.User
import com.growthbook.example.plugins.growthbook.AcmeDonutFeaturesRepository
import growthbook.sdk.java.GBContext
import growthbook.sdk.java.GrowthBook
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Routing.acmeRoutes() {
    val acmeDonutFeaturesRepository by inject<AcmeDonutFeaturesRepository>()

    get("/acme/features") {
        val user = User(
            id = "user-employee-123456789",
            country = "france",
            isEmployee = true,
            isLoggedIn = true,
        )

        val context = GBContext
            .builder()
            .featuresJson(acmeDonutFeaturesRepository.featuresJson)
            .attributesJson(user.toJson())
            .build()

        val growthBook = GrowthBook(context)

        // Evaluated feature values
        val darkModeEnabled = growthBook.getFeatureValue("dark_mode", false)
        val donutPrice = growthBook.getFeatureValue("donut_price", 9999f)
        val bannerText = growthBook.getFeatureValue("banner_text", "(unknown text)")

        val features = AcmeDonutsFeatures(
            darkModeEnabled = darkModeEnabled,
            donutPrice = donutPrice,
            bannerText = bannerText,
        )

        call.respond(features)
    }
}
