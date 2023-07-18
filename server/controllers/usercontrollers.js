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
        /*
        const mailCheck = new Promise((resolve, reject) => {
            user_model.findOne({mail}, function(err, mail){
                if(err) reject(new Error(err))
                if(mail) reject({error: 'This mail is already exist.'});
                
                resolve();
            })
        });

        const phoneCheck = new Promise((resolve, reject) => {
            user_model.findOne({phone}, function(err, phone){
                if(err) reject(new Error(err))
                if(phone) reject({error: 'This phone number is already exist.'});
                
                resolve();
            })
        });


        const mailExists = await user_model.findOne({ mail });
        const phoneExists = await user_model.findOne({ phone });

        if (mailExists) {
          return res.status(400).send({ error: 'This mail is already exist.' });
        }

        if (phoneExists) {
        return res.status(400).send({ error: 'This phone number is already exist.' });
        }

        Promise.all([mailCheck, phoneCheck]).then(() => {
            if(password){
                bcrypt.hash(password,10).then(hashedPassword => {
                    const user = new user_model ({
                        name,
                        surname,
                        password: hashedPassword,
                        phone,
                        mail,
                    });

                    user.save()
                        .then(result => res.status(201).send({msg: 'User registration successfully completed'}))
                        .catch(error => res.status(500).send({error}))
                }).catch(error => {
                    return res.status(500).send({
                        error: 'Enable password hash'
                    })
                })
            }

        }).catch(error => {
            console.log('Z');
            return res.status(500).send({error})
        })
        */
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

                        const token = jwt.sign({
                                            userID: user.id,
                                            mail: user.mail
                                        }, ENV.JWT_SECRET, {expiresIn:"24h"});
                        return res.status(200).send({
                            msg: "Successfully logged in",
                            mail: user.mail,
                            token
                        })
                    
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
        req.app.locals.resetSession = false;
        return res.status(201).send({msg: "granted"})
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