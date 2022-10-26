// permite el ingreso validadando si tiene token  o no
import jwt from "jsonwebtoken";
// valida para dejart ingresar si todo esta correcto
import {Request, Response, NextFunction}  from "express";

class Seguridad{
    // se crea el metodo 1-recibe la info 2-envia la info 3-continua el codigo
    public analizarToken(req:Request,res:Response,next:NextFunction){
        //  la liena 14 verifica si tienes el token
        if (req.headers.authorization) {
            try{
                const miLlavecita = String(process.env.CLAVE_SECRETA);
                // 
                const tokenRecibido = req.headers.authorization?.split(" ")[1] as string;
                const infoUsuario = jwt.verify(tokenRecibido,miLlavecita);
                req.body.datosUsuario=infoUsuario;
                next();
            } catch (error){
                res.status(401).json({respuesta:"Su Token no es correcto"});
            }
            
        } else {
            res.status(401).json({respuesta:"No posee un Token valido"});
            
        }
        
    };
}

const seguridad = new Seguridad();
export default seguridad;

