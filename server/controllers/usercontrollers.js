import user_model from '../models/user_model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import otpGenerator from 'otp-generator'

export async function userVerification(req, res, next){
    try{
        const { mail } = req.method == "GET" ? req.query : req.body;

        let exist = await user_model.findOne({mail});
        if(!exist) return res.status(400).send({error : "This mail doesn't exist"});
        next();
    } catch (error) {
        return res.status(404).send({error:"Authentication Error"});
    }
}

export async function register(req,res){
    try{
        const {name,surname,mail,phone,password} = req.body;
        const mailExists = await user_model.findOne({ mail });
        const phoneExists = await user_model.findOne({ phone });
    
        if (mailExists) {
          return res.status(400).send({ error: 'This mail is already exist.' });
        }
    
        if (phoneExists) {
          return res.status(400).send({ error: 'This phone number is already exist.' });
        }
    
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const user = new user_model({
            name,
            surname,
            password: hashedPassword,
            phone,
            mail,
            userType,
          });
    
          const result = await user.save();
          return res.status(201).send({ msg: 'User registration successfully completed' });
        }
    } catch(error) {
        return res.status(500).send(error);
    }
}


export async function login(req,res){
    const {mail,password} = req.body;

    try {
        user_model.findOne({mail})
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if(!passwordCheck) return res.status.send({error : "Don't have password"})
                        const token = jwt.sign({ userID: user.id,  mail: user.mail }, ENV.JWT_SECRET, {expiresIn:"24h"});
                        return res.status(200).send({  msg: "Successfully logged in", mail: user.mail, token })
                    })
                    .catch(error =>{
                        return res.status(400).send({error : "Wrong password"})
                    })
            })
            .catch(error => {
                return res.status(404).send({error: "Mail not found"})
            })
    } catch (error) {
        return res.status(500).send({error});
    }
}

export async function getUser(req, res) {
    const { mail } = req.params;
  
    try {
      if (!mail) {
        return res.status(400).send({ error: "Invalid Mail" });
      }
  
      const user = await user_model.findOne({ mail });
  
      if (!user) {
        return res.status(404).send({ error: "Couldn't find the user" });
      }
  
      const { password, ...rest } = Object.assign({}, user.toJSON());
  
      return res.status(200).send(rest);
    } catch (error) {
      return res.status(500).send({ error: "Failed to fetch user data" });
    }
}

export async function updateUser(req, res) {
  try {
    const { userID } = req.user;
    if (userID) {
      const body = req.body;

      await user_model.updateOne({ _id: userID }, body);
      return res.status(201).send({ message: "User updated" });
    } else {
      return res.status(401).send({ error: "ID does not exist in the database" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

export async function updateUserType(req, res) {
  try {
    const { userId, updatedUserType } = req.params;

    await user_model.findByIdAndUpdate(userId, { userType: updatedUserType });

    res.status(200).json({ message: 'User type updated successfully' });
  } catch (error) {
    console.error('Error updating user type:', error);
    res.status(500).json({ message: 'Failed to update user type' });
  }
}

export async function OTPgenerator(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false, specialChars:false});
    res.status(201).send({code: req.app.locals.OTP});
}

export async function OTPverify(req,res){
    const {code} = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; //reset otp value
        req.app.locals.resetSession = true; //starts sessions for rst pwd
        return res.status(201).send({message: "verified" });
    }
    return res.status(400).send({error: "invalid otp"});
}

export async function resetSession(req,res){
    if(req.app.locals.resetSession){
        return res.status(201).send({flag: req.app.locals.resetSession})
    }
    return res.status(440).send({err: "expired session"})
}

export async function resetpassword(req, res) {
    try {
      if (!req.app.locals.resetSession) {
        return res.status(440).send({ error: "Expired session" });
      }
  
      const { mail, password } = req.body;
  
      try {
        const user = await user_model.findOne({ mail });
        if (!user) {
          return res.status(404).send({ error: "Mail not found" });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
        await user_model.updateOne({ mail: user.mail }, { password: hashedPassword });
  
        return res.status(201).send({ message: "Password updated" });
      } catch (error) {
        return res.status(500).send({ error: "Failed to update password" });
      }
    } catch (error) {
      return res.status(401).send({ error });
    }
}

export async function getuser(req, res) {
  try {
    const users = await user_model.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }
      return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;
    
    await user_model.findByIdAndDelete(userId);

    return res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).send({ error: 'Internal server error' });
  }
}


