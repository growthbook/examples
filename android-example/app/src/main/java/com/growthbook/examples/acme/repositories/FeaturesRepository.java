package com.growthbook.examples.acme.repositories;

import android.content.Context;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class FeaturesRepository {
    private String featuresJson = "{}";

    public FeaturesRepository(Context context) {
        this.featuresJson = "{}";

        try {
            InputStream is = context.getAssets().open("features.json");

            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();

            this.featuresJson = new String(buffer, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getFeatures() {
        return this.featuresJson;
    }
}
