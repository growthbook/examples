package com.growthbook.examples.acme;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import com.growthbook.examples.acme.databinding.FragmentPublicBinding;


public class PublicFragment extends Fragment {

    private FragmentPublicBinding binding;

    @Override
    public View onCreateView(
            LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState
    ) {
        binding = FragmentPublicBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

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


        // TODO: Move this to observables
        binding.donutPriceTextView.setText(getString(R.string.donut_price_message, "4.00"));

        // TODO: Move this to observables
        binding.welcomeBannerTextView.setText("TODO: Set custom banner text from Features");

        // TODO: check features for toggle
        Float donutPrice = 0.0f;
        if (donutPrice == 0.0f) {
            // Donut claim button is only visible to those who get free donuts
            binding.donutClaimButton.setVisibility(View.VISIBLE);
            // TODO: Show the "Claim your free donut" button
        } else {
            binding.donutClaimButton.setVisibility(View.INVISIBLE);
        }
    }

    private void bindObservables() {
        //
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}