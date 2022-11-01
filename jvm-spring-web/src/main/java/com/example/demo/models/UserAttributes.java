package com.example.demo.models;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

/**
 * The UserAttributes are a Gson-serializable and -deserializable class.
 * The JSON generated from this class is used in the GrowthBook SDK.
 */
public class UserAttributes {
    @SerializedName("employee")
    public Boolean isEmployee;

    @SerializedName("dietaryRestrictions")
    public ArrayList<DietaryRestriction> dietaryRestrictions;

    @SerializedName("country")
    public String country;

    public UserAttributes(String country, Boolean isEmployee, ArrayList<DietaryRestriction> dietaryRestrictions) {
        this.country = country;
        this.isEmployee = isEmployee;
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
}
