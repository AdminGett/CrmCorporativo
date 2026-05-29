import { Request,Response } from "express";
import Session from "../../infrestructure/models/session";
import { body } from "express-validator";

export const crearSesion = async (req:Request, res:Response)=>{
    try {
        const { user_id,refresh_token,expires_at} =req.body;
    const nuevaSesion= await Session.create({
        user_id: user_id,
        refresh_token: refresh_token,
        expires_at:expires_at
    });
    res.status(201).json({
        mensaje:'Sesion creada con exito',
        data: nuevaSesion
    });
    }catch (error){
        console.error(error);
        res.status(500).json({mensaje: 'Hubo un error al crar la session'})
    }
};

export const obtenerSesiones = async(req: Request,res:Response)=> {
    try{
        const sesiones = await Session.findAll();
        res.status(200).json(sesiones);        
    }catch (error){
        res.status(500).json({mensaje: 'Hubo un error al obtener las sessiones'});

    }

};