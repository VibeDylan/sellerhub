import { Seller } from '../../domain/entities/seller';
import { SellerId } from '../../domain/value-objects/seller-id';

export interface SellerRepository {
  save(seller: Seller): Promise<void>;
  findById(id: SellerId): Promise<Seller | null>;
}
