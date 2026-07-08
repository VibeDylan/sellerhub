import { Seller } from '../../domain/entities/seller';
import { SellerRepository } from './seller.repository';

export class FakeSellerRepository implements SellerRepository {
  private sellers: Seller[] = [];

  async save(seller: Seller): Promise<void> {
    this.sellers.push(seller);
  }

  get items(): Seller[] {
    return this.sellers;
  }
}
