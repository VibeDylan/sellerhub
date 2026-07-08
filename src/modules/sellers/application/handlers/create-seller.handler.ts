import { randomUUID } from 'crypto';
import { SellerId } from '../../domain/value-objects/seller-id';
import { CreateSellerCommand } from '../commands/create-seller.command';
import { SellerRepository } from '../ports/seller.repository';
import { Seller } from '../../domain/entities/seller';
import { SellerEmail } from '../../domain/value-objects/seller.email';

export class CreateSellerHandler {
  constructor(private readonly sellerRepository: SellerRepository) {}

  async execute(command: CreateSellerCommand): Promise<SellerId> {
    const sellerId = new SellerId(randomUUID());
    const sellerEmail = new SellerEmail(command.email);

    const seller = Seller.create(sellerId, sellerEmail);

    await this.sellerRepository.save(seller);
    return seller.sellerId;
  }
}
