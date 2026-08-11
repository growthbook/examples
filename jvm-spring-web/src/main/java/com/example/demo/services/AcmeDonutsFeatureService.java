package com.example.demo.services;

import growthbook.sdk.java.FeatureFetchException;
import growthbook.sdk.java.FeatureRefreshCallback;
import growthbook.sdk.java.FeatureRefreshStrategy;
import growthbook.sdk.java.GBFeaturesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AcmeDonutsFeatureService extends GBFeaturesRepository {
    @Autowired
    public AcmeDonutsFeatureService() {
        super(
            "https://cdn.growthbook.io",
            "java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8",
            null,
            FeatureRefreshStrategy.STALE_WHILE_REVALIDATE,
            10
        );

        this.onFeaturesRefresh(new FeatureRefreshCallback() {
            @Override
            public void onRefresh(String featuresJson) {
                System.out.println("🔵 AcmeDonutsFeatureService -> Features have been refreshed");
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
        //e.printStackTrace();

        switch (e.getErrorCode()) {
            case NO_RESPONSE_ERROR -> {
                // Handle NO_RESPONSE_ERROR
            }

            case SSE_CONNECTION_ERROR -> {
                // SSE is not applicable for this service but this was added here for completion.
            }

            case CONFIGURATION_ERROR, UNKNOWN -> throw new RuntimeException(e);
        }
    }
}
