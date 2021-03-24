import request from "supertest";
import { app } from "../../app";

it("reponse with details about the current user", async () => {
//   const authResponse = await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "test@test.com",
//       password: "password",
//     })
//     .expect(201);
//   const cookie = authResponse.get("Set-Cookie");


  const cookie = await global.signin();

  const response = await request(app).get("/api/users/currentuser")
  .set('Cookie', cookie)
  .expect(200);

//   console.log(response.body);
  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('response with null if not authenticate',async () => {
    const response = await request(app).get("/api/users/currentuser")
    .expect(200);

    expect(response.body.currentUser).toEqual(null);
});
