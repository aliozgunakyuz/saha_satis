import {Router} from 'express';
const router = Router();

import * as controller from '../controllers/usercontrollers.js';

//GET
router.route('/user/:mail').get(controller.getUser);
router.route('/otpmaker').get(controller.OTPgenerator);
router.route('/otpverifier').get(controller.OTPverify);
router.route('/resetSession').get(controller.resetSession);

//PUT
router.route('/userupdate').put(controller.updateUser);
router.route('/passwordreset').put(controller.resetpassword);

//POST
router.route('/register').post(controller.register);
//router.route('registermail').post();
router.route('/auth').post((req,res) => res.end());
router.route('/login').post(controller.userVerification,controller.login);

//DELETE




export default router;