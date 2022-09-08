// function to check a string
const checkRegex = (userInput, regex) => {
        if (regex.test(userInput)) {
            return true;
        } else {
            return false;
        }
    }
    // validating phone number
var phoneRegex = /^[0-9]{3}\-?[0-9]{3}\-?[0-9]{4}$/
var positiveNumberRegex = /^[0-9]$/
    // customizing validation for phone number
const customPhoneValidation = (value) => {
    if (!checkRegex(value, phoneRegex)) {
        throw new Error('Phone number is incorrect');
    }
    return true;
}


// customizing validation for quantities (must be positive) and the subtotal must be greater than 10 
// if the quantities are negative or not an integer and/or subtotal is less than 10 it will throw an error
const customQuantity = (apple) => {

    if (!checkRegex(apple, positiveNumberRegex)) {
        throw new Error('Quantity is incorrect');
    }
}



module.exports = { checkRegex, customPhoneValidation, customQuantity, phoneRegex, positiveNumberRegex }