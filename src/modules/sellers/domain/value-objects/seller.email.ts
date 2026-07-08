export class SellerEmail {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private static readonly MAX_EMAIL_LENGTH = 254;

  private readonly _value: string;

  constructor(value: string) {
    if (!value?.trim()) {
      throw new Error('SellerEmail cannot be empty');
    }

    const normalized = this.normalize(value);

    if (!this.isValid(normalized)) {
      throw new Error('SellerEmail is not in valid format');
    }

    this._value = normalized;
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }

  private isValid(email: string): boolean {
    return email.length <= SellerEmail.MAX_EMAIL_LENGTH && SellerEmail.EMAIL_REGEX.test(email);
  }

  equals(other: SellerEmail): boolean {
    return this.value === other.value;
  }

  get value(): string {
    return this._value;
  }
}
