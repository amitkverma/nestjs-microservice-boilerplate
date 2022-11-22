import { Controller, Get, Post, Body, Param, Req, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, ResetPasswordDto, ChangePasswordDto } from './dto/auth.dto';
import { Authenticate } from '@spotlyt-backend/common';
import { jwtUser } from '@spotlyt-backend/data/interfaces';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('me')
  @ApiBearerAuth('jwt')
  async currentUser(@Authenticate() currentUser: jwtUser) {
    const { password, ...user } = await this.authService.getUser(currentUser.id);
    return user;
  }

  @Get('refresh/:id')
  async refresh(@Req() req: Request, @Param('id') id: string) {
    const token = req.headers['authorization'];
    if (!token) {
      throw new HttpException('Refresh Token Needed', HttpStatus.FORBIDDEN);
    }

    return this.authService.refresh(token.split(' ')[1], id);
  }

  @Post('/login')
  login(@Body() loginDtoPayload: LoginDto) {
    return this.authService.login(loginDtoPayload.email, loginDtoPayload.password);
  }


  @Post('/reset-password')
  resetPassword(@Body() resetPasswordPayload: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordPayload.userId,
      resetPasswordPayload.oldPassword,
      resetPasswordPayload.newPassword);
  }

  @Patch('/change-password')
  changePassword(@Body() changePasswordPayload: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordPayload.userId, changePasswordPayload.newPassword)
  }

}
