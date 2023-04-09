"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entity/User");
const DataLoader = require("dataloader");
let UserResolver = class UserResolver {
    createUserLoader() {
        return new DataLoader((ids) => __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.User.findByIds(ids);
            const userIdToUser = {};
            users.forEach((user) => {
                userIdToUser[user.id] = user;
            });
            return ids.map((id) => userIdToUser[id]);
        }));
    }
    //   @Query(() => [User]) // 여기에 데코레이터 추가
    //   async users() {
    //     const users = await User.find();
    //     console.log(users);
    //     return users;
    //   }
    users(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ids) {
                const loader = this.createUserLoader();
                return loader.loadMany(ids);
            }
            const users = yield User_1.User.find();
            console.log(users);
            return users;
        });
    }
    //   @Mutation(() => User)
    //   async createUser(
    //     @Arg('name') name: string,
    //     @Arg('email') email: string,
    //     @Arg('password') password: string,
    //     @Arg('age') age: number
    //   ) {
    //     const user = new User();
    //     user.name = name;
    //     user.email = email;
    //     user.password = password;
    //     user.age = age;
    //     await User.save(user);
    //     return user;
    //   }
    createUser(name, email, password, age) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User();
            user.name = name;
            user.email = email;
            user.password = password;
            user.age = age;
            yield User_1.User.save(user);
            const loader = this.createUserLoader();
            loader.clear(user.id).prime(user.id, user);
            return user;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Args)({ name: "ids", type: () => [type_graphql_1.Int], nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("email")),
    __param(2, (0, type_graphql_1.Arg)("password")),
    __param(3, (0, type_graphql_1.Arg)("age")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
