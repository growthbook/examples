class UserController < ApplicationController
  def index
    render json: {
      growthbook_user_attributes: UserBlueprint.render_as_hash(
        current_user!,
        view: :growthbook_user_attributes
      )
    }
  end
end
