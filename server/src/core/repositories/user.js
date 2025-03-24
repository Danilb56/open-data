import { prisma } from '#core/db.js';

class UserRepository {
	async createUser(user) {
		const createdUser = await prisma.user.create({ data: user });
		return createdUser;
	}

	async findUserByEmail(email) {
		const user = await prisma.user.findUnique({ where: { email } });
		return user;
	}

	async findUserById(id) {
		const user = await prisma.user.findUnique({ where: { id } });
		return user;
	}

	async findUsers() {
		const users = await prisma.user.findMany();
		return users;
	}

	async updateUser(id, user) {
		const updatedUser = await prisma.user.update({ where: { id }, data: user });
		return updatedUser;
	}
}

export const userRepository = new UserRepository();
