import toast from 'react-hot-toast'
import { authenticate } from './helper';
export async function mailValidate(values){
    const errors= mailVerify({}, values);

    if(values.mail){
        const {status}= await authenticate(values.mail);
        if(status !== 200){
            errors.exist = toast.error('User does not exist!')
        }
    }

    return errors;
}

export async function profileValidate(values){
    const errors = mailVerify({}, values);
    return errors;
}


function mailVerify(error = {}, values){
    if(!values.mail){
        error.mail = toast.error('Mail Required')
    } else if(!values.mail.includes("@") || !values.mail.includes(".")){
        error.mail = toast.error('Invalid Mail')
    }

    return error;
}

