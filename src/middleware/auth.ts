//Explicando o que é um middleware
import {Request, Response, NextFunction} from 'express'
function Auth(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization
    if(!authHeader)
        return res.status(401).json({mensagem:"Cadê o Token?"})
    const [tipo,token] = authHeader?.split(' ')
    console.log("Passei no middleware")
    next()
    //return res.status(401).json({mensagem:"Você não tem permissão para acessar esse recurso!"})
}

export default Auth