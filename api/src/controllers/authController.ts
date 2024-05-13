import { Response, Request } from "express";
import { loginServices, registerServices } from "../services/authServices";
import { validationResult } from "express-validator";

export const handleRegister = (req: Request, res: Response) => {

    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() })
    }
    registerServices(res, req.body)
}

export const handleLogin = (req: Request, res: Response) => {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() })
    }

    loginServices(req.body, res)
}