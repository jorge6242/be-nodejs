"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const user_controller_1 = require("../user.controller");
const user_service_1 = require("../user.service");
describe("UserController", () => {
    let app;
    beforeAll(() => {
        (0, routing_controllers_1.useContainer)(typedi_1.Container);
        app = (0, routing_controllers_1.createExpressServer)({
            controllers: [user_controller_1.UserController],
        });
    });
    beforeEach(() => {
        jest.clearAllMocks();
        typedi_1.Container.reset();
    });
    afterEach(() => {
        typedi_1.Container.remove(user_service_1.UserService);
    });
    it("should return 200 and a token when login is successful", async () => {
        const userServiceMock = {
            findByEmail: jest.fn().mockResolvedValue({
                id: "123",
                email: "test@example.com",
            }),
        };
        typedi_1.Container.set(user_service_1.UserService, userServiceMock);
        const response = await (0, supertest_1.default)(app)
            .post("/user/login")
            .send({ email: "test@example.com" });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(userServiceMock.findByEmail).toHaveBeenCalledWith("test@example.com");
    });
    it("should return 401 when user is not found", async () => {
        typedi_1.Container.remove(user_service_1.UserService);
        const userServiceMock = {
            findByEmail: jest.fn().mockResolvedValue(null),
        };
        typedi_1.Container.set(user_service_1.UserService, userServiceMock);
        const response = await (0, supertest_1.default)(app)
            .post("/user/login")
            .send({ email: "test@example.com" });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("User not found");
        expect(userServiceMock.findByEmail).toHaveBeenCalledWith("test@example.com");
    });
});
