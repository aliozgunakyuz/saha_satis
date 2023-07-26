import toast from 'react-hot-toast'

export async function clientValidate(values){
    const errors = {};
    clientphoneVerify(errors, values);
    clientmailVerify(errors, values);
    clientnameVerify(errors, values);
    clientaddressVerify(errors, values);

    return errors
}

function clientnameVerify(error = {}, values){
    if(!values.clientname){
        error.clientname = toast.error('Client Name Required')
    } 
    return error;
}
function clientaddressVerify(error = {}, values){
    if(!values.clientaddress){
        error.clientaddress = toast.error('Client Address Required')
    } 
    return error;
}

function clientphoneVerify(errors = {}, values){

    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(!values.clientphone){
        errors.clientphone = toast.error("Phone Required");
    } else if(values.clientphone.includes(" ")){
        errors.clientphone = toast.error("Wrong Phone Format");
    } else if(lowerCase.test(values.clientphone) || upperCase.test(values.clientphone) || specialCharacters.test(values.clientphone)){
        errors.clientphone = toast.error("Wrong Phone Format");
    } else if(!numbers.test(values.clientphone)){
        errors.clientphone = toast.error("Phone should be number");
    } 
    return errors;
}


function clientmailVerify(error = {}, values){
    if(!values.clientmail){
        error.clientmail = toast.error('Mail Required')
    } else if(!values.clientmail.includes("@") || !values.clientmail.includes(".")){
        error.clientmail = toast.error('Invalid Mail')
    }
    return error;
}