package com.growthbook.examples.acme.repositories;

import com.growthbook.examples.acme.models.UserAttributes;

public class UserRepository {
    public UserAttributes getRegularUser() {
        return new UserAttributes("user-regular123abc", "spain", false, false);
    }

    public UserAttributes getEmployeeUser() {
        return new UserAttributes("user-employee456xyz", "canada", true, true);
    }
}
