import { Seller } from '../../domain/entities/seller';

export interface SellerRepository {
  save(seller: Seller): Promise<void>;
}
