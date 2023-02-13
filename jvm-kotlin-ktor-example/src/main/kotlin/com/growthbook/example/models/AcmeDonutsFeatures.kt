package com.growthbook.example.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class AcmeDonutsFeatures(
    @SerialName("dark_mode_enabled")
    val darkModeEnabled: Boolean,

    @SerialName("donut_price")
    val donutPrice: Float,

    @SerialName("banner_text")
    val bannerText: String,
)
