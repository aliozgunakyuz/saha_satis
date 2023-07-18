import {Router} from 'express';
const router = Router();

import * as controller from '../controllers/usercontrollers.js';
import Auth, {local_variables} from '../middlewares/auth.js';

//GET
router.route('/user/:mail').get(controller.getUser);
router.route('/otpmaker').get(controller.userVerification, local_variables, controller.OTPgenerator);
router.route('/otpverifier').get(controller.OTPverify);
router.route('/resetSession').get(controller.resetSession);

//PUT
router.route('/userupdate').put(Auth, controller.updateUser);
router.route('/passwordreset').put(controller.userVerification,controller.resetpassword);

//POST
router.route('/register').post(controller.register);
//router.route('registermail').post();
router.route('/auth').post((req,res) => res.end());
router.route('/login').post(controller.userVerification,controller.login);

//DELETE




export default router;