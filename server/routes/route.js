import {Router} from 'express';
const router = Router();

import * as controller from '../controllers/usercontrollers.js';
import * as p_controller from '../controllers/productcontroller.js';
import { registerMail } from '../controllers/mailsender.js';
import Auth, {local_variables} from '../middlewares/auth.js';


//GET
//user
router.route('/user/:mail').get(controller.getUser);
router.route('/otpmaker').get(controller.userVerification, local_variables, controller.OTPgenerator);
router.route('/otpverifier').get(controller.OTPverify);
router.route('/resetSession').get(controller.resetSession);

//product

//client

//PUT
//user
router.route('/userupdate').put(Auth, controller.updateUser);
router.route('/passwordreset').put(controller.userVerification,controller.resetpassword);

//product

//client

//POST
//user
router.route('/register').post(controller.register);
router.route('/registermail').post(registerMail);
router.route('/auth').post(controller.userVerification, (req,res) => res.end());
router.route('/login').post(controller.userVerification,controller.login);

//product
router.route('/addproduct').post(p_controller.addproduct);

//client

//DELETE
//user

//product

//client




export default router;