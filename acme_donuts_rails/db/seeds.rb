# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# A sample user that will not have employee-related features
User.create!(
  email: "tina@growthbook.io",
  canonical_id: "user-abc123",
  access_token: "user_tina_abc123",
  country: "france",
  employee: false,
)

# A sample employee user that will have features evaluated as an employee
User.create!(
  email: "employee@acme.growthbook.io",
  canonical_id: "user-employee-123456789",
  access_token: "employee_acme_xyz987",
  country: "spain",
  employee: true,
)
