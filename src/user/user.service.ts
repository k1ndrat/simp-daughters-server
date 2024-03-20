import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.model';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: dto.email }).lean();

    if (user) {
      throw new ConflictException('An account with this email already exists');
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
