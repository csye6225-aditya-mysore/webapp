import {validRouteStrings} from "../utils.js"

const checkValidRoute = async (req, res, next) => {
    if(!validRouteStrings.includes(req.path)){
        return res.status(404).send();
    }
    next();
}


const checkIfValidMethod = async (req, res, next) => {
    if(req.method === "GET"){
        next();
        return;
    }
    else{
        res.header({"Cache-Control": "no-cache"});
        return res.status(405).send();
    }
}

export {checkValidRoute, checkIfValidMethod};