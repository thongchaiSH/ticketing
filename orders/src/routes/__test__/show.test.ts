import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("fetchs the order", async () => {
  //Create a tiket
  const tiket = Ticket.build({
    id:mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 30,
  });
  await tiket.save();

  const user = global.signin();
  //make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: tiket.id })
    .expect(201);
  //make request to fetch order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});


it("returns an error if one user get order", async () => {
    //Create a tiket
    const tiket = Ticket.build({
      id:mongoose.Types.ObjectId().toHexString(),
      title: "concert",
      price: 30,
    });
    await tiket.save();
  
    const user = global.signin();
    //make a request to build an order with this ticket
    const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: tiket.id })
      .expect(201);
    //make request to fetch order
    const { body: fetchedOrder } = await request(app)
      .get(`/api/orders/${order.id}`)
      .set("Cookie", global.signin())
      .expect(401);
  });
  