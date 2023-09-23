import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entity/User";
import { userLoader } from "../loader/userLoader";
import { UserService } from "../service/user.service";
import { DetailService } from "../service/userDetail.service";


@Resolver()
export class UserResolver {
  constructor(){}
//   @Query(() => User) 
//   async user() {
//     const user = await User.findOne({where:{id:1}});
//     return user;
//   }

  @Query(() => User)
  async user(@Arg("id") id: number) {
  // 보내는 쪽 (userService)
  UserService.sendMessage('Hello from UserService', 'myQueue');

  // 받는 쪽 (detailService)
  DetailService.receiveMessage('myQueue');
  return userLoader().load(id);
  }


  @Mutation(() => User)
  async createUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("age") age: number
  ) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.age = age;
    await User.save(user);
    return user;
  }
}
