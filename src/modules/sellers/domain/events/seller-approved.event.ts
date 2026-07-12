export interface SellerApprovedEventPayload {
  id: string;
  occurredAt: Date;
}

export class SellerApprovedEvent {
  readonly id: string;

  readonly occurredAt: Date;

  constructor(payload: SellerApprovedEventPayload) {
    this.id = payload.id;
    this.occurredAt = payload.occurredAt;
  }
}
