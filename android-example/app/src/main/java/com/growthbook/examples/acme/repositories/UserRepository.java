package com.growthbook.examples.acme.repositories;

import com.growthbook.examples.acme.models.UserAttributes;

public class UserRepository {
    public UserAttributes getRegularUser() {
        return new UserAttributes("user-regular123abc", "spain", false, false, "1.2.3");
    }

    public UserAttributes getEmployeeUser() {
        return new UserAttributes("user-employee-123456789", "canada", true, true, "2.1.0");
    }
}
