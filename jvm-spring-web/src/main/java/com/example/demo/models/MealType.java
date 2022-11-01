package com.example.demo.models;

import com.google.gson.annotations.SerializedName;

public enum MealType {
    @SerializedName("standard")
    STANDARD("Standard Meal"),

    @SerializedName("gf")
    GLUTEN_FREE("Gluten-Free Meal"),
    ;

    private final String rawValue;

    MealType(String rawValue) {
        this.rawValue = rawValue;
    }

    @Override
    public String toString() {
        return this.rawValue;
    }
}
