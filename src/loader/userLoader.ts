import DataLoader from 'dataloader';
import { User } from '../entity/User';

export const userLoader = () => new DataLoader<number, User>(async (userIds) => {
const users = await User.findByIds(userIds as number[]);
const userMap = users.reduce((map, user) => {
map[user.id] = user;
return map;
}, {} as { [key: number]: User });

return userIds.map((userId) => userMap[userId]);
});