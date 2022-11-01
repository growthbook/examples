package com.example.demo.models;

import com.google.gson.annotations.SerializedName;
import growthbook.sdk.java.models.Operator;
import org.springframework.lang.Nullable;

public enum DietaryRestriction {
    @SerializedName("nut_allergy")
    NUT_ALLERGY("nut_allergy"),

    @SerializedName("dairy_free")
    DAIRY_FREE("dairy_free"),

    @SerializedName("gluten_free")
    GLUTEN_FREE("gluten_free"),

    @SerializedName("vegan")
    VEGAN("vegan"),
    ;

    private final String rawValue;

    DietaryRestriction(String rawValue) {
        this.rawValue = rawValue;
    }

    public static @Nullable DietaryRestriction fromString(String stringValue) {
        for (DietaryRestriction o : values()) {
            if (o.rawValue.equals(stringValue)) {
                return o;
            }
        }

        return null;
    }

    @Override
    public String toString() {
        return this.rawValue;
    }
}
