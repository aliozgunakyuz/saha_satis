import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// API request

// auth func
export async function authenticate(mail){
    try {
        return await axios.post('/api/auth', {mail})
    } catch (error) {
        return {error: "Mail doesnt exist"}
    }
}

//get user details
export async function getUser({mail}){
    let usermail = mail;
    try {
        const {data}=await axios.get('/api/user/'+usermail);
        return{data};
    } catch (error) {
        return {err: "Password doesnt match"}
    }
}

//register user
export async function registerUser(credentials){
    try {
        const {data:{msg},status} =  await axios.post('/api/register', credentials)

        let {name,surname,mail,phone} = credentials;

        //send email to user
        if(status === 201 ){
            await axios.post('/api/registermail',{ name,surname,mail:mail, text:msg, phone})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({error})
    }
}

//login func
export async function verifyPwd({mail,password}){
    try {
        if(mail){
            const {data} = await axios.post('/api/login', {mail,password});
            return Promise.resolve({data});
        }
    } catch (error) {
        return Promise.reject({err:"Password is false"})
    }
}

//updaye user func

export async function updateuser(response){
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/userupdate',response, {headers:{"Authorization": 'Bearer '+token}});
    
        return Promise.resolve({data})
    } catch (error) {
        return Promise.reject({error: 'Couldnt update'})
    }
}

//otp generate
export async function OTPmaker(mail){
    try {
        const{data:{code},status}=await axios.get('/api/otpmaker',{params:{mail}})
        if(status === 201){
            let {data:{mail}} = await getUser({mail});
            let text = 'Your password recovery OTP is ' + code + '. Verify and recover password';
            await axios.post('/api/registermail', {mail:mail,text,subject: "Password recovery OTP"});
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error})
    }
}

//otp verify
export async function OTPverify({mail,code}){
    try {
        const {data,status} = await axios.get('/api/otpverifier',{params:{mail,code}})
        return {data,status}
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function resetpassword({mail,password}){
    try {
        const {data,status} = await axios.put('/api/passwordreset');
        return Promise.resolve({data,status});
    } catch (error) {
        return Promise.reject({error})
    }
}