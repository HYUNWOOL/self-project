"use strict";
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
exports.userLoader = exports.batchUsers = void 0;
const DataLoader = require("dataloader");
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const batchUsers = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, typeorm_1.getConnection)();
    const userRepository = connection.getRepository(User_1.User);
    const users = yield userRepository.findByIds(ids);
    const usersMap = new Map();
    users.forEach((user) => {
        var _a;
        if (usersMap.has(user.id)) {
            (_a = usersMap.get(user.id)) === null || _a === void 0 ? void 0 : _a.push(user);
        }
        else {
            usersMap.set(user.id, [user]);
        }
    });
    return ids.map((id) => usersMap.get(id) || []);
});
exports.batchUsers = batchUsers;
const userLoader = () => new DataLoader(exports.batchUsers);
exports.userLoader = userLoader;
