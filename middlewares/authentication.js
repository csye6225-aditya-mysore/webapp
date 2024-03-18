import User from "../models/User.js";
import bcrypt from "bcrypt";
import logger from "../utils/logger.js";

const getEmailAndPasswordFromToken = (token) => {
    const splitToken = token.split(" ")[1];
    console.log(token);
    const retrievedToken = new Buffer.from(splitToken, 'base64').toString();
    const [email, password] = retrievedToken.split(":");
    return [email, password];
}

const auth = async (req, res, next) => {
    try{
        if(!req.headers && !req.headers.authorization){
            throw new Error("Authorization token not present");
        }
        var [email, password] = getEmailAndPasswordFromToken(req.headers.authorization);
        if(!email || !password){
            throw new Error("Email or password is empty!");
        }
        const user = await User.findOne({
            where: {
                username: email
            }
        });
        if(!user){
            throw new Error("No user found.");
        }
        const verifyPassword = await bcrypt.compare(password, user.password);
        if(!verifyPassword){
            logger.error("Authorization failed");
            throw new Error("User not authorized");
        }
        req.user = user;
        logger.info("Authorization successfull");
        next();
    }
    catch(error){
        // console.log(error);
        logger.error(error);
        return res.status(401).send();
    }
};

export {
    auth,
    getEmailAndPasswordFromToken
}