package com.example.demo;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Mock repository to get GrowthBook features from the GrowthBook API.
 * In this example, we are loading features from a static file.
 * The main difference is this example returns the features at the root, not { features, status, dateUpdated }
 */
public class FeaturesRepository {
    private String featuresJson = "{}";
    private final Gson gson;

    public FeaturesRepository() {
        GsonBuilder gsonBuilder = new GsonBuilder();
        this.gson = gsonBuilder.create();

        String resourcesDirectory = FeaturesRepository.getResourceDirectoryPath();

        try {
            JsonObject featuresJsonObject = this.gson.fromJson(new FileReader(resourcesDirectory + "/static/features.json"), JsonObject.class);
            this.featuresJson = featuresJsonObject.toString();
            System.out.println("FeaturesRepository: Successfully loaded features JSON");
            System.out.println(this.featuresJson);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * @return JSON string of the GrowthBook features response
     */
    public String getFeaturesJson() {
        return this.featuresJson;
    }

    private static String getResourceDirectoryPath() {
        Path resourceDirectory = Paths.get("src", "test", "resources");
        return resourceDirectory.toFile().getAbsolutePath();
    }
}
