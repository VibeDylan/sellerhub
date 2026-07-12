import { CreateSellerHandler } from './create-seller.handler';
import { CreateSellerCommand } from '../commands/create-seller.command';
import { SellerRepository } from '../ports/seller.repository';
import { EventPublisher } from '../ports/event-publisher';
import { Seller } from '../../domain/entities/seller';
import { SellerId } from '../../domain/value-objects/seller-id';
import { SellerCreatedEvent } from '../../domain/events/seller-created.event';
import { SellerApprovedEvent } from '../../domain/events/seller-approved.event';

class InMemorySellerRepository implements SellerRepository {
  public sellers: Seller[] = [];

  async save(seller: Seller): Promise<void> {
    this.sellers.push(seller);
  }

  async findById(id: SellerId): Promise<Seller | null> {
    return this.sellers.find((seller) => seller.sellerId.equals(id)) ?? null;
  }
}

class InMemoryEventPublisher implements EventPublisher {
  public published: (SellerCreatedEvent | SellerApprovedEvent)[] = [];

  async publish(events: (SellerCreatedEvent | SellerApprovedEvent)[]): Promise<void> {
    this.published.push(...events);
  }
}

describe('CreateSellerHandler', () => {
  it('should create and save a seller', async () => {
    const repository = new InMemorySellerRepository();
    const eventPublisher = new InMemoryEventPublisher();
    const handler = new CreateSellerHandler(repository, eventPublisher);

    await handler.execute(new CreateSellerCommand('seller@test.com'));

    expect(repository.sellers).toHaveLength(1);
    expect(repository.sellers[0].sellerEmail.value).toBe('seller@test.com');
  });

  it('should publish a SellerCreatedEvent', async () => {
    const repository = new InMemorySellerRepository();
    const eventPublisher = new InMemoryEventPublisher();
    const handler = new CreateSellerHandler(repository, eventPublisher);

    await handler.execute(new CreateSellerCommand('seller@test.com'));

    expect(eventPublisher.published).toHaveLength(1);
    expect(eventPublisher.published[0]).toBeInstanceOf(SellerCreatedEvent);
  });

  it('should throw when email is invalid', async () => {
    const repository = new InMemorySellerRepository();
    const eventPublisher = new InMemoryEventPublisher();
    const handler = new CreateSellerHandler(repository, eventPublisher);

    await expect(handler.execute(new CreateSellerCommand('invalid-email'))).rejects.toThrow();
  });
});
