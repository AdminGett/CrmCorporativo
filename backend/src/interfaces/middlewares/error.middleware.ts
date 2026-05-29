import {
    Request,
    Response,
    NextFunction
} from 'express';

export const errorMiddleware = (

    error: any,

    _req: Request,

    res: Response,

    _next: NextFunction

) => {

    console.error(error);

    res.status(500).json({

        message:
            'Error interno del servidor',

        error:
            error.message
    });
};