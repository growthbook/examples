class FeatureController < ApplicationController
  def features
    render json: {
      banner_text: growthbook.eval_feature("banner_text").value || "unknown banner text",
      use_dark_mode: growthbook.on?("dark_mode"),
      donut_price: growthbook.feature_value("donut_price", 9999),
      username_color: username_color,
    }
  end

  private

  # Gets a username colour based on an inline experiment
  def username_color
    experiment = Growthbook::InlineExperiment.new(
      key: "username-color",
      variations: %w[red orange yellow green blue purple]
    )
    result = growthbook.run(experiment)

    result.value
  end
end
