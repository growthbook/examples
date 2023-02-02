package com.example.demo.services;

import growthbook.sdk.java.FeatureFetchException;
import growthbook.sdk.java.GBFeaturesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BasicEncryptedFeaturesService extends GBFeaturesRepository {
    @Autowired
    public BasicEncryptedFeaturesService() throws FeatureFetchException {
        super(
            "https://cdn.growthbook.io/api/features/sdk-862b5mHcP9XPugqD",
            "BhB1wORFmZLTDjbvstvS8w=="
        );

        this.initialize();
    }

    private BasicEncryptedFeaturesService(String endpoint, String encryptionKey) {
        super(endpoint, encryptionKey);
    }
}
