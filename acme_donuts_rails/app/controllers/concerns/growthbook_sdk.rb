require 'growthbook'

module GrowthbookSdk
  def growthbook
    @growthbook ||= Growthbook::Context.new(
      features: growthbook_features_json,
      attributes: {},
    )
  end

  def init_feature_flags
    return if current_user.nil?

    growthbook.attributes = UserBlueprint.render_as_hash(current_user, view: :growthbook_user_attributes)
    growthbook.listener = GrowthbookImpressionListener.new
    growthbook.on_feature_usage = GrowthbookFeatureUsageListener.new(user: current_user)
  end

  private

  def growthbook_features_json
    Rails.cache.fetch("growthbook_features", expires_in: 1.hour) do
      puts "🌎 Fetching GrowthBook features from the network"

      repo = Growthbook::FeatureRepository.new(
        endpoint: 'https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8',
        decryption_key: nil,
      )

      repo.fetch || {}
    end
  end
end
