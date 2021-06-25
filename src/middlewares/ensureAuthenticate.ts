import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken"


interface Ipayload{
    sub : string;
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction){


const authToken = request.headers.authorization;
if(!authToken){
    return response.status(401).end();
}

const [, token] = authToken.split(" ");

try{
const {sub} = verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydW5hbkBob3RtYWlsLmNvbSIsImlhdCI6MTYyNDY0Njc0NiwiZXhwIjoxNjI0NzMzMTQ2LCJzdWIiOiI0YjIyMjRlNi0yM2I1LTQ0ZGMtOTNjZS1jYTNhNjU3NDVkZjgifQ.4qpPLZrqe6EYDE1AHfBZmkO3vtqyw1L-TWt91DjwZ6o") as Ipayload;

request.user_id = sub;

return next();
}catch(err){
    return response.status(401).end();
}

}