package com.growthbook.examples.acme.di;

import android.content.Context;
import android.util.Log;

import com.growthbook.examples.acme.analytics.AppExperimentRunCallback;
import com.growthbook.examples.acme.analytics.AppTrackingCallback;
import com.growthbook.examples.acme.repositories.FeaturesRepository;
import com.growthbook.examples.acme.repositories.UserRepository;

import growthbook.sdk.java.GBContext;
import growthbook.sdk.java.GrowthBook;

/**
 * using the dependencies container pattern for quick and dirty DI
 * ref: https://developer.android.com/training/dependency-injection/manual
 *
 * You can set it up differently depending on your DI/service locator library.
 */
public class AppContainer {
    public UserRepository userRepository;
    public FeaturesRepository featuresRepository;
    public GrowthBook growthBook;

    public AppContainer(Context context) {
        this.userRepository = new UserRepository();

        // Set up the GrowthBook SDK
        this.featuresRepository = new FeaturesRepository(context);
        String features = this.featuresRepository.getFeatures();
        AppTrackingCallback trackingCallback = new AppTrackingCallback();
        AppExperimentRunCallback runCallback = new AppExperimentRunCallback();

        Log.d("AppContainer", "Features = " + features);

        GBContext gbContext = GBContext
            .builder()
            .featuresJson(features)
            .trackingCallback(trackingCallback)
            .build();

        this.growthBook = new GrowthBook(gbContext);
        this.growthBook.subscribe(runCallback);
    }
}
