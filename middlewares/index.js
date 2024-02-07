import {validRouteStrings} from "../utils.js"

const checkValidRoute = async (req, res, next) => {
    if(!validRouteStrings.includes(req.path)){
        return res.status(404).send();
    }
    next();
}

export {checkValidRoute};