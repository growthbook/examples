package com.growthbook.example.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
data class User(
    val id: String,
    val country: String,

    @SerialName("employee")
    val isEmployee: Boolean,

    @SerialName("loggedIn")
    val isLoggedIn: Boolean
) {
    fun toJson(): String = Json.encodeToString(this)

    companion object {
        fun fromJson(input: String): User = Json.decodeFromString(input)
    }
}
