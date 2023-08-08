# frozen_string_literal: true

class GrowthbookFeatureUsageListener < Growthbook::FeatureUsageCallback
  attr_reader :user

  def initialize(user:)
    @user = user
  end

  def on_feature_usage(feature_key, result)
    puts "🚩 feature used by user '#{user.canonical_id}': #{feature_key} with result: #{result.as_json}"
  end
end
