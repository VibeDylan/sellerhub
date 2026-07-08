import { SellerStatus } from '../enums/seller.status';
import { SellerEmail } from '../value-objects/seller.email';
import { SellerId } from '../value-objects/seller-id';
import { Seller } from './seller';

describe('Seller', () => {
  const createSeller = (): Seller =>
    Seller.create(new SellerId('seller-123'), new SellerEmail('seller@test.com'));

  it('should create a seller with pending status', () => {
    const seller = createSeller();

    expect(seller.sellerStatus).toBe(SellerStatus.PENDING);
  });

  it('should create a seller with id and email', () => {
    const seller = createSeller();

    expect(seller.sellerId.value).toBe('seller-123');
    expect(seller.sellerEmail.value).toBe('seller@test.com');
  });

  it('should submit seller for review', () => {
    const seller = createSeller();

    seller.submitForReview();

    expect(seller.sellerStatus).toBe(SellerStatus.UNDER_REVIEW);
  });

  it('should not submit seller for review twice', () => {
    const seller = createSeller();

    seller.submitForReview();

    expect(() => seller.submitForReview()).toThrow(
      'Seller cannot be submitted for review from current status',
    );
  });

  it('should approve a seller under review', () => {
    const seller = createSeller();

    seller.submitForReview();
    seller.approve();

    expect(seller.sellerStatus).toBe(SellerStatus.APPROVED);
  });

  it('should not approve a pending seller', () => {
    const seller = createSeller();

    expect(() => seller.approve()).toThrow('Seller cannot be approved from current status');
  });
});
