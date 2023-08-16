import toast from 'react-hot-toast'

export async function discountValidate(values){
    const errors = {};

    codeVerify(errors, values);
    percentVerify(errors, values);

    return errors
}

function codeVerify(error = {}, values){

    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(!values.discountcode){
        error.discountcode = toast.error('Discount Code Required')
    } else if(lowerCase.test(values.discountcode) || specialCharacters.test(values.discountcode)){
        error.discountcode = toast.error("Discount Code Should be Upper Case Letters Only");
    } else if(values.discountcode.includes(" ")){
        error.discountpercent = toast.error("Wrong Discount Percent Format");
    }
    return error;
}

function percentVerify(errors = {}, values){

    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(!values.discountpercent){
        errors.discountpercent = toast.error("Discount Percent Required");
    } else if(values.discountpercent.includes(" ")){
        errors.discountpercent = toast.error("Wrong Discount Percent Format");
    } else if(lowerCase.test(values.discountpercent) || upperCase.test(values.discountpercent) || specialCharacters.test(values.discountpercent)){
        errors.discountpercent = toast.error("Wrong Discount Percent Format");
    } else if(!numbers.test(values.discountpercent)){
        errors.discountpercent = toast.error("Discount Percent should be number");
    } 
    return errors;
}