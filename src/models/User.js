class User {
  constructor({
    id = null,
    fullName,
    email,
    passwordHash = null,
    phone = null,
    role = 'Client',
    isActive = true,
    createdAt = null,
    updatedAt = null
  }) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.passwordHash = passwordHash;
    this.phone = phone;
    this.role = role;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;
