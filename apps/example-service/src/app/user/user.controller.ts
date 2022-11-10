import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.users({});
    }

    @Post()
    async signupUser(
      @Body() userData: { name?: string; email: string, password: string },
    ): Promise<User> {
      return this.userService.createUser(userData);
    }
}
