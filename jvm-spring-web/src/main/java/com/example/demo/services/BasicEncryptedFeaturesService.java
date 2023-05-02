package com.example.demo.services;

import growthbook.sdk.java.FeatureFetchException;
import growthbook.sdk.java.FeatureRefreshCallback;
import growthbook.sdk.java.GBFeaturesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BasicEncryptedFeaturesService extends GBFeaturesRepository {
    private static final Logger logger = LoggerFactory.getLogger(BasicEncryptedFeaturesService.class);

    @Autowired
    public BasicEncryptedFeaturesService() {
        super(
            "https://cdn.growthbook.io/api/features/sdk-862b5mHcP9XPugqD",
            "nopenopenope==", // Incorrect key, for testing error logging
//            "BhB1wORFmZLTDjbvstvS8w==", // Correct key
            15
        );

        this.onFeaturesRefresh(new FeatureRefreshCallback() {
            @Override
            public void onRefresh(String featuresJson) {
                System.out.println("🔵 BasicEncryptedFeaturesService -> Features have been refreshed");
                System.out.println(featuresJson);
            }
        });

        try {
            this.initialize();
        } catch (FeatureFetchException e) {
            this.handleError(e);
        }
    }

    void handleError(FeatureFetchException e) {
        switch (e.getErrorCode()) {
            case CONFIGURATION_ERROR -> {
                logger.error("💥 Configuration error", e);
            }
            case NO_RESPONSE_ERROR -> {
                logger.error("💥 No response", e);
            }
            case UNKNOWN -> {
                logger.error("💥 Unknown error", e);
            }
        }
    }

    private BasicEncryptedFeaturesService(String endpoint, String encryptionKey, Integer ttlSeconds) {
        super(endpoint, encryptionKey, ttlSeconds);
    }
}
