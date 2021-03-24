import { TicketCreatedEvent } from "@ithongchai/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedListener } from "../ticket-created-listener";

const setup = async () => {
  //create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);
  //craete a fake data event
  const data: TicketCreatedEvent["data"] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  //create a fake message object

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg };
};

it("create and save a ticket", async () => {
  const { listener, data, msg } = await setup();

  //call the on message function with the data object + message object
  await listener.onMessage(data, msg);

  //write assertions to make sure a ticket was created
  const ticket=await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title)
  expect(ticket!.price).toEqual(data.price)
});

it("asks a message", async () => {
  const { listener, data, msg } = await setup();

  //call the on message function with the data object + message object
  await listener.onMessage(data, msg);

  //write assertions to make sure a ticket was created
  expect(msg.ack).toHaveBeenCalled()
});
