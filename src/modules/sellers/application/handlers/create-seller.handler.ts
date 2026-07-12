import { randomUUID } from 'crypto';
import { SellerId } from '../../domain/value-objects/seller-id';
import { CreateSellerCommand } from '../commands/create-seller.command';
import { SellerRepository } from '../ports/seller.repository';
import { Seller } from '../../domain/entities/seller';
import { SellerEmail } from '../../domain/value-objects/seller.email';
import { EventPublisher } from '../ports/event-publisher';

export class CreateSellerHandler {
  constructor(
    private readonly sellerRepository: SellerRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateSellerCommand): Promise<SellerId> {
    const sellerId = new SellerId(randomUUID());
    const sellerEmail = new SellerEmail(command.email);

    const seller = Seller.create(sellerId, sellerEmail);

    await this.sellerRepository.save(seller);
    const events = seller.pullDomainEvents();
    await this.eventPublisher.publish(events);
    return seller.sellerId;
  }
}
