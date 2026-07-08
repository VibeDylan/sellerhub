import { SellerRepository } from '../../../application/ports/seller.repository';
import { Seller } from '../../../domain/entities/seller';

export class PrismaSellerRepository implements SellerRepository {
  async save(seller: Seller): Promise<void> {
    console.log('Saving seller', {
      id: seller.sellerId.value,
      email: seller.sellerEmail.value,
      status: seller.sellerStatus,
    });
  }
}
