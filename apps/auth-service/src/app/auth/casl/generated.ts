import { Subjects } from '@casl/prisma';
import { 
  User,
  Role
} from '@prisma/client';

export type PrismaSubjects = Subjects<{
  User: User;
  Role: Role
  // role not needed
}>;
