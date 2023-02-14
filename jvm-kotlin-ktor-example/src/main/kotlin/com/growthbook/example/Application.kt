package com.growthbook.example

import com.growthbook.example.plugins.configureHTTP
import com.growthbook.example.plugins.configureMonitoring
import com.growthbook.example.plugins.configureSerialization
import com.growthbook.example.plugins.di.configureDI
import com.growthbook.example.plugins.growthbook.configureGrowthBook
import com.growthbook.example.plugins.routing.configureRouting
import io.ktor.server.application.*

fun main(args: Array<String>): Unit =
    io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // application.conf references the main function. This annotation prevents the IDE from marking it as unused.
fun Application.module() {
    configureDI()

    // Add routes
    configureRouting()

    // Initialize the GrowthBook feature repositories
    configureGrowthBook()

    // boilerplate plugin config
    configureSerialization()
    configureMonitoring()
    configureHTTP()
}
