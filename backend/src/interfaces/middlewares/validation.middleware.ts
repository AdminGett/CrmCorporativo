import {
    Request,
    Response,
    NextFunction
} from 'express';

export const validateCreateComment = (

    req: Request,

    res: Response,

    next: NextFunction

) => {

    const {

        userComment,

        taskComment,

        commentText

    } = req.body;


    if (
        !userComment ||
        !taskComment ||
        !commentText
    ) {

        res.status(400).json({

            message:
                'Faltan campos obligatorios'
        });

        return;
    }


    next();
};