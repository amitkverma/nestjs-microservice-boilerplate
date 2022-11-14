import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, SignInDto, UserStatusChangeDto } from './../../dtos';
import { ResponseEntity, UserEntity, IApiResponse, LoginEntity } from './../../entities';
import { AuthService } from './auth.service';
import { Authenticate } from '@spotlyt-backend/common'
import { Request } from 'express';
import { IJwtTokenData } from '@spotlyt-backend/data/interfaces';
import { User } from '@prisma/client';




type AuthTokens = { accessToken: string, refreshToken: string };

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Patch('change-user-status')
    @ApiCreatedResponse({ type: ResponseEntity<null> })
    @ApiParam({
        name: 'userId',
        required: true,
        description: 'User Id',
        type: Number
    })
    async changeUserStatus(@Body() userStatus: UserStatusChangeDto): Promise<IApiResponse<null>> {

        await this.authService.userStatusChange(userStatus)
        return {
            apiMeta: {
                message: 'Status Changed Successfully',
                status: 200
            },
            data: null
        }

    }

    @Post('signup')
    @ApiCreatedResponse({ type: ResponseEntity<UserEntity> })
    async signup(@Body() userData: CreateUserDto): Promise<IApiResponse<Omit<User, 'password'>>> {
        if (await this.authService.checkEmailExsists(userData.email)) {
            throw new HttpException('User Already Exsists', HttpStatus.CONFLICT);
        }
        const { password, ...user } = await this.authService.userSignUp(userData)

        return {
            apiMeta: {
                message: 'User Created',
                status: HttpStatus.CREATED
            },
            data: user
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


    // ============ Playground ============= //
    @Get('play')
    @ApiBearerAuth('jwt')
    @ApiCreatedResponse({ type: ResponseEntity<{ message: string }> })
    async play(@Authenticate(['ROLE_1', 'ROLE_2']) currentUser: IJwtTokenData): Promise<IApiResponse<{ message: string }>> {
        console.log("Current User: ", currentUser);

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
