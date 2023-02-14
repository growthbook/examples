package com.growthbook.example.plugins.di

import io.ktor.server.application.*
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger

/**
 * Configure dependency injection / service locator using Koin
 */
fun Application.configureDI() {
    install(Koin) {
        slf4jLogger()
        modules(serviceModule)
    }
}
