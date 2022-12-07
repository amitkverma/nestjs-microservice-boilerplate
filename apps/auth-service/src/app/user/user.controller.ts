import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatusDto } from './dto/change-user-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationParams, SearchQueryParams } from '@spotlyt-backend/data/dtos';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Patch('change-user-status')
  changeUserActiveStatus(@Body() updateStatusDto: UserStatusDto) {
    return this.userService.changeUserStatus(updateStatusDto.userId, updateStatusDto)

  }

  @Get('tenant/:id')
  getUsersBelongingToATenant(@Param('id') id: string, @Query() { take, skip }: PaginationParams, @Query() { query }: SearchQueryParams) {
    return this.userService.findAll({
      where: {
        tenantId: id,
        isDeleted: false,

        AND: [
          {
            OR: [
              {
                firstName: {
                  contains: query ?? '',
                  mode: 'insensitive'
                }
              },
              {
                lastName: {
                  contains: query ?? '',
                  mode: 'insensitive'
                }
              },
              {
                email: {
                  contains: query ?? '',
                  mode: 'insensitive'
                }
              },
            ],
          }
        ]
      },
      take: +take, skip: +skip
    })
  }

  @Get('tenant/:id/count')
  getUsersBelongingToATenantCount(@Param('id') id: string, @Query() { query }: SearchQueryParams) {
    return this.userService.count({
      tenantId: id,
      isDeleted: false,
      AND: [
        {
          OR: [
            {
              firstName: {
                contains: query ?? '',
                mode: 'insensitive'
              }
            },
            {
              lastName: {
                contains: query ?? '',
                mode: 'insensitive'
              }
            },
            {
              email: {
                contains: query ?? '',
                mode: 'insensitive'
              }
            },
          ],
        }
      ],
    });
  }

  @Get('count')
  count(@Query() { query }: SearchQueryParams) {
    return this.userService.count({
      isDeleted: false,
      OR: [
        {
          firstName: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        },
        {
          lastName: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        },
        {
          email: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        },
      ],
    });
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() { take, skip }: PaginationParams, @Query() { query }: SearchQueryParams) {
    return this.userService.findAll({
      take: +take, skip: +skip, where: {
        OR: [
          {
            firstName: {
              contains: query ?? '',
              mode: 'insensitive'
            }
          },
          {
            lastName: {
              contains: query ?? '',
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: query ?? '',
              mode: 'insensitive'
            }
          },
        ],
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
