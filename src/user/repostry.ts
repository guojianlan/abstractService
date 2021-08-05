import { WrapAbstractTypeOrmRepostry } from "src/abstract.typeorm.repostry";
import { EntityRepository } from "typeorm";
import { UserEntity } from "./entity";

@EntityRepository(UserEntity)
export class UserRepository extends WrapAbstractTypeOrmRepostry<UserEntity>({
    
}) {
    async getByName(name: string) {
        return await this.findOne({
            where: {
                name: name
            }
        })
    }
}