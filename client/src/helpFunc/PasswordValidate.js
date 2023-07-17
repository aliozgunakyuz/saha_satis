import toast from 'react-hot-toast'

export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

export async function repeatPasswordVerification(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_password){
        errors.exist = toast.error("Password not match");
    }

    return errors;
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


