import { Seller } from '../../../domain/entities/seller';
import { SellerEmail } from '../../../domain/value-objects/seller.email';
import { SellerId } from '../../../domain/value-objects/seller-id';
import { PrismaSellerRepository } from './prisma-seller.repository';

describe('PrismaSellerRepository', () => {
  it('should save a seller', async () => {
    const repository = new PrismaSellerRepository();

    const seller = Seller.create(new SellerId('seller-123'), new SellerEmail('seller@test.com'));

    await expect(repository.save(seller)).resolves.not.toThrow();
  });
});
