package com.example.demo.models;

import com.google.gson.annotations.SerializedName;

public class MealOrder {
    @SerializedName("meal_type")
    MealType mealType;

    public MealType getMealType() {
        return this.mealType;
    }

    @SerializedName("dessert")
    String dessert;

    public String getDessert() {
        return this.dessert;
    }

    public MealOrder(MealType mealType, String dessert) {
        this.mealType = mealType;
        this.dessert = dessert;
    }
}
