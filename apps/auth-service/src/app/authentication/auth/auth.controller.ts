import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, SignInDto } from './../../dtos';
import { ResponseEntity, UserEntity, IApiResponse, LoginEntity } from './../../entities';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('signup')
    @ApiCreatedResponse({ type: ResponseEntity<UserEntity> })
    async signup(@Body() createUserDto: CreateUserDto): Promise<IApiResponse<Omit<User, "password">>> {
        if (await this.authService.checkEmailExsists(createUserDto.email)) {
            throw new HttpException('User Already Exsists', HttpStatus.CONFLICT);
        }
        const user = await this.authService.userSignUp(createUserDto)

        return {
            apiMeta: {
                message: 'User Created',
                status: 200
            },
            data: user
        }
    }



    @Post('login')
    @ApiCreatedResponse({ type: ResponseEntity<LoginEntity> })
    async login(@Body() userDto: SignInDto): Promise<IApiResponse<{ accessToken: string, refreshToken: string }>> {
        const tokens = await this.authService.login(userDto.email, userDto.password);
        return {
            apiMeta: {
                message: 'login successful',
                status: 200
            },
            data: tokens
        }
    }

}
