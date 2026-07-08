import { Seller } from '../../domain/entities/seller';
import { SellerId } from '../../domain/value-objects/seller-id';
import { SellerRepository } from './seller.repository';

export class FakeSellerRepository implements SellerRepository {
  private sellers: Seller[] = [];

  async save(seller: Seller): Promise<void> {
    this.sellers.push(seller);
  }

  async findById(id: SellerId): Promise<Seller | null> {
    return this.sellers.find((seller) => seller.sellerId.equals(id)) ?? null;
  }

  get items(): Seller[] {
    return this.sellers;
  }
}
