export class InvalidSellerStatusError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SellerInvalidStatusError';
  }
}
