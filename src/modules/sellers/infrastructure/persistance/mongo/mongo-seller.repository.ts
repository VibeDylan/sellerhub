import { Collection } from 'mongodb';
import { SellerRepository } from '../../../application/ports/seller.repository';
import { Seller } from '../../../domain/entities/seller';
import { SellerId } from '../../../domain/value-objects/seller-id';
import { SellerEmail } from '../../../domain/value-objects/seller.email';
import { SellerStatus } from '../../../domain/enums/seller.status';

export interface SellerDocument {
  _id: string;
  email: string;
  status: SellerStatus;
  createdAt: Date;
}

export class MongoSellerRepository implements SellerRepository {
  constructor(private readonly collection: Collection<SellerDocument>) {}

  async save(seller: Seller): Promise<void> {
    await this.collection.updateOne(
      { _id: seller.sellerId.value },
      {
        $set: {
          email: seller.sellerEmail.value,
          status: seller.sellerStatus,
          createdAt: seller.creationDate,
        },
      },
      { upsert: true },
    );
  }

  async findById(id: SellerId): Promise<Seller | null> {
    const document = await this.collection.findOne({ _id: id.value });

    if (!document) {
      return null;
    }

    return Seller.reconstitute(
      new SellerId(document._id),
      new SellerEmail(document.email),
      document.status,
      document.createdAt,
    );
  }
}
