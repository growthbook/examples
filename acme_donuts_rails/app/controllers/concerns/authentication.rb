module Authentication
  include ::Exceptions

  def authenticate!
    current_user!
  end

  def current_user
    return nil if bearer_token.nil?

    @current_user ||= User.find_by(access_token: bearer_token)
  end

  def current_user!
    raise Unauthorized unless current_user.present?
    current_user
  end

  private

  def bearer_token
    token_header = request.headers['Authorization']
    return nil unless token_header.present?

    @bearer_token ||= token_header.split("Bearer ")[1]
  end
end
