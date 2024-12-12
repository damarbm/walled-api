class UserResponseDto {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.avatar_url = user.avatar_url;
    this.balance = user.balance;
  }
}

module.exports = UserResponseDto;
