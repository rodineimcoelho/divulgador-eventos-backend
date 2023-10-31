import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    await user.hashPassword();
    await this.usersRepository.save(user);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  findById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException();

    if (!(await user.comparePassword(updateUserDto.currentPassword)))
      throw new ForbiddenException(['wrong password']);

    const updatedUser = this.usersRepository.create({
      ...user,
      ...updateUserDto
    });

    if (updateUserDto.password) await updatedUser.hashPassword();
    await this.usersRepository.save(updatedUser);
  }
}
