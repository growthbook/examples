package com.growthbook.example.plugins.routing

import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.response.*

fun Application.configureRouting() {
    routing {
        // inline health check route
        get("/") {
            call.respond(mapOf("app" to "growthbook ktor example"))
        }

        acmeRoutes()
        multipleGBProjectsRoutes()
    }
}
