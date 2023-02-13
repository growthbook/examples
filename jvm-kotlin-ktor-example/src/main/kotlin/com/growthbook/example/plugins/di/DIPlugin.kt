package com.growthbook.example.plugins.di

import io.ktor.server.application.*
import org.koin.ktor.plugin.Koin

/**
 * Configure dependency injection / service locator using Koin
 */
fun Application.configureDI() {
    install(Koin) {
        modules(serviceModule)
    }
}
