import {
  JsonController,
  Post,
  Body,
  Res,
  Get,
  Put,
  Param,
  UnauthorizedError,
} from "routing-controllers";
import { Service } from "typedi";
import { Response } from "express";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import jwt from "jsonwebtoken";
import { SECRET } from '../utils/contants';

@Service()
@JsonController("/user")
export class UserController {
  constructor(private service: UserService) {}

  @Post("/login")
  async login(@Body() body: { email: string }, @Res() response: Response): Promise<Response> {
    try {
      const user = await this.service.findByEmail(body.email);
      console.log('user ', user);
      if (!user) {
        throw new UnauthorizedError("User not found");
      }

      const token = jwt.sign({ id: user.id.toString(), email: user.email }, SECRET, {
        expiresIn: '48h'
      });

      return response.json({ token, user });
    } catch (error: any) {
      console.log('error ', error);
      if (error instanceof UnauthorizedError) {
        return response.status(401).json({ message: "User not found" });
      }
      console.error("Login failed:", error);
      return response.status(401).json({ message: "Login failed", error: error.message });
    }
  }

  @Post("/")
  async createUser(
    @Body({ validate: true }) body: CreateUserDto,
    @Res() response: Response
  ): Promise<Response> {
    try {
      const newUser = await this.service.createUser(body);
      if (!newUser) {
        return response.status(400).json({ message: "Alias or email already exists" });
      }
      return response.status(201).json(newUser);
    } catch (error: any) {
      console.error("Failed to create user:", error);
      return response
        .status(400)
        .json({ message: "Error al crear el usuario", error: error.message });
    }
  }

  @Put("/:id")
  async updateUser(
    @Param("id") id: string,
    @Body({ validate: true }) body: UpdateUserDto,
    @Res() response: Response
  ): Promise<Response> {
    try {
      const updatedUser = await this.service.updateUser(id, body);
      return response.status(200).json(updatedUser);
    } catch (error: any) {
      console.error("Failed to update user:", error);
      return response
        .status(400)
        .json({
          message: "Error al actualizar el usuario",
          error: error.message,
        });
    }
  }

  @Get("/")
  async getAll(@Res() response: Response): Promise<Response> {
    try {
      const newUser = await this.service.getAll();
      return response.status(201).json(newUser);
    } catch (error: any) {
      console.error("Failed to get user:", error);
      return response
        .status(400)
        .json({ message: "Error al obtener el usuario", error: error.message });
    }
  }
}
