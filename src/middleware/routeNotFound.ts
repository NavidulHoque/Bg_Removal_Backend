import { Request, Response, NextFunction } from "express";

export function routeNotFound(req: Request, res: Response, next: NextFunction) {

    const error = new Error("Route not found")

    return res.json({
        error
    })
}