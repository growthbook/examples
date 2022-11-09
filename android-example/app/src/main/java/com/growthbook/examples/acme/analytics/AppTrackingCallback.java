package com.growthbook.examples.acme.analytics;

import android.util.Log;

import growthbook.sdk.java.Experiment;
import growthbook.sdk.java.ExperimentResult;
import growthbook.sdk.java.TrackingCallback;

public class AppTrackingCallback implements TrackingCallback {
    @Override
    public <ValueType> void onTrack(Experiment<ValueType> experiment, ExperimentResult<ValueType> experimentResult) {
        Log.d("AppTrackingCallback", "Tracked the following: Experiment = " + experiment.toJson() + " - ExperimentResult = " + experimentResult.toJson());
    }
}
