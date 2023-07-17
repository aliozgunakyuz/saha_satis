import toast from 'react-hot-toast'





export async function registerValidate(values){
    const errors = phoneVerify({},values);
    mailVerify(errors,values);
    passwordVerify(errors,values);
    nameVerify(errors,values);
    

    if(values.password !== values.confirm_password){
        errors.exist = toast.error("Password not match");
    }

    return errors
}




function mailVerify(error = {}, values){
    if(!values.mail){
        error.mail = toast.error('Mail Required')
    } else if(!values.mail.includes("@") || !values.mail.includes(".")){
        error.mail = toast.error('Invalid Mail')
    }
    return error;
}

function nameVerify(error = {}, values){
    const specialCharacters = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
    var numbers = /[0-9]/g;

    if(!values.name) {
        error.name = toast.error('Name Required');
    }
    if(!values.surname) {
        error.surname = toast.error('Surname Required')
    }
    if (specialCharacters.test(values.name) || numbers.test(values.name)) {
        error.name = toast.error('Invalid Name');
    }
    if (specialCharacters.test(values.surname) || numbers.test(values.surname)) {
        error.surname = toast.error('Invalid Surame');
    }
}

function phoneVerify(error = {}, values){
    const specialCharacters = /[`!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?~]/;
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    if(!values.phone){
        error.phone = toast.error('Phone Required')
    } else if(specialCharacters.test(values.phone) ||lowerCase.test(values.phone) || upperCase.test(values.phone)) {
        error.phone = toast.error('Invalid Phone')
    }
    return error;
}


function passwordVerify(errors = {}, values){

    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(!values.password){
        errors.password = toast.error("Password Required");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password");
    } else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 8 characters");
    } else if(!lowerCase.test(values.password)){
        errors.password = toast.error("Use at least 1 lower case letter");
    } else if(!upperCase.test(values.password)){
        errors.password = toast.error("Use at least 1 upper case letter");
    } else if(!numbers.test(values.password)){
        errors.password = toast.error("Use at least 1 number");
    } else if(!specialCharacters.test(values.password)){
        errors.password = toast.error("Special characters needed for password");
    }
    return errors;
}