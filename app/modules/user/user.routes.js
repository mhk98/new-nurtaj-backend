const { ENUM_USER_ROLE } = require('../../enums/user');
const auth = require('../../middlewares/auth');
const { uploadSingle } = require('../../middlewares/upload');
const UserController = require('./user.controller');
const router = require('express').Router();

// Define routes
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/', auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), UserController.getAllUserFromDB); // This gets all users
router.get('/:id',  UserController.getUserById); // Use :id to get a user by ID
router.delete('/:id', auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), UserController.deleteUserFromDB);
router.patch('/:id', auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), uploadSingle, UserController.updateUserFromDB);

// Export the router
const UserRoutes = router;
module.exports =  UserRoutes ;
