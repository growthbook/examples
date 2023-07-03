package com.growthbook.examples.acme;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import com.growthbook.examples.acme.databinding.FragmentPublicBinding;
import com.growthbook.examples.acme.di.AppContainer;

import java.util.Locale;


public class PublicFragment extends Fragment {

    private FragmentPublicBinding binding;
    private AppContainer dependencies;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        this.dependencies = ((AcmeDonutsApplication) requireActivity().getApplication()).dependencies;
    }

    @Override
    public View onCreateView(
            LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState
    ) {
        binding = FragmentPublicBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        bindViews();
    }


    private void bindViews() {
        binding.donutClaimButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                NavHostFragment
                    .findNavController(PublicFragment.this)
                    .navigate(R.id.action_PublicFragment_to_EmployeeFragment);
            }
        });

        // Check GrowthBook to see what donut price the user should see
        Float donutPrice = this.dependencies.growthBook.getFeatureValue("donut_price", 99.9f);
        binding.donutPriceTextView.setText(getString(R.string.donut_price_message, String.format(Locale.CANADA, "%.2f", donutPrice)));
        Log.d("PublicFragment", "Donut price is: " + donutPrice);

        // Get the welcome text from GrowthBook
        String bannerText = this.dependencies.growthBook.getFeatureValue("banner_text", "(banner text failed to load)");
        binding.welcomeBannerTextView.setText(bannerText);

        // If the donut is $0.00 (free) show them the "Claim your free Donut" button
        if (donutPrice == 0.0f) {
            // Donut claim button is only visible to those who get free donuts
            binding.donutClaimButton.setVisibility(View.VISIBLE);
        } else {
            binding.donutClaimButton.setVisibility(View.INVISIBLE);
        }

        // Bind app version
        String appVersion = this.dependencies.growthBook.getFeatureValue("app_name", "unknown app version");
        String formattedAppVersion = String.format("App version: %s", appVersion);
        binding.appVersion.setText(formattedAppVersion);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}