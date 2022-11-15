import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, SignInDto, UserStatusChangeDto, ResetPasswordDto, RoleUpdateDto, ForgetPasswordDto } from './dtos';
import { AuthService } from './auth.service';
import { Authenticate } from '@spotlyt-backend/common'
import { Request } from 'express';



type AuthTokens = { accessToken: string, refreshToken: string };
@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) { }




    @Patch('change-password/:email')
    async changePassword(@Param('email') email: string, @Body() forgetPasswordPayload: ForgetPasswordDto) {
        return this.authService.changePassword(email, forgetPasswordPayload.newPassword)
    }


    @Post('forget-password')
    @ApiParam({
        name: 'token',
        type: String,
        description: `Token Needed`
    })
    async forgetPassword(@Query('token') token: string, @Body() forgetPasswordPayload: ForgetPasswordDto) {
        return this.authService.forgetPassword(token, forgetPasswordPayload.newPassword);
    }



    @Get('activate')
    @ApiParam({
        name: 'token',
        type: String,
        description: `Token Needed`
    })
    async activateUser(@Query('token') token: string) {
        return this.authService.activateUser(token)
    }


    @Get('generate-token/for/:email')
    @ApiParam({
        name: 'tokenType',
        type: String,
        description: `Token Type Needed`
    })
    async generateEmailVerificationToken(@Param('email') email: string,
        @Query('tokenType') tokenType: string) {
        console.log(tokenType, email);
        return this.authService.generateVerificationToken(email, tokenType);
    }


    @Patch('change-role')
    async updateUserRole(@Body() roleUpdatePayload: RoleUpdateDto) {
        return this.authService.updateUserRole(roleUpdatePayload);
    }

    @Patch('reset-password')
    async resetUserPassword(@Body() resetPasswordPayload: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordPayload);
    }


    @Patch('change-user-status')
    async changeUserStatus(@Body() userStatus: UserStatusChangeDto) {
        return this.authService.userStatusChange(userStatus);
    }

    @Post('signup')
    async signup(@Body() userData: CreateUserDto) {
        if (await this.authService.checkEmailExsists(userData.email)) {
            throw new HttpException('User Already Exsists', HttpStatus.CONFLICT);
        }
        const { password, ...user } = await this.authService.userSignUp(userData)

        return user;
    }



    @Post('login')
    async login(@Body() userDto: SignInDto) {
        return this.authService.login(userDto.email, userDto.password);
    }

    @Get('refresh')
    async refresh(@Req() req: Request) {
        const token = req.header('authorization')
        if (!token) {
            throw new HttpException('Refresh Token Needed', HttpStatus.FORBIDDEN);
        }
        return this.authService.refresh(token.split(' ')[1]);
    }


    // ============ Playground ============= //
    // @Get('play')
    // @ApiBearerAuth('jwt')
    // @ApiCreatedResponse({ type: ResponseEntity<{ message: string }> })
    // async play(@Authenticate(['ROLE_1', 'ROLE_2']) currentUser: IJwtTokenData): Promise<IApiResponse<{ message: string }>> {
    //     console.log("Current User: ", currentUser);
    //     return {
    //         apiMeta: {
    //             message: 'Successful',
    //             status: 200
    //         },
    //         data: {
    //             message: 'WORKING'
    //         }
    //     }
    // }

}
