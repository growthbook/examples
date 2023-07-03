package com.growthbook.examples.acme;

import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.growthbook.examples.acme.databinding.ActivityMainBinding;
import com.growthbook.examples.acme.di.AppContainer;
import com.growthbook.examples.acme.models.UserAttributes;

public class MainActivity extends AppCompatActivity {

    private AppBarConfiguration appBarConfiguration;
    private ActivityMainBinding binding;
    private AppContainer dependencies;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Layout
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        setSupportActionBar(binding.toolbar);
        // Navigation
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        appBarConfiguration = new AppBarConfiguration.Builder(navController.getGraph()).build();
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);

        // Dependencies
        this.dependencies = ((AcmeDonutsApplication) getApplication()).dependencies;

        initUser();
        initCustomThemeForUser();
    }

    /**
     * This is where we pretend to fetch the user and set them in the GrowthBook SDK.
     * App initialization is going to happen before we can fetch user data from a remote source, so this is to simulate that.
     */
    private void initUser() {
        // We can toggle between the different types of users to see the state

        // Regular users see a donut price of $2.50 and no button
//        UserAttributes user = this.dependencies.userRepository.getRegularUser();

        // Employee users see a donut price of $0.00 and they see a "Claim Free Donut" button
        UserAttributes user = this.dependencies.userRepository.getEmployeeUser();

        // Update the GrowthBook SDK with the user attributes
        Log.d("MainActivity", String.format("Assigning user attributes: %s", user.toJson()));
        this.dependencies.growthBook.setAttributes(user.toJson());
    }

    /**
     * uses the GrowthBook features and user attributes to evaluate if the user should see dark mode
     */
    private void initCustomThemeForUser() {
        // 50% of logged in users will receive dark mode
        Log.d("MainActivity", "Is dark mode on? " + this.dependencies.growthBook.isOn("dark_mode"));

        int darkModeInt = this.dependencies.growthBook.isOn("dark_mode") ?
            AppCompatDelegate.MODE_NIGHT_YES :
            AppCompatDelegate.MODE_NIGHT_NO;

        AppCompatDelegate.setDefaultNightMode(darkModeInt);
    }
}