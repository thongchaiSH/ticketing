import { Subjects, Publisher, PaymentCretedEvent } from "@ithongchai/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCretedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
