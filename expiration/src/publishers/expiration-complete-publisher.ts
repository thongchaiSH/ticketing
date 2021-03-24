import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@ithongchai/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
