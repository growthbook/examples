package com.example.demo.models;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

/**
 * The UserAttributes are a Gson-serializable and -deserializable class.
 * The JSON generated from this class is used in the GrowthBook SDK.
 */
public class UserAttributes {
    @SerializedName("id")
    public String id;

    @SerializedName("employee")
    public Boolean isEmployee;

    @SerializedName("loggedIn")
    public Boolean isLoggedIn;

    @SerializedName("dietaryRestrictions")
    public ArrayList<DietaryRestriction> dietaryRestrictions;

    @SerializedName("country")
    public String country;

    public UserAttributes(String id, String country, Boolean isEmployee, Boolean isLoggedIn, ArrayList<DietaryRestriction> dietaryRestrictions) {
        this.id = id;
        this.country = country;
        this.isEmployee = isEmployee;
        this.isLoggedIn = isLoggedIn;
        this.dietaryRestrictions = dietaryRestrictions;
    }

    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    @Override
    public String toString() {
        return toJson();
    }

    public static UserAttributes mockEmployeeUser() {
        return new UserAttributes(
            "user-employee-123456789",
            "canada",
            true,
            true,
            new ArrayList<>()
        );
    }

    public static UserAttributes mockRegularUser() {
        return new UserAttributes(
            "user-abc123",
            "canada",
            false,
            false,
            new ArrayList<>()
        );
    }

    /**
     * to change the value of the feature banner_text
     * @param country  Supported countries are "france" (French) and "spain" (Spanish)
     * @return
     */
    public static UserAttributes mockUserFromCountry(String country) {
        return new UserAttributes(
            "user-abc123",
            country,
            false,
            false,
            new ArrayList<>()
        );
    }
}
