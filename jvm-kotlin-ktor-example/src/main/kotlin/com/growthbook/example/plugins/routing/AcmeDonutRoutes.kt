package com.growthbook.example.plugins.routing

import com.growthbook.example.models.AcmeDonutsFeatures
import com.growthbook.example.plugins.environment.appEnv
import com.growthbook.example.plugins.growthbook.AcmeDonutFeaturesRepository
import com.growthbook.example.plugins.growthbook.MockUserData
import growthbook.sdk.java.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Routing.acmeRoutes() {
    val acmeDonutFeaturesRepository by inject<AcmeDonutFeaturesRepository>()

    application.log.info("🔗 Features, inline experiment: http://0.0.0.0:${application.appEnv.port}/acme/features")

    get("/acme/features") {
        // Toggle between different users to see different results
        val user = MockUserData.employeeUser
//        val user = MockUserData.standardUser

        val context = GBContext
            .builder()
            .featuresJson(acmeDonutFeaturesRepository.featuresJson)
            .attributesJson(user.toJson())
            .trackingCallback(object : TrackingCallback {
                override fun <ValueType : Any?> onTrack(
                    experiment: Experiment<ValueType>?,
                    experimentResult: ExperimentResult<ValueType>?
                ) {
                    application.log.info("🔵 trackingCallback called with: \n experiment: $experiment \n result: $experimentResult")
                }
            })
            .build()

        val growthBook = GrowthBook(context).apply {
            subscribe { experimentResult ->
                application.log.info("🔵 ExperimentRunCallback called with results: \n $experimentResult")
            }
        }

        // Feature evaluation
        val featureResult: FeatureResult<Boolean>? = growthBook.evalFeature("dark_mode", Boolean::class.java)
        val darkModeEnabled = featureResult?.isOn ?: false

        // Run an inline experiment
        val fontColourExperiment = Experiment.builder<String>()
            .key("font_colour")
            .variations(arrayListOf("red", "orange", "yellow", "green", "blue", "purple"))
            .build()
        val fontColourExperimentResult = growthBook.run(fontColourExperiment)
        val fontColour = fontColourExperimentResult.value ?: "grey"

        // Evaluated feature values
        val donutPrice = growthBook.getFeatureValue("donut_price", 9999f)
        val bannerText = growthBook.getFeatureValue("banner_text", "(unknown text)")

        val features = AcmeDonutsFeatures(
            darkModeEnabled = darkModeEnabled,
            donutPrice = donutPrice,
            bannerText = bannerText,
            fontColour = fontColour
        )

        call.respond(features)
    }
}
