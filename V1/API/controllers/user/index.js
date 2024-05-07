const db = require('../../db/models');
const User = db.User;
const modelService = require('../../services/modelService');
const formatService = require('../../services/formatService');

class UserController {
    constructor() {}
    /**
    * Get data for the current user
    */
    async getCurrentUser(req, res) {
        try {
            const user = await User.findByPk(req.auth.userId, {
                attributes: { exclude: ['Password'] }
            });
            res.status(200).json(await formatService.userFormat(user));
        } catch (error) {
            console.log(User.class)
            res.status(500).json({ error });
        }
    }

    /**
    * modifyUser - Let an admin or the user modify its data.
    * 
    * @returns {Object}  The user object, or an error object if the user was not found or the request was not authorized.
    */
    async modifyUser(req, res) {
        await modelService.modifyModel(User, req.auth.userId, req.body, res);
    }

    /**
     * getOneUser - Retrieve a single user from the database.
     * 
     * @returns {Object}  The user object, or an error object if the user was not found or the request was not authorized.
     */
    async getOneUser(req, res) {
        try {
            const user = await User.findByPk(req.params.userId, {
                attributes: { exclude: ['Password'] }
            });
            res.status(200).json(await formatService.userFormat(user));
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    /**
     * getOneUser - Retrieve a single user from the database.
     * 
     * @returns {Object}  The user object, or an error object if the user was not found or the request was not authorized.
     */
    async isSeller(req, res) {
        try {
            const user = await User.findByPk(req.auth.userId);
            if (user.IsSeller) {
                res.status(200).json({ message: 'User is a seller.' });
            } else {
                res.status(500).json({ message: 'User is not a seller.' });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    /**
    * Get data from the user
    */
    deleteUser(req, res) {
        modelService.deleteModel(User, req.auth.userId, res);
    }
}

module.exports = new UserController();
