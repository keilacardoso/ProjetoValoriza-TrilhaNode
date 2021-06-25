import {Repository, EntityRepository} from "typeorm";
import { Compliments } from "../entity/Compliments";

@EntityRepository(Compliments)
class ComplimentsRepositories extends Repository <Compliments>{

}

export{ComplimentsRepositories}