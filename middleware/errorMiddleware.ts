import httpError from "../util/httpError"
import {Response, Request, NextFunction} from 'express'

export const pathNotFound = (req:Request, res:Response, next:NextFunction) => {
    const error = new Error(`Not found -${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorValidation = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    if (err instanceof Error) {
        switch (statusCode) {
            case httpError.VALIDATION_ERROR:
                res.json({ title: "Validation Failed", message: err.message });
                break;
            case httpError.NOT_FOUND:
                res.json({ title: "Not found", message: err.message });
                break;
            case httpError.FORBIDDEN:
                res.json({ title: "Forbidden", message: err.message });
                break;
            case httpError.UNAUTHORIZED:
                res.json({ title: "Unauthorized", message: err.message });
                break;
            case httpError.SERVER_ERROR:
                res.json({ title: "Server Error", message: err.message });
                break;
            case httpError.CONFLICT:
                res.json({ title: "Conflict", message: err.message });
                break;
            default:
                res.status(statusCode).json({ title: "Error", message: err.message });
                break;
        }
    } else {
        res.status(500).json({ title: "Internal Server Error", message: "Unexpected error occurred" });
    }
};