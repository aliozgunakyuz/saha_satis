import toast from 'react-hot-toast'

export async function productValidate(values){
    const errors = {};
    stockVerify(errors, values);
    priceVerify(errors, values);
    productnameVerify(errors, values);

    return errors
}

function productnameVerify(error = {}, values){
    if(!values.productname){
        error.productname = toast.error('Product Name Required')
    } 
    return error;
}

function stockVerify(errors = {}, values){

    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(!values.stock){
        errors.stock = toast.error("Stock Required");
    } else if(values.stock.includes(" ")){
        errors.stock = toast.error("Wrong Stock Format");
    } else if(lowerCase.test(values.stock) || upperCase.test(values.stock) || specialCharacters.test(values.stock)){
        errors.stock = toast.error("Wrong Stock Format");
    } else if(!numbers.test(values.stock)){
        errors.stock = toast.error("Stock should be integer");
    } 
    return errors;
}

function priceVerify(errors = {}, values){

    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(!values.price){
        errors.price = toast.error("price Required");
    } else if(values.price.includes(" ")){
        errors.price = toast.error("Wrong price Format");
    } else if(lowerCase.test(values.price) || upperCase.test(values.price)){
        errors.price = toast.error("Wrong price Format");
    } else if(!numbers.test(values.price)){
        errors.price = toast.error("price should be integer or float");
    } 
    return errors;
}