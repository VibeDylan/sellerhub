import { InvalidSellerEmailError } from '../errors/invalid-seller-email.error';
import { SellerEmail } from './seller.email';

describe('SellerEmail', () => {
  it('should create a valid seller email', () => {
    const email = new SellerEmail('seller@test.com');

    expect(email.value).toBe('seller@test.com');
  });

  it('should throw when email is empty', () => {
    expect(() => new SellerEmail('')).toThrow(InvalidSellerEmailError);
  });

  it('should throw when email format is invalid', () => {
    expect(() => new SellerEmail('seller-test')).toThrow(InvalidSellerEmailError);
  });

  it('should throw when email is too long', () => {
    const longEmail = `${'a'.repeat(250)}@test.com`;

    expect(() => new SellerEmail(longEmail)).toThrow(InvalidSellerEmailError);
  });

  it('should compare two seller emails', () => {
    const email1 = new SellerEmail('seller@test.com');
    const email2 = new SellerEmail('seller@test.com');
    const email3 = new SellerEmail('other@test.com');

    expect(email1.equals(email2)).toBe(true);
    expect(email1.equals(email3)).toBe(false);
  });
});
