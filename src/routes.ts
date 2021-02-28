import express from 'express';
import AuthMiddleware from './app/middlewares/AuthenticationMiddleware'
import BalanceMiddleware from './app/middlewares/BalanceMiddleware'

import SearchPerson from './app/controllers/SearchPersonController'
import UserController from './app/controllers/UserController';
import AuthenticationController from './app/controllers/AuthenticationController';
import AdminController from './app/controllers/AdminController';

const router = express.Router();

router.route('/user')
    .post(UserController.store);

router.route('/authentication')
    .post(AuthenticationController.authenticate);

router.route('/admin')
    .post(AdminController.setCredits);

router.get('/persons/search/', [AuthMiddleware, BalanceMiddleware], SearchPerson.show);

export default router;  