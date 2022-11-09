package com.growthbook.examples.acme;

import android.app.Application;

import com.growthbook.examples.acme.di.AppContainer;

public class AcmeDonutsApplication extends Application {
    public AppContainer dependencies;

    @Override
    public void onCreate() {
        super.onCreate();
        this.dependencies = new AppContainer(this);
    }
}
