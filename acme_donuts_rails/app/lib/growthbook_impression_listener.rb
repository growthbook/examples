class GrowthbookImpressionListener
  def on_experiment_viewed(experiment, result)
    logged_impression = Impression.create!(experiment: experiment, result: result)

    puts "📝 Logged impression #{logged_impression}"
  end
end
