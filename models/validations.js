const lengthValidation = (name) => {
    if(name.length < 4 || name.length > 25){
        throw new Error("Should be of minimum length 4 and maximum 15");
    }
}

export {
    lengthValidation
}