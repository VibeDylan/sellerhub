import { Producer } from 'kafkajs';
import { EventPublisher } from '../../../application/ports/event-publisher';
import { SellerApprovedEvent } from '../../../domain/events/seller-approved.event';
import { SellerCreatedEvent } from '../../../domain/events/seller-created.event';

export class KafkaEventPublisher implements EventPublisher {
  constructor(private readonly producer: Producer) {}

  async publish(events: (SellerApprovedEvent | SellerCreatedEvent)[]): Promise<void> {
    if (events.length === 0) {
      return;
    }

    await this.producer.send({
      topic: 'seller-events',
      messages: events.map((event) => ({
        value: JSON.stringify({ type: event.constructor.name, payload: event }),
      })),
    });
  }
}
