class UserBalanceResponseDto {
  constructor(user) {
    this.balance = user.balance;
  }
}

module.exports = UserBalanceResponseDto;
