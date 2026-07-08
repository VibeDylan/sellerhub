import { CreateSellerUseCase } from './create-seller.use-case';
import { SellerRepository } from '../ports/seller.repository';
import { Seller } from '../../domain/entities/seller';
import { SellerId } from '../../domain/value-objects/seller-id';

class InMemorySellerRepository implements SellerRepository {
  public sellers: Seller[] = [];

  async save(seller: Seller): Promise<void> {
    this.sellers.push(seller);
  }

  async findById(id: SellerId): Promise<Seller | null> {
    return this.sellers.find((seller) => seller.sellerId.equals(id)) ?? null;
  }
}

describe('CreateSellerUseCase', () => {
  it('should create and save a seller', async () => {
    const repository = new InMemorySellerRepository();
    const useCase = new CreateSellerUseCase(repository);

    await useCase.execute({
      email: 'seller@test.com',
    });

    expect(repository.sellers).toHaveLength(1);
    expect(repository.sellers[0].sellerEmail.value).toBe('seller@test.com');
  });

  it('should throw when email is invalid', async () => {
    const repository = new InMemorySellerRepository();
    const useCase = new CreateSellerUseCase(repository);

    await expect(
      useCase.execute({
        email: 'invalid-email',
      }),
    ).rejects.toThrow();
  });
});
