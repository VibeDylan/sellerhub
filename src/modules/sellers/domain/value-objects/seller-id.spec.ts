import { InvalidSellerIdError } from '../errors/invalid-seller-id.error';
import { SellerId } from './seller-id';

describe('SellerId', () => {
  it('should create a valid seller id', () => {
    const sellerId = new SellerId('seller-123');

    expect(sellerId.value).toBe('seller-123');
  });

  it('should throw when id is empty', () => {
    expect(() => new SellerId('')).toThrow(InvalidSellerIdError);
  });

  it('should throw when id contains only spaces', () => {
    expect(() => new SellerId('   ')).toThrow(InvalidSellerIdError);
  });

  it('should compare two seller ids', () => {
    const sellerId1 = new SellerId('seller-123');
    const sellerId2 = new SellerId('seller-123');
    const sellerId3 = new SellerId('seller-456');

    expect(sellerId1.equals(sellerId2)).toBe(true);
    expect(sellerId1.equals(sellerId3)).toBe(false);
  });
});
