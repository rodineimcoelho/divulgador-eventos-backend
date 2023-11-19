import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirmation, ...data } = createUserDto;
    data.password = await bcrypt.hash(data.password, 10);
    await this.prismaService.user.create({
      data
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(['user not found']);
    return user;
  }

  excludePasswordFields(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, passwordUpdateDate, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirmation, currentPassword, ...data } = updateUserDto;

    const user = await this.findById(id);

    if (!(await bcrypt.compare(currentPassword, user.password)))
      throw new UnauthorizedException(['wrong password']);

    await this.prismaService.user.update({
      where: { id },
      data: {
        ...data,
        password: data.password
          ? await bcrypt.hash(data.password, 10)
          : undefined,
        passwordUpdateDate: data.password ? new Date() : undefined
      }
    });
  }
}
