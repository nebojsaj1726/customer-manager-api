import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  getUser(user: UserDocument) {
    return {
      id: user._id,
      firstName: user.firstName,
      email: user.email,
    };
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.getUser(user);
  }

  async create(firstName: string, email: string, hashedPassword: string) {
    const newUser = new this.userModel({
      firstName,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
