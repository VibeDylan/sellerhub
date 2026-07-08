import { randomUUID } from 'crypto';
import { SellerId } from '../../domain/value-objects/seller-id';
import { SellerRepository } from '../ports/seller.repository';
import { SellerEmail } from '../../domain/value-objects/seller.email';
import { Seller } from '../../domain/entities/seller';

interface CreateSellerCommand {
  email: string;
}

export class CreateSellerUseCase {
  constructor(private readonly sellerRepository: SellerRepository) {}

  async execute(input: CreateSellerCommand): Promise<SellerId> {
    const sellerId = new SellerId(randomUUID());
    const sellerEmail = new SellerEmail(input.email);

    const seller = Seller.create(sellerId, sellerEmail);

    await this.sellerRepository.save(seller);
    return seller.sellerId;
  }
}
