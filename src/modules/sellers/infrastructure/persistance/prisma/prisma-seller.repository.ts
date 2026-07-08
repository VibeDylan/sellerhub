import { SellerRepository } from '../../../application/ports/seller.repository';
import { Seller } from '../../../domain/entities/seller';
import { SellerId } from '../../../domain/value-objects/seller-id';
import { SellerEmail } from '../../../domain/value-objects/seller.email';
import { SellerStatus } from '../../../domain/enums/seller.status';

export class PrismaSellerRepository implements SellerRepository {
  async save(seller: Seller): Promise<void> {
    console.log('Saving seller', {
      id: seller.sellerId.value,
      email: seller.sellerEmail.value,
      status: seller.sellerStatus,
    });
  }

  async findById(id: SellerId): Promise<Seller | null> {
    if (id.value !== 'test123') {
      return null;
    }

    return Seller.reconstitute(
      id,
      new SellerEmail('test@gmail.com'),
      SellerStatus.APPROVED,
      new Date(),
    );
  }
}
