class UserBlueprint < Blueprinter::Base
  identifier :id do |user|
    user.canonical_id
  end

  fields :email

  view :growthbook_user_attributes do
    include_view :default

    field :employee
    field :country

    field :loggedIn do
      true
    end
  end
end
