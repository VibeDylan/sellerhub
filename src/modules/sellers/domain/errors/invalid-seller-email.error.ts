export class InvalidSellerEmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidSellerEmailError';
  }
}
