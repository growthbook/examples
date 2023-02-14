package com.growthbook.example.plugins.growthbook

import com.growthbook.example.models.User

object MockUserData {
    /**
     * In the Acme project, this setup will enable dark mode and show French banner_text
     */
    val employeeUser = User(
        id = "user-employee-123456789",
        country = "france",
        isEmployee = true,
        isLoggedIn = true,
    )

    /**
     * In the BasicEncrypted project, this setup will show a Spanish greeting
     */
    val standardUser = User(
        id = "user-abc123",
        country = "mexico",
        isEmployee = false,
        isLoggedIn = false,
    )
}
