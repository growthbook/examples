package com.growthbook.example.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class MixedResponse(
    @SerialName("acme_features")
    val acmeFeatures: AcmeDonutsFeatures,

    @SerialName("greeting")
    val greeting: String,
)
