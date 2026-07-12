import { SellerApprovedEvent } from '../../domain/events/seller-approved.event';
import { SellerCreatedEvent } from '../../domain/events/seller-created.event';

export interface EventPublisher {
  publish(events: (SellerApprovedEvent | SellerCreatedEvent)[]): Promise<void>;
}
