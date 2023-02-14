package com.growthbook.example.plugins.environment

import io.ktor.server.application.*

/**
 * Abastraction for type-safe environment variable access
 */
data class Environment(
    val port: Int
)

val Application.appEnv: Environment
    get() {
        val port = environment.config.property("ktor.deployment.port").getString().toInt()

        return Environment(
            port = port
        )
    }
