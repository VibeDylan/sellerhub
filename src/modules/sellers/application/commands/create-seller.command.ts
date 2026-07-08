export class CreateSellerCommand {
  public readonly email: string;

  constructor(email: string) {
    this.email = email;
  }
}
