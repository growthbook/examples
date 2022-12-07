require 'uri'
require 'net/http'
require 'growthbook'

module GrowthbookSdk
  def growthbook
    features_json = growthbook_features_json || {}

    @growthbook ||= Growthbook::Context.new(
      features: features_json,
      attributes: {}
    )
  end

  def init_feature_flags
    return if current_user.nil?

    growthbook.attributes = UserBlueprint.render_as_hash(current_user, view: :growthbook_user_attributes)

    puts growthbook.attributes
  end

  private

  def growthbook_features_json
    response_body = Rails.cache.fetch("growthbook_features", expires_in: 1.hour) do
      puts "🌎 Fetching GrowthBook features from the network"

      uri = URI('https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8')
      res = Net::HTTP.get_response(uri)

      res.is_a?(Net::HTTPSuccess) ? res.body : nil
    end

    return {} if response_body.nil?

    JSON.parse(response_body)["features"]
  end
end
