const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validators');
const NotFound404 = require('../Errors/NotFound404');

router.post('/signin', validateLogin, login);

router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', userRouter);

router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFound404('Маршрут не найден'));
});

module.exports = router;
