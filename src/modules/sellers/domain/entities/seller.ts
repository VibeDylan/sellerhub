import { SellerStatus } from "../enums/seller.status";
import { SellerId } from "../value-objects/seller-id";
import { SellerEmail } from "../value-objects/seller.email";

export class Seller {
    private readonly id: SellerId;
    private email: SellerEmail;
    private status: SellerStatus;
    private readonly createdAt: Date;

    private constructor(
        id: SellerId,
        email: SellerEmail,
        createdAt: Date
    ) {
        this.id = id;
        this.email = email;
        this.status = SellerStatus.PENDING;
        this.createdAt = createdAt;
    }

    static create(
        id: SellerId,
        email: SellerEmail
    ): Seller {
        return new Seller(
            id,
            email,
            new Date()
        );
    }

    get sellerId(): SellerId {
        return this.id;
    }

    get sellerEmail(): SellerEmail {
        return this.email;
    }

    get sellerStatus(): SellerStatus {
        return this.status;
    }

    get creationDate(): Date {
        return this.createdAt;
    }
}