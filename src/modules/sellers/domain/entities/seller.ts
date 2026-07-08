import { SellerStatus } from '../enums/seller.status';
import { SellerId } from '../value-objects/seller-id';
import { SellerEmail } from '../value-objects/seller.email';
import { InvalidSellerStatusError } from '../errors/invalid-seller-status.error';

export class Seller {
  private readonly id: SellerId;

  private email: SellerEmail;

  private status: SellerStatus;

  private readonly createdAt: Date;

  constructor(id: SellerId, email: SellerEmail) {
    this.id = id;
    this.email = email;
    this.status = SellerStatus.PENDING;
    this.createdAt = new Date();
  }

  static create(id: SellerId, email: SellerEmail): Seller {
    return new Seller(id, email);
  }

  submitForReview(): void {
    if (this.status !== SellerStatus.PENDING) {
      throw new InvalidSellerStatusError(
        'Seller cannot be submitted for review from current status',
      );
    }

    this.status = SellerStatus.UNDER_REVIEW;
  }

  approve(): void {
    if (this.status !== SellerStatus.UNDER_REVIEW) {
      throw new InvalidSellerStatusError('Seller cannot be approved from current status');
    }
    this.status = SellerStatus.APPROVED;
  }

  get sellerId(): SellerId {
    return this.id;
  }

  get sellerEmail(): SellerEmail {
    return this.email;
  }

  get sellerStatus(): SellerStatus {
    return this.status;
  }

  get creationDate(): Date {
    return this.createdAt;
  }
}
