class UserController {

    async createCard(req, res) {
        const userId = req.ctx.sub;
        
    }
}

export const userController = new UserController();
