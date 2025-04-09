import { userRepository } from '#core/repositories/user.js';

class UserController {
  async createCard(req, res) {
    const userId = req.ctx.sub;
    const { schedules, locations, ...rest } = req.body;
    await userRepository.updateUser(userId, {
      ...rest,
      age: Number(rest.age),
    });

    const createdCard = await userRepository.createCard(userId, {
      schedules,
      locations,
    });

    res.json(createdCard).status(201);
  }
}

export const userController = new UserController();
