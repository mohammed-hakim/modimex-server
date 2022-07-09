import { Controller } from '@nestjs/common';
import { LoginUser, RegisterUser } from '@commerce/shared';
import { MessagePattern } from '@nestjs/microservices';
import { ObjectID } from 'typeorm';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly users: UserService) {}
  @MessagePattern('users')
  index(data) {
    return this.users.get(data);
  }
  @MessagePattern('findById')
  findById(data) {
    return this.users.findById(data);
  }
  @MessagePattern('search_users')
  search(data) {
    return this.users.search(data);
  }
  @MessagePattern('login-user')
  login(data: LoginUser) {
    return this.users.login(data);
  }
  @MessagePattern('update_user')
  update(data: any) {
    let { id } = data;
    return this.users.update(id, data);
  }
  @MessagePattern('find-user-email')
  findWithEmail(data: LoginUser) {
    return this.users.findWithEmail(data);
  }
  @MessagePattern('register-user')
  register(data: RegisterUser) {
    return this.users.register(data);
  }
  @MessagePattern('current-loggedin-user')
  me(id: ObjectID) {
    return this.users.me({ id });
  }
  @MessagePattern('fetch-user-by-id')
  fetchUserById(id: string) {
    return this.users.findById(id);
  }
  @MessagePattern('fetch-users-by-ids')
  fetchUsersByIds(ids: Array<String>) {
    return this.users.fetchUsersByIds(ids);
  }
  @MessagePattern('order_completed')
  transactionCompleted(data) {
    return this.users.transactionCompleted(data);
  }
  @MessagePattern('add_promo_user')
  addPromo(data) {
    return this.users.addPromo(data);
  }
}
