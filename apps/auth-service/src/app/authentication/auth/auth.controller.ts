import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, SignInDto } from './../../dtos';
import { ResponseEntity, UserEntity, IApiResponse, LoginEntity } from './../../entities';
import { AuthService } from './auth.service';
import { Authenticate } from '@spotlyt-backend/common'
import { Request } from 'express';



type AuthTokens = { accessToken: string, refreshToken: string };

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('signup')
    @ApiCreatedResponse({ type: ResponseEntity<UserEntity> })
    async signup(@Body() createUserDto: CreateUserDto): Promise<IApiResponse<AuthTokens>> {
        if (await this.authService.checkEmailExsists(createUserDto.email)) {
            throw new HttpException('User Already Exsists', HttpStatus.CONFLICT);
        }
        const user = await this.authService.userSignUp(createUserDto)

        const tokens = await this.authService.login(user.email, createUserDto.password);
        return {
            apiMeta: {
                message: 'User Created',
                status: HttpStatus.CREATED
            },
            data: tokens
        }
    }



    @Post('login')
    @ApiOkResponse({ type: ResponseEntity<LoginEntity> })
    async login(@Body() userDto: SignInDto): Promise<IApiResponse<AuthTokens>> {
        const tokens = await this.authService.login(userDto.email, userDto.password);
        return {
            apiMeta: {
                message: 'login successful',
                status: HttpStatus.OK
            },
            data: tokens
        }
    }

    @Get('refresh')
    @ApiOkResponse({ type: ResponseEntity<LoginEntity> })
    async refresh(@Req() req: Request): Promise<IApiResponse<any>> {
        const token = req.header('authorization')
        if (!token) {
            throw new HttpException('Refresh Token Needed', HttpStatus.FORBIDDEN);
        }

        const tokens = await this.authService.refresh(token.split(' ')[1]);

        return {
            apiMeta: {
                message: 'refresh sucessful',
                status: HttpStatus.OK,
            },
            data: tokens
        }
    }



    @Get('play')
    @ApiBearerAuth('jwt')
    @ApiCreatedResponse({ type: ResponseEntity<{ message: string }> })
    async play(@Authenticate(['ROLE_1', 'ROLE_2']) jwtToken: unknown): Promise<IApiResponse<{ message: string }>> {
        return {
            apiMeta: {
                message: 'Successful',
                status: 200
            },
            data: {
                message: 'WORKING'
            }
        }
    }

}
