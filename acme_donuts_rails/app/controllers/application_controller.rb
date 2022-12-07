class ApplicationController < ActionController::API
  include Authentication
  include ExceptionHandling
  include GrowthbookSdk

  before_action :authenticate!
  before_action :init_feature_flags
end
