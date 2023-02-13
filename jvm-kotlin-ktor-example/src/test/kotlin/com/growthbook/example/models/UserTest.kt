package com.growthbook.example.models

import kotlin.test.Test
import kotlin.test.assertEquals

internal class UserTest {
    @Test
    fun `can serialize as JSON`() {
        val subject = User(id = "user-abc123", country = "canada", isEmployee = true)

        val result = subject.toJson()

        val expected = "{\"id\":\"user-abc123\",\"country\":\"canada\",\"employee\":true}"
        assertEquals(expected, result)
    }

    @Test
    fun `can deserialize from JSON string`() {
        val input = "{\"id\":\"user-xyz\",\"country\":\"mexico\",\"employee\":false}"

        val result = User.fromJson(input)

        assertEquals(result.id, "user-xyz")
        assertEquals(result.country, "mexico")
        assertEquals(result.isEmployee, false)
    }
}
