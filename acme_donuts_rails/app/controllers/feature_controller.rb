class FeatureController < ApplicationController
  def features
    render json: {
      banner_text: growthbook.eval_feature("banner_text").value || "unknown banner text",
      use_dark_mode: growthbook.on?("dark_mode"),
      donut_price: growthbook.feature_value("donut_price", 9999),
    }
  end
end
