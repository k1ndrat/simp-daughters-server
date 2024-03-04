import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './user.model';
import { Types } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ModelType<UserModel>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: dto.email }).lean();

    if (user) {
      throw new ConflictException('email duplicated');
    }

    const newUser: any = await this.userModel.create({
      ...dto,
      password: await hash(dto.password, 10),
    });

    const { password, ...res } = newUser._doc;
    return res;
  }

  async findById(id: Types.ObjectId) {
    return await this.userModel.findById(id).lean();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email }).lean();
  }
}
