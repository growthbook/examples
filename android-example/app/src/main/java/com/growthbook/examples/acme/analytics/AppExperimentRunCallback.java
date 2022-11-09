package com.growthbook.examples.acme.analytics;

import android.util.Log;

import growthbook.sdk.java.ExperimentResult;
import growthbook.sdk.java.ExperimentRunCallback;

public class AppExperimentRunCallback implements ExperimentRunCallback {
    @Override
    public void onRun(ExperimentResult experimentResult) {
        Log.d("AppExperimentRunCallback", "Tracked the following: ExperimentResult = " + experimentResult.toJson());
    }
}
