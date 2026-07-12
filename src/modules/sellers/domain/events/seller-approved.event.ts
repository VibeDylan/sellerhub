export interface SellerApprovedEventPayload {
  id: string;
  occuredAt: Date;
}

export class SellerApprovedEvent {
  readonly id: string;

  readonly occurredAt: Date;

  constructor(payload: SellerApprovedEventPayload) {
    this.id = payload.id;
    this.occurredAt = payload.occuredAt;
  }
}
