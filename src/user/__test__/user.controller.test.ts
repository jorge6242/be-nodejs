import request from "supertest";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";

describe("UserController", () => {
  let app: Express.Application;

  beforeAll(() => {
    useContainer(Container);
    app = createExpressServer({
      controllers: [UserController],
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    Container.reset();
  });

  afterEach(() => {
    Container.remove(UserService);
  });

  it("should return 200 and a token when login is successful", async () => {
    const userServiceMock = {
      findByEmail: jest.fn().mockResolvedValue({
        id: "123",
        email: "test@example.com",
      }),
    };
    Container.set(UserService, userServiceMock);

    const response = await request(app as any)
      .post("/user/login")
      .send({ email: "test@example.com" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(userServiceMock.findByEmail).toHaveBeenCalledWith(
      "test@example.com"
    );
  });

  it("should return 401 when user is not found", async () => {
    Container.remove(UserService);
    const userServiceMock = {
      findByEmail: jest.fn().mockResolvedValue(null),
    };
    Container.set(UserService, userServiceMock);

    const response = await request(app as any)
      .post("/user/login")
      .send({ email: "test@example.com" });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("User not found");
    expect(userServiceMock.findByEmail).toHaveBeenCalledWith(
      "test@example.com"
    );
  });
});
