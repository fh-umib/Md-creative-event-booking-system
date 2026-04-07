class Staff {
  constructor({
    id,
    full_name,
    role,
    bio,
    image_url,
    email,
    phone,
    is_active = true,
    display_order = 0,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.full_name = full_name;
    this.role = role;
    this.bio = bio;
    this.image_url = image_url;
    this.email = email;
    this.phone = phone;
    this.is_active = is_active;
    this.display_order = display_order;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = Staff;