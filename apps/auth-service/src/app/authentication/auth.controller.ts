import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, SignInDto, UserStatusChangeDto, ResetPasswordDto, RoleUpdateDto, ForgetPasswordDto } from './dtos';
import { ResponseEntity, UserEntity, IApiResponse, LoginEntity } from '../entities';
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




    @Patch('change-password/:email')
    async changePassword(@Param('email') email: string, @Body() forgetPasswordPayload: ForgetPasswordDto): Promise<IApiResponse<null>> {
        await this.authService.changePassword(email, forgetPasswordPayload.newPassword)
        return {
            apiMeta: {
                message: 'Password Changed Successfully',
                status: HttpStatus.OK
            },
            data: null
        }
    }


    @Post('forget-password')
    @ApiCreatedResponse({ type: ResponseEntity<null> })
    @ApiParam({
        name: 'token',
        type: String,
        description: `Token Needed`
    })
    async forgetPassword(@Query('token') token: string, @Body() forgetPasswordPayload: ForgetPasswordDto): Promise<IApiResponse<null>> {
        await this.authService.forgetPassword(token, forgetPasswordPayload.newPassword);
        return {
            apiMeta: {
                message: 'Password Changed Successfully',
                status: HttpStatus.OK
            },
            data: null
        }
    }



    @Get('activate')
    @ApiCreatedResponse({ type: ResponseEntity<null> })
    @ApiParam({
        name: 'token',
        type: String,
        description: `Token Needed`
    })
    async activateUser(@Query('token') token: string): Promise<IApiResponse<null>> {
        await this.authService.activateUser(token);
        return {
            apiMeta: {
                message: 'User Status Active',
                status: HttpStatus.OK
            },
            data: null
        }
    }


    @Get('generate-token/for/:email')
    @ApiCreatedResponse({ type: ResponseEntity<{ token: string, tokenType: string }> })
    @ApiParam({
        name: 'tokenType',
        type: String,
        description: `Token Type Needed`
    })
    async generateEmailVerificationToken(@Param('email') email: string,
        @Query('tokenType') tokenType: string): Promise<IApiResponse<{ token: string, tokenType: string }>> {
        const tokenData = await this.authService.generateVerificationToken(email, tokenType);
        return {
            apiMeta: {
                message: 'Token Generated Successfully',
                status: HttpStatus.OK
            },
            data: tokenData
        }
    }


    @Patch('change-role')
    @ApiCreatedResponse({ type: ResponseEntity<null> })
    async updateUserRole(@Body() roleUpdatePayload: RoleUpdateDto): Promise<IApiResponse<null>> {

        await this.authService.updateUserRole(roleUpdatePayload);
        return {
            apiMeta: {
                message: 'Password Reset Successfully',
                status: HttpStatus.NO_CONTENT
            },
            data: null
        }

    }

    @Patch('reset-password')
    @ApiCreatedResponse({ type: ResponseEntity<null> })
    async resetUserPassword(@Body() resetPasswordPayload: ResetPasswordDto): Promise<IApiResponse<null>> {

        await this.authService.resetPassword(resetPasswordPayload);
        return {
            apiMeta: {
                message: 'Password Reset Successfully',
                status: HttpStatus.NO_CONTENT
            },
            data: null
        }

    }


    @Patch('change-user-status')
    @ApiCreatedResponse({ type: ResponseEntity<null> })
    async changeUserStatus(@Body() userStatus: UserStatusChangeDto): Promise<IApiResponse<null>> {

        await this.authService.userStatusChange(userStatus)
        return {
            apiMeta: {
                message: 'Status Changed Successfully',
                status: HttpStatus.NO_CONTENT
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
