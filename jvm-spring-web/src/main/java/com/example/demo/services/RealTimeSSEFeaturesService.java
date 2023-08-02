package com.example.demo.services;

import growthbook.sdk.java.FeatureFetchException;
import growthbook.sdk.java.FeatureRefreshCallback;
import growthbook.sdk.java.FeatureRefreshStrategy;
import growthbook.sdk.java.GBFeaturesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RealTimeSSEFeaturesService extends GBFeaturesRepository {
    @Autowired
    public RealTimeSSEFeaturesService() {
        super(
            "https://cdn.growthbook.io",
            "sdk-pGmC6LrsiUoEUcpZ",
            null,
            FeatureRefreshStrategy.SERVER_SENT_EVENTS,
            null
        );

        this.onFeaturesRefresh(new FeatureRefreshCallback() {
            @Override
            public void onRefresh(String featuresJson) {
                System.out.println("🔵 RealTimeSSEFeaturesService -> Features have been refreshed");
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
        e.printStackTrace();

        switch (e.getErrorCode()) {
            case NO_RESPONSE_ERROR -> {
                // Handle NO_RESPONSE_ERROR
            }

            case SSE_CONNECTION_ERROR -> {
                // Handle SSE_CONNECTION_ERROR
            }

            case CONFIGURATION_ERROR, UNKNOWN -> {
                throw new RuntimeException(e);
            }
        }
    }
}
