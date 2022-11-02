package com.example.demo.models;

import com.google.gson.annotations.SerializedName;

public class AcmeDonutsFeatures {
    @SerializedName("dark_mode_enabled")
    public Boolean darkModeEnabled;

    public Boolean getDarkModeEnabled() {
        return this.darkModeEnabled;
    }

    @SerializedName("donut_price")
    public Float donutPrice;

    public Float getDonutPrice() {
        return this.donutPrice;
    }

    @SerializedName("font_colour")
    public String fontColour;

    @Deprecated
    public String getFontColour() {
        return this.fontColour;
    }


    public AcmeDonutsFeatures(Boolean darkModeEnabled, Float donutPrice, String fontColour) {
        this.donutPrice = donutPrice;
        this.darkModeEnabled = darkModeEnabled;
        this.fontColour = fontColour;
    }
}
