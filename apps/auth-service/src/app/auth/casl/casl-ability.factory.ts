import {
    AbilityBuilder,
    PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { jwtUser } from '@spotlyt-backend/data/interfaces';
import { PrismaQuery, createPrismaAbility } from '@casl/prisma';
import { PrismaSubjects } from './generated';


export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}
export type ExtendedSubjects = 'all';
export type AppAbility = PureAbility<[Action, PrismaSubjects | ExtendedSubjects], PrismaQuery>;

@Injectable()
export class CaslAbilityFactory {
    constructor(

    ) { }

    createForUser(user: jwtUser, resourceId: string) {
        const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

        console.log('user: ', user);
        if (user.userId) {
            console.log('normal user', user.id);
            can(Action.Manage, 'User', { id: resourceId })
        }

        if (user.roleName === Role.SUPER_ADMIN) {
            console.log('SUPER ADMIN');
            can(Action.Manage, 'all')
        }

        return build();
    }
}

export enum Role {
    HR = 'Hr',
    SUPER_ADMIN = 'SuperAdmin',
}