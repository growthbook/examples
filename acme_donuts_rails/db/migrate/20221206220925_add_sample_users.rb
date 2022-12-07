class AddSampleUsers < ActiveRecord::Migration[6.1]
  def up
    User.create!(
      email: "tina@growthbook.io",
      canonical_id: "user-abc123",
      access_token: "user_tina_abc123",
      country: "france",
      employee: false,
    )
    User.create!(
      email: "employee@acme.growthbook.io",
      canonical_id: "user-employee-123456789",
      access_token: "employee_acme_xyz987",
      country: "spain",
      employee: true,
    )
  end

  def down
    User.find_by!(email: "tina@growthbook.io").destroy!
    User.find_by!(email: "employee@acme.growthbook.io").destroy!
  end
end
