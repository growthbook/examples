package com.example.growthbookdemoapp

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.sdk.growthbook.GBSDKBuilder
import com.sdk.growthbook.GrowthBookSDK
import com.sdk.growthbook.SDKBuilder
import kotlinx.coroutines.DelicateCoroutinesApi

class MainActivity: AppCompatActivity() {

    private var growthBookSDK: GrowthBookSDK? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout)

        findViewById<Button>(R.id.btn_initialize).setOnClickListener {
            onInitializeBtnClick()
        }

        findViewById<Button>(R.id.button).isEnabled = false
        findViewById<Button>(R.id.button).setOnClickListener {
            onBtnClick()
        }
    }

    @OptIn(DelicateCoroutinesApi::class)
    private fun onInitializeBtnClick() {
        // User attributes for targeting and assigning users to experiment variations
        val attrs = HashMap<String, Any>()
        attrs["appBuildNumber"] = 3432

        val sdkBuilder: SDKBuilder = GBSDKBuilder(
            // Fetch and cache feature definitions from GrowthBook API
            // If self-hosting, we recommend using a CDN in production
            apiKey = "sdk-3e06aog6O1Mp6Ir",
            hostURL = "https://cdn.growthbook.io/",
            attributes = attrs,
            trackingCallback = { gbExperiment, gbExperimentResult ->
                // TODO: track in your analytics system
                print("Viewed Experiment")
                print("Experiment Id: " + gbExperiment.key)
                print("Variation Id: " + gbExperimentResult.variationId)
            },
            // Provide the encryption key of type String if you intend to use data encryption,
            // otherwise you can pass null
            encryptionKey = null
        )

        growthBookSDK = sdkBuilder.initialize()
        findViewById<TextView>(R.id.textView).text = getString(R.string.check_if_feature_enabled)
        findViewById<Button>(R.id.button).isEnabled = true
    }

    private fun onBtnClick() {
        val gb = growthBookSDK
        val theText = when {
            gb == null -> "sdk is null"
            gb.feature("user576-feature").on -> "Feature is ON!"
            else -> "Feature is OFF"
        }

        findViewById<TextView>(R.id.textView).text = theText
    }
}