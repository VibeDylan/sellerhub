import { SellerStatus } from '../enums/seller.status';
import { SellerId } from '../value-objects/seller-id';
import { SellerEmail } from '../value-objects/seller.email';
import { InvalidSellerStatusError } from '../errors/invalid-seller-status.error';

export class Seller {
  private readonly id: SellerId;

  private email: SellerEmail;

  private status: SellerStatus;

  private readonly createdAt: Date;

  private constructor(id: SellerId, email: SellerEmail, status: SellerStatus, createdAt: Date) {
    this.id = id;
    this.email = email;
    this.status = status;
    this.createdAt = createdAt;
  }

  static create(id: SellerId, email: SellerEmail): Seller {
    return new Seller(id, email, SellerStatus.PENDING, new Date());
  }

  static reconstitute(
    id: SellerId,
    email: SellerEmail,
    status: SellerStatus,
    createdAt: Date,
  ): Seller {
    return new Seller(id, email, status, createdAt);
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

  suspend(): void {
    if (this.status !== SellerStatus.APPROVED) {
      throw new InvalidSellerStatusError('Seller cannot be suspended from current status');
    }
    this.status = SellerStatus.SUSPENDED;
  }

  reject(): void {
    if (this.status !== SellerStatus.UNDER_REVIEW && this.status !== SellerStatus.PENDING) {
      throw new InvalidSellerStatusError('Seller cannot be rejected from current status');
    }
    this.status = SellerStatus.REJECTED;
  }

  reactivate(): void {
    if (this.status !== SellerStatus.SUSPENDED) {
      throw new InvalidSellerStatusError('Seller cannot be reactivated from current status');
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
