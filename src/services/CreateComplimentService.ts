import { TokenExpiredError } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import{ ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRepositories } from "../repositories/UserRepositories";


interface IComplimentRequest{
tag_id: string;
user_sender: string;
user_receiver: string;
message: string;

}
class CreateComplimentService{

async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest){

    const complimentRepositories = getCustomRepository(ComplimentsRepositories);

    const usersRepositories =  getCustomRepository(UserRepositories);

    if(user_sender === user_receiver){
        throw new Error("Incorrect user Receiver");
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

        const compliment = complimentRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });


        await complimentRepositories.save(compliment);

        return compliment;

    if(!userReceiverExists){
        throw new Error("User Receiver does not exists");
    }

}

}

export{CreateComplimentService}