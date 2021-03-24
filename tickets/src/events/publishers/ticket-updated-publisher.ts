import { Publisher, Subjects, TicketUpdatedEvent } from "@ithongchai/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
