//Explicando o que é um middleware
import { NextFunction, Request, Response } from "express";

function Auth(req:Request, res:Response, next:NextFunction) {
    console.log("Passei no Middleware");
    next();
    // return res.status(401).json({message: "Você não tem permissão para acessar esse recurso"});
}

export default Auth;