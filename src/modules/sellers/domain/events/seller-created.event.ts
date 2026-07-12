export interface SellerCreatedEventPayload {
  id: string;
  email: string;
  occurredAt: Date;
}

export class SellerCreatedEvent {
  readonly id: string;

  readonly email: string;

  readonly occurredAt: Date;

  constructor(payload: SellerCreatedEventPayload) {
    this.id = payload.id;
    this.email = payload.email;
    this.occurredAt = payload.occurredAt;
  }
}
