import { Publisher, OrderCancelledEvent, Subjects } from "@ithongchai/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
