import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entity/User";
import { userLoader } from "../loader/userLoader";

@Resolver()
export class UserResolver {
//   @Query(() => User) 
//   async user() {
//     const user = await User.findOne({where:{id:1}});
//     return user;
//   }

  @Query(() => User)
  async user(@Arg("id") id: number) {
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
