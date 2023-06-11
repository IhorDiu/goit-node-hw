/* eslint-disable no-undef */

const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_HOST_TEST, PORT } = process.env;

const loginData = {
  email: "dude@mail.com",
  password: "123456",
};

describe("test login controller", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await request(app).post("/api/users/register").send(loginData);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("the response must have a status code of 200", async () => {
    const {statusCode} = await request(app)
      .post("/api/users/login")
      .send(loginData);
    expect(statusCode).toBe(200);
  });

  test("the response must return a token", async() => {
    const {body} = await request(app)
      .post("/api/users/login")
      .send(loginData);

     expect(body.token).toBeDefined();

  });

  test("the response must return a user object with 2 fields email and subscription with the String data type", async() => {
    const {body} = await request(app)
    .post("/api/users/login")
    .send(loginData);

   expect(body.user).toStrictEqual(
    expect.objectContaining({
      email: expect.any(String),
      subscription: expect.any(String),
    }),
   );
  });

});
