import user_model from '../models/user_model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

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
          return res.status(201).send({ message: 'User registration successfully completed' });
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

export async function getUser(req,res){

    const { mail } = req.params;

    try {
        if (!mail) {
        return res.status(400).send({ error: "Invalid Mail" });
        }

        const user = await user_model.findOne({ mail });

        if (!user) {
        return res.status(404).send({ error: "Couldn't find the user" });
        }

        const { password, ...rest } = user.toObject();

        return res.status(200).send(rest);
    } catch (error) {
        return res.status(500).send({ error: "Failed to fetch user data" });
    }


}




export async function updateUser(req,res){
    res.json('updateUser route')
}

export async function OTPgenerator(req,res){
    res.json('OTP generator route')
}

export async function OTPverify(req,res){
    res.json('OTP verify route')
}

export async function resetSession(req,res){
    res.json('reset session route')
}

export async function resetpassword(req,res){
    res.json('password reset route')
}