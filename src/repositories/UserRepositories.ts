import { EntityRepository, Repository} from "typeorm"
import {User} from "../entity/User";


class UserRepositories extends Repository<User>{

}

export{UserRepositories}