import {Router} from 'express';
const router = Router();

import * as controller from '../controllers/usercontrollers.js';
import * as p_controller from '../controllers/productcontroller.js';
import * as c_controller from '../controllers/clientcontroller.js'
import * as d_controller from '../controllers/discountcontroller.js';
import * as cart_controller from '../controllers/cartcontroller.js'
import * as sale_controller from '../controllers/finalsalecontroller.js'
import { registerMail } from '../controllers/mailsender.js';
import Auth, {local_variables} from '../middlewares/auth.js';


//GET
//user
router.route('/user/:mail').get(controller.getUser);
router.route('/getuser').get(controller.getuser);
router.route('/otpmaker').get(controller.userVerification, local_variables, controller.OTPgenerator);
router.route('/otpverifier').get(controller.OTPverify);
router.route('/resetSession').get(controller.resetSession);
//product
router.get('/getproducts', p_controller.getproducts);
router.get('/getproductbyID/:productId', p_controller.getproductbyID);
//client
router.get('/getclients', c_controller.getclients);
router.get('/getclientbyID/:clientId', c_controller.getclientbyID);
//discounts
router.get('/getdiscounts', d_controller.getdiscounts);
router.get('/check-discount/:code', d_controller.discountcheck);


//PUT
//user
router.route('/userupdate').put(Auth, controller.updateUser);
router.route('/passwordreset').put(controller.userVerification,controller.resetpassword);
router.put('/users/:userId/:updatedUserType', controller.updateUserType);
//product
router.put('/products/:productId', p_controller.updateProduct);
//client
router.put('/clients/:clientId', c_controller.updateClient);

//POST
//user
router.route('/register').post(controller.register);
router.route('/registermail').post(registerMail);
router.route('/auth').post(controller.userVerification, (req,res) => res.end());
router.route('/login').post(controller.userVerification,controller.login);
//product
router.route('/addproduct').post(p_controller.addproduct);
//client
router.route('/addclient').post(c_controller.addclient);
//discounts
router.route('/adddiscount').post(d_controller.adddiscount);
//cart
router.route('/addtocart').post(Auth, cart_controller.addItem2Cart);
router.route('/cart').get(Auth, cart_controller.getCart);
router.route('/cart/:productId').delete(Auth, cart_controller.deleteItemFromCart);

router.route('/save-final-sale').post(Auth, sale_controller.saveFinalSale);

//DELETE
//user
router.delete('/users/:userId', controller.deleteUser);
//product
router.delete('/products/:productId', p_controller.deleteProduct);
//client
router.delete('/clients/:clientId', c_controller.deleteClient);
//discount
router.delete('/discounts/:discountId', d_controller.deleteDiscount);

export default router;