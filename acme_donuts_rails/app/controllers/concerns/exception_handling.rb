module ExceptionHandling
  extend ActiveSupport::Concern
  include Exceptions

  included do
    rescue_from Exceptions::Unauthorized do
      render json: { error: "unauthorized" }, status: 401
    end

    rescue_from Exceptions::BadRequest do
      render json: { error: "bad_request" }, status: 400
    end
  end
end