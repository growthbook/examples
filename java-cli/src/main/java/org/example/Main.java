package org.example;

import growthbook.sdk.java.FeatureFetchException;
import growthbook.sdk.java.GBContext;
import growthbook.sdk.java.GBFeaturesRepository;
import growthbook.sdk.java.GrowthBook;

// TODO: Add logging support

public class Main {
    public static void main(String[] args) throws FeatureFetchException {
        GBFeaturesRepository featuresRepository = GBFeaturesRepository
            .builder()
            .endpoint("https://cdn.growthbook.io/api/features/sdk-862b5mHcP9XPugqD")
//            .encryptionKey("BhB1wORFmZLTDjbvstvS8w==") // Good key won't log an error
            .encryptionKey("some-bad-key") // Bad key will show error logging
            .build();

        featuresRepository.initialize();

        System.out.println(featuresRepository.getFeaturesJson());

        String sampleUserAttributes = "{\"country\": \"mexico\", \"device\": \"android\"}";
        GBContext context = GBContext.builder()
            .attributesJson(sampleUserAttributes)
            .featuresJson(featuresRepository.getFeaturesJson())
            .build();

        GrowthBook growthBook = new GrowthBook(context);

        String greeting = growthBook.getFeatureValue("greeting", "ERROR with getting the greeting");

        System.out.println(greeting);
    }
}
