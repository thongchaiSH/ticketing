import { Publisher, Subjects, TicketCreatedEvent } from "@ithongchai/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
