import { getCustomRepository } from "typeorm";
import {UserRepositories} from "../repositories/UserRepositories";
import{compare} from "bcryptjs";
import {sign} from "jsonwebtoken"

interface IAuthenticateRequest{
    email: string;
    password: string;
}
class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest){

        const userRepositories = getCustomRepository(UserRepositories);

        const user= await userRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email or Password incorrect");
        }

        const passwordMatch =  await compare(password, user.password);
        if(!passwordMatch){
        throw new Error("Email or Password incorrect"); 
        }

        const token = sign({
            email: user.email
        }, "3493a14fc7d688e2b447ecc0ce1082bc", {
            subject: user.id,
            expiresIn: "1d"
        }
        );
        return token;

    }

}

export{AuthenticateUserService}