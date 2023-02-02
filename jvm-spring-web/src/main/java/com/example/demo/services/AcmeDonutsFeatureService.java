package com.example.demo.services;

import growthbook.sdk.java.FeatureFetchException;
import growthbook.sdk.java.GBFeaturesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AcmeDonutsFeatureService extends GBFeaturesRepository {
    @Autowired
    public AcmeDonutsFeatureService() throws FeatureFetchException {
        super("https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8", null);

        this.initialize();
    }

    private AcmeDonutsFeatureService(String endpoint, String encryptionKey) {
        super(endpoint, encryptionKey);
    }
}
